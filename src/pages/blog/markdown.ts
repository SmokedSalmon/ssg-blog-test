import MarkdownIt from 'markdown-it'
// @ts-ignore - it has no type definition
import MarkDownItTaskLists from 'markdown-it-task-lists'
import MarkDownItAnchor from 'markdown-it-anchor'
import MarkDownTOC from 'markdown-it-toc-done-right'
import style from './blog.module.css'

const markdown = new MarkdownIt()
        .use(MarkDownItTaskLists)
        .use(MarkDownItAnchor, {
            permalink: MarkDownItAnchor.permalink.ariaHidden({
                class: `${style.gfm} ${style['gfm-a']} ${style['header-anchor']}`,
                symbol: `
                    <svg
                        viewBox="0 0 1024 1024"
                        height="1.2rem"
                        width="1.2rem"
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
markdown.core.ruler.after('anchor', 'gfmClass', state => {
    const { tokens } = state
    for (let i = 0; i < tokens.length; i ++) {
        const token = tokens[i]
        // add '.gfm' to every html element that generated
        const classNamesToAdd = `${style.gfm} ${style[`gfm-${token.tag}`]}`
        token.attrJoin('class', classNamesToAdd)
    }
})

export default markdown
