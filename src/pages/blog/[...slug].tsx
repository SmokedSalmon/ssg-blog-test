/**
 * Simple blog page that render the content in Github-flavored Markdown format
 * Pleaser refer to README.md for details
 */
import type {
    GetStaticPaths,
    GetStaticProps, InferGetStaticPropsType
} from 'next'
import type { StaticPageType, StaticPagePropType } from './types';
import { resolve as resolvePath } from 'path'
import { readFile } from 'fs/promises'
// DOMPurify on node (server side has no DOM tree to sanitize, this library will construct one to apply DOMPurify at server side)
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { setConfig as DOMPurifySetConfig, sanitize } from 'isomorphic-dompurify'
import Dropdown from '@/components/Dropdown'
import markdown from '../../lib/markdown'
 
import style from './blog.module.css'

// hard-code the pages and rely on the files as data source for this simple website
const StaticPages: { [name: string]: StaticPageType } = {
    ['test-project-1']: {},
    ['test-project-2']: {
        locale: 'zh'
    },
    ['project-ocr-001']: {
        locale: ['en', 'zh'],
        // certain user role is required to view the content }
        restricted: true,
    },
}

// tell DOMPurify to allow 'target' attribute for <a> target
DOMPurifySetConfig({ ADD_ATTR: ['target'] })

export const getStaticPaths: GetStaticPaths = () => {
    return {
        // hard-code the pages and rely on the files as data source for this simple website
        paths: Object.keys(StaticPages).reduce((acc, name) => {
            const { locale } = StaticPages[name]
            if (locale) {
                if (Array.isArray(locale)) {
                    for (let l of locale) {
                        acc.push({
                            params: { slug: [name] },
                            locale: l,
                        })
                    }
                } else {
                    acc.push({
                        params: { slug: [name] },
                        locale: locale as string,
                    })
                }
            } else {
                acc.push({ params: { slug: [name] } })
            }
            return acc
        }, [] as { params: { slug: string[] }, locale?: string }[]),
        fallback: false,
    }
}

/*
 * Build time passing
 * markdown file as content
 * className for <body>, setting its correspondent styles on upper elements
*/
//@ts-ignore
export const getStaticProps: GetStaticProps<StaticPagePropType> = async ({ params, locale }) => {
    // redirect to 404 page if no such page on the CMS/data source
    if (!params || !params.slug || !params.slug.length) {
        return { notFound: true, props: { content: '' } }
    }
    const name = params.slug[params.slug.length - 1]
    const { restricted = false, locale: localeSetting } = StaticPages[name] || {}
    // at build time, process.cwd() is the project root
    // Since nextJS already ensures locale can default, while I allow article to put outside any locale folder, we must check both
    const slug = params.slug as string[]
    let content: string
    try {
        const fileRelativePath = localeSetting ? [locale, ...slug].join('/') : slug.join('/')
        const rawMarkdown = await readFile(resolvePath(process.cwd(), `./dummyData/CMS/${fileRelativePath}.md`), 'utf-8')
        content =  markdown.render(rawMarkdown)
    } catch (err) {
        content = 'Something wrong when parsing Markdown format'
    }

    return {
        props: {
            bodyClass: `blog ${locale}`,
            content,
            restricted,
            locale,
            localeSetting: localeSetting || null,
        }
    }
}

export default function Blog({ content, restricted, locale, localeSetting }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const [userStatus, setUserStatus] = useState({ name: '', role: '', error: null, isLoading: true })
    useEffect(() => {
        // the query string is only visible in Client. So as the condition control
        // to prevent this effect getting trigger at React-Hydration phase at Client side. Check whether router is ready for use
        // https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object
        if (restricted && router.isReady) {
            console.log('Getting user')
            const { u: userName } = router.query
            fetch(`/api/user?u=${userName}`)
                .then(res => res.json())
                .then(data => {
                    setUserStatus({
                        name: data.name, role: data.role, error: null, isLoading: false
                    })
                    console.log(userStatus)
                })
                .catch(error => {
                    setUserStatus({
                        name:'', role: '', error, isLoading: false
                    })
                })
        }
        // Client-side one-time effect, cares only router.isReady
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [router, router.asPath])

    const changeLocale = useCallback((locale: string) => {
        // Since all blog pages are Statically Generated, we cannot use router to do client-side page transition. You need a page reload.
        window.location.assign(`/${locale}/${router.asPath}`)
    }, [router])

    // since the markdown conversion process involve .module.css injection. It must be down on React render cycle to utilize NextJS's module CSS dynamic naming
    // const rawHtml = useMemo(() => markdown.render(content), [content])

    // restricted blog requires user role for content access
    if (restricted) {
        if (userStatus.isLoading) {
            return '...'
        }
        if (userStatus.error || !userStatus.name || !userStatus.role) {
            window.location.assign('/401')
            return
        } else {
            // console.log(`Welcome ${userStatus.name}`)
        }
    }

    // render the blog
    return (
        // sanitize it with library such as DOMPurify to prevent XSS injection
        <div className={style.container}>
            {Array.isArray(localeSetting) && localeSetting.length > 1
                ? <Dropdown
                    toggleId="lang-menu-toggle"
                    toggleText="lang"
                    items={[
                        { text: 'English', shortText: 'EN', action: () => changeLocale('en') },
                        { text: '中文', shortText: '中', action: () => changeLocale('zh') },
                    ]}
                    selected={locale === 'en' ? 0 : 1}
                    classes={{
                        wrapper: `${style['lang-dropdown']} ${style.gfm}`,
                        toggle: `${style['lang-dropdown-toggle']} ${style.gfm}`,
                        menu: `${style['lang-dropdown-menu']} ${style.gfm}`,
                        item: `${style['lang-dropdown-item']} ${style.gfm}`,
                    }}
                />
                : null
            }
            <article dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
        </div>
    )
}