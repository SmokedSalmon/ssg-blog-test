/**
 * Simple blog page that render the content in Github-flavored Markdown format
 * Pleaser refer to README.md for details
 */
import type {
    GetStaticPaths,
    GetStaticProps, InferGetStaticPropsType
} from 'next'
import { resolve as resolePath } from 'path'
import { readFile } from 'fs/promises'
// DOMPurify on node (server side has no DOM tree to sanitize, this library will construct one to apply DOMPurify at server side)
import { sanitize } from 'isomorphic-dompurify'
import markdown from './markdown'
import style from './blog.module.css'

export const getStaticPaths: GetStaticPaths = () => {
    return {
        // hard-code the pages and rely on the files as data source for this simple website
        paths: [
            { params: { name: 'test-project-1'} },
            { params: { name: 'test-project-2'} },
            { params: { name: 'project-ocr-001'} },
        ],
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<{ content: string }> = async ({ params }) => {
    // redirect to 404 page if no such page on the CMS/data source
    if (!params || !params.name) {
        return { notFound: true }
    }
    // at build time, process.cwd() is the project root
    const rawMarkdown = await readFile(resolePath(process.cwd(), `./dummyData/CMS/${params.name}.md`), 'utf-8')
    return { props: { content: rawMarkdown } }
}

export default function Blog({ content }: InferGetStaticPropsType<typeof getStaticProps>) {
    // since the markdown conversion process involve .module.css injection. It must be down on React render cycle to utilize NextJS's module CSS dynamic naming
    const rawHtml = markdown.render(content)
    return (
        // sanitize it with library such as DOMPurify to prevent XSS injection
        <div className={style.container}>
            <article dangerouslySetInnerHTML={{ __html: sanitize(rawHtml) }}/>
        </div>
    )
}