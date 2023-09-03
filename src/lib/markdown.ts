import MarkdownIt from 'markdown-it'
// For syntax highlighting, MarkDownIt has its own API and recommends using highlight.js as it is the best option among community
// ** DO NOT use any MarkdownIt Plugin for this
import HighLightJS from 'highlight.js'
// @ts-ignore - it has no type definition
import MarkDownItTaskLists from 'markdown-it-task-lists'
import MarkDownItAnchor from 'markdown-it-anchor'
import MarkDownTOC from 'markdown-it-toc-done-right'

import style from '@/pages/blog/blog.module.css'

const markdown = new MarkdownIt({
    // change plain link to link
    linkify: true,
    // syntax highlight feature via `highlight.js`. Please see markdown-it's manual
    highlight: (str: string, lang: string) => {
        if (lang && HighLightJS.getLanguage(lang)) {
            try {
                return HighLightJS.highlight(str, { language: lang }).value 
            } catch (__) { }
        }
        return '' 
    }
})
    .use(MarkDownItTaskLists)
    .use(MarkDownItAnchor, {
        permalink: MarkDownItAnchor.permalink.ariaHidden({
            class: `${style.gfm} ${style['gfm-a']} ${style['header-anchor']}`,
            symbol: `
                <svg
                    viewBox="0 0 1024 1024"
                    height="1.2rem"
                    width="1.2rem"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" />
                </svg>
            `,
            placement: 'before',
        })
    })
    .use(MarkDownTOC, {
        level: 2,
        listType: 'ul',
        listClass: `${style.gfm} ${style['gfm-ul']} ${style['gfm-ul-toc']}`,
        itemClass: `${style.gfm} ${style['gfm-li']}`,
        linkClass: `${style.gfm} ${style['gfm-a']}`,
    })

/*
    A Custom rule to add '.gfm' & '.gfm-<tag-Name>' classes to converted element
    It is a simple feature, however there's no clean & neat plugin to suit, thus I DIT it
    Referring question: https://github.com/markdown-it/markdown-it/issues/536
    And the suggestion: https://github.com/markdown-it/markdown-it/issues/536#issuecomment-466946695
    Then I follow this example: https://github.com/valeriangalliat/markdown-it-anchor/blob/master/index.js#L36-L88
    Since markdown-it has no comprehensive plugin guide but ask us to find such examples to begin with
*/
// markdown.core.ruler.after('anchor', 'gfmClass', state => {
markdown.core.ruler.push('gfmClass', state => {
    const { tokens } = state
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        // add '.gfm' to every html element that generated
        const classNamesToAdd = `${style.gfm} ${style[`gfm-${token.tag}`]}`
        token.attrJoin('class', classNamesToAdd)
    }
})

/*
  A Custom rule to wrap '<img>' with a '<a>' link, similar to what Github does
  Courtesy of: https://github.com/Antonio-Laguna/markdown-it-image-figures
 */
// @ts-ignore
function imageLink(state) {
    // do not process first and last token
    for (let i = 1, l = state.tokens.length; i < (l - 1); ++i) {
        const token = state.tokens[i] 
        // <img> is inline element
        if (token.type !== 'inline') {
            continue 
        }
        // top-most one-layer tag
        if (token.children.length === 1 && token.children[0].type !== 'image') {
            continue 
        }
        // nested image tags
        for (let j = 0; j < token.children.length; j ++) {
            if (token.children[j].type === 'image') {
                // do not wrap image that is already wrapped by link
                if (j > 0 && j < token.children.length - 1
                    && token.children[j - 1].type === 'link_open' && token.children[j + 1].type === 'link_close') {
                        continue
                    }
                const image = token.children[j]
                // style
                image.attrPush(['class', style['gfm-image']])
                // wrap an open link with target="_blank" to align with Github's behavior
                const linkOpen = new state.Token('link_open', 'a', 1) 
                linkOpen.attrPush(['href', image.attrGet('src')])
                linkOpen.attrPush(['target', '_blank']) // make sure the sanitizer you use in the downstream allows 'target' attribute
                linkOpen.attrPush(['rel', 'noopener noreferrer nofollow'])
                const linkClose = new state.Token('link_close', 'a', -1) 
                token.children.splice(j, 1, linkOpen, image, linkClose) 
                j += 2
            }
        }
    }
}
markdown.core.ruler.before('linkify', 'image_Link', imageLink) 

export default markdown

export function extractAndRemoveTopH1IfExist(rawMarkdown: string) {
    try {
        const match = /^[ \t]*#[ ]+.*$/gm.exec(rawMarkdown)
        if (match) {
            const { 0: title, index: start } = match
            const trimmed = rawMarkdown.slice(0, start).concat(rawMarkdown.slice(start + title.length))
            return { title, trimmed }
        }
    } catch (err) {
        console.warn('Error occur during extracting 1st H1 as page title from markdown content')
    }
    return { title: '', trimmed: rawMarkdown }
}

export function extractAndRemoveAbstractIfExist(rawMarkdown: string) {
    try {
        // must comes after only empty lines or white-spaces, then maximum 3 ' ' before '>', then include everything until we hit an empty line(2 consecutive line-break)
        const match = /^(?:\s*)(?<! {4})>.+?\r?\n(\r?\n|$)/gs.exec(rawMarkdown)
        if (match) {
            const { 0: abstract, index: start } = match
            const trimmed = rawMarkdown.slice(0, start).concat(rawMarkdown.slice(start + abstract.length))
            return { abstract, trimmed }
        }
    } catch (err) {
        console.warn('Error occur during extracting 1st blockquote as abstract from markdown content')
    }
    return { abstract: '', trimmed: rawMarkdown }
}
