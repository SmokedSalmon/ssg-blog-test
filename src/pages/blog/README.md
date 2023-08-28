Simple Github Flavored Markdown Blog featuring:
- Dynamic route following `/blog/[name]`
- It consumes `*.md` markdown files for blog post content  
Github-flavored markdown format is supported, including but not limited as:
    - titles
    - image
    - links
    - Anchor & Permalink
    - emphasis & font format/decoration
    - *Fenced* and non-Fenced code block. With Syntax Highlight feature for fenced code block
    - [Nice to have] expendable
    - emoji  
    - Table of content  
    - [Nice to have] Table of content side column
Reference link is not supported  
> **markdown-it** is used. However, this library only creates the html DOM tree for markdown, I need to customized the style with `.module.css`.  
I first used *markdown-to-jsx* but switch to this library as I found this one offers many more plugin including **Anchor**, **Permalink**, etc. And it is 2x popular
- It also uses a large image as background
- Basic components including:
    - breadcrumb
    - timestamp
    - language switcher (en/zh, preferably zh-cn & zh-tw)
    - basic navigation such as back button

## About `markdown-it`
task list, Anchor/Permalink and TOC is implemented with plugins  
Syntax highlight is implemented using `highlight.js` via markdown-it's own API  
Detail please see [./markdown.ts](./markdown.ts)