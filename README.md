# Next.js SSG CMS Web
> Currently used as My Share Platform (with Subdomain `share` under `j-su.net`)

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Quick Dive Into

### Entry
  - _app.tsx
  - _document.tsx

### 1st Level Pages
- `/about`
    see [src/about/index.tsx](src/pages/about/index.tsx)
- `/public`  
  [API Router???] [src/pages/api/public/[[...slug]].ts](<src/pages/api/public/[[...slug]].ts>)
- error handle  
  `401.tsx`, `404.tsx`

### Blog Pages
URL: `/blog/xxx`  
Source: [src/pages/blog/[...slug].tsx](src/pages/blog/[...slug].tsx)  
Also see its [README.md](src/pages/blog/README.md)

### Simple Authorization
API: `api/user?u=${userName}`, source at [src/pages/api/user.ts](src/pages/api/user.ts)  
To set a blog page with simple auth, set it in [data/CMS/blogs.ts](dummyData/CMS/blogs.ts) with `restricted: true`  
User visit the `blog/xxx` page will invoke simple author to validate whether inbound URL contains valid pass
> user should pass a encoded pass that I handed to, which will be decoded at server for verification  
> \*\* **This Branch** has **NOT** yet implement any pass & coder mechanism, should check other branch

Check [src/pages/blog/[...slug].tsx](src/pages/blog/[...slug].tsx) for details

### Metadata
It follows []() to prepare metadata for sharing across various social platform  
Currently only `/blog` pages has metadata, tested via webpage shared to **WeChat**

see [(src/pages/blog/[...slug].tsx](src/pages/blog/[...slug].tsx )- `getStaticProps` & [src/lib/markdown.ts](src/lib/markdown.ts) for details

### Multi-Language Support
To set a blog page with multi-language, set it in [data/CMS/blogs.ts](dummyData/CMS/blogs.ts) with `locale: <language-code>` or `locale: [<language-code-1>, <language-code-2>]`  
Make sure your have each language version of the blog under [data/CMS/\<country-code\>](dummyData/CMS/)

### Components
- A Simple Language Switcher
- A Basic Nav Bar

### Learn More
To learn more about Next.js, take a look at the following resources:

- [NextJS SSG Simple Tutorial](#nextjs-ssg-simple-tutorial) (Chapter below)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## Deploy on Vercel
Deployed as a Vercel Project, with auto build upon **git-push**

### Domain
Since `vercel.app` is blocked in China, I use cloudflare as DNS provider to assign CNAME record to my personal domain  
Current: [share.j-su.net](https://share.j-su.net)

It requires settings at both:
- Vercel  
  Project setting -> Domain -> Add the **CNAME record + Domain** you assigned for this Vercel App,
- Cloudflare  
  Dashboard -> domain -> `j-su.net` -> The **CNAME record** your want to assign  
  Checkout my note `1.1b4a1`, solution: `Access from Mainland China, Cloudflare DNS CNAME -> Vercel` to see detailed guide
> Vercel also provides automated page jump to Cloudflare to set CNAME at Cloudflare's site

**More Detail:**  
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> Upon Push, run a local build to see if there is any Compile or Lint Error.


## NextJS SSG Simple Tutorial
> Using Page Router
- create project and install
- Page structure, including entry file `_app.js`, custom document tags `_document.js`, the index page `index.tsx`, and `404.tsx`/`500.tsx`/`_error.tsx` for error handling pages  
  use `<Head>` component from 'next/head' to inject head tags instead of declare them in `_document.js` ([Why?](https://nextjs.org/docs/messages/no-document-title))
- Configure
  - compiler options including `module alias` and `baseUrl`  
    baseUrl: relative base module imports are reference to  
    module alias: use short alias to avoid prefix of long relative path
- Pre-process CSS  
  Define module level CSS for Components
  import global CSS at entry file `_app.tsx`
- Basic Routing with `<Link>` and `useRouter`  
  create the `/about` Page
  create the Navigation `<Nav>` component and apply it to all existing pages
- Try the `<Image>` component as one of many optimized web components that NextJS provides out-of-the-box
- Switch to **SSG** mode  
  Learn about **CSG/SSR/SSG** render approach
  Utilize `getStaticPaths` & `getStaticProps` to tell NextJS to **pre-render** pages dedicated by an external source  
  create the static `/member/[id]` pages by an external data source in the dummy data folder
  run `build` and verify those desired static pages are generated in `.next` folder  
- SSG Preview mode  
  to be provided
- Serving Static assets
  > For those script-loaded static assets such as css, small images, NextJS automatically put them under `.next/static` folder
  
  Non script-loaded assets, which usually reside in `public/` folder, are served via:
  - **API router** defined under `src/pages/api` with **handlers**. In this example, `express.static()'` is employed to construct the handler
  - **NextJS' Middleware** to *rewrite*(NOT redirect) neater path to the API router above. (e.g. `xxx/public/xxx` -> `xxx/api/public/xxx`)
  - [Optional] Copy `public/` under `.next/` as most host platforms removes project source and deploy `.next/` folder only  
  > It is recommended to use **3rd-storage** as most host platforms also filter assets in deploy folder (such as **Vercel**). In such case this won't work. It is suggested here solely for tutorial purpose.
  

Courtesy of [看了就会的Next.js SSR/SSG实战教程](https://juejin.cn/post/7133395475675217933)  
>The Project README begins here ⬇
------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
