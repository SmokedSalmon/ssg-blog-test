/**
 * Simple blog page that render the content in Github-flavored Markdown format
 * Pleaser refer to README.md for details
 */
import type {
    GetStaticPaths,
    GetStaticProps, InferGetStaticPropsType
} from 'next'
import { resolve as resolvePath } from 'path'
import { readFile } from 'fs/promises'
// DOMPurify on node (server side has no DOM tree to sanitize, this library will construct one to apply DOMPurify at server side)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setConfig as DOMPurifySetConfig, sanitize } from 'isomorphic-dompurify'
import markdown from '../../lib/markdown'
 
import style from './blog.module.css'

// hard-code the pages and rely on the files as data source for this simple website
const StaticPages = [
    { name: 'test-project-1' },
    { name: 'test-project-2' },
    {
        name: 'project-ocr-001',
        // certain user role is required to view the content }
        restricted: true,
    },
]

// tell DOMPurify to allow 'target' attribute for <a> target
DOMPurifySetConfig({ ADD_ATTR: ['target'] })

export const getStaticPaths: GetStaticPaths = () => {
    return {
        // hard-code the pages and rely on the files as data source for this simple website
        paths: StaticPages.map(page => ({ params: { name: page.name } })),
        fallback: false,
    }
}

/*
 * Build time passing
 * markdown file as content
 * className for <body>, setting its correspondent styles on upper elements
*/
export const getStaticProps: GetStaticProps<{ bodyClass?: string, content: string, restricted?: boolean }> = async ({ params }) => {
    // redirect to 404 page if no such page on the CMS/data source
    if (!params || !params.name) {
        return { notFound: true }
    }
    // at build time, process.cwd() is the project root
    const rawMarkdown = await readFile(resolvePath(process.cwd(), `./dummyData/CMS/${params.name}.md`), 'utf-8')
    const pageSetting = StaticPages.find(page => page.name == params.name)
    return {
        props: {
            bodyClass: 'blog', content: rawMarkdown, restricted: !!pageSetting?.restricted
        }
    }
}

export default function Blog({ content, restricted }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const [userStatus, setUserStatue] = useState({ name: '', role: '', error: null, isLoading: true })
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
                    setUserStatue({
                        name: data.name, role: data.role, error: null, isLoading: false
                    })
                    console.log(userStatus)
                })
                .catch(error => {
                    setUserStatue({
                        name:'', role: '', error, isLoading: false
                    })
                })
        }
        // Client-side one-time effect, cares only router.isReady
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [router.isReady])

    // since the markdown conversion process involve .module.css injection. It must be down on React render cycle to utilize NextJS's module CSS dynamic naming
    const rawHtml = markdown.render(content)
    // restricted blog requires user role for content access
    if (restricted) {
        if (userStatus.isLoading) {
            return 'Getting User Role'
        }
        if (userStatus.error || !userStatus.name || !userStatus.role) {
            window.location.assign('/401')
            return
        } else {
            console.log(`Welcome ${userStatus.name}`)
        }
    }

    // render the blog
    return (
        // sanitize it with library such as DOMPurify to prevent XSS injection
        <div className={style.container}>
            <article dangerouslySetInnerHTML={{ __html: sanitize(rawHtml) }} />
        </div>
    )
}