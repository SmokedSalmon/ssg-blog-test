## NextJS SSG Simple Tutorial
> Using Page Router
- create project and install
- Page structure, including entry file `_app.js`, custom document tags `_document.js`, the index page `index.tsx`, and `404.tsx`/`500.tsx`/`_error.tsx` for error handling pages  
  use `<Head>` component from 'next/head' to inject head tags instead of declare them in `_document.js` ([Why?](https://nextjs.org/docs/messages/no-document-title))
- Configure
  -  complier options including `module alias` and `baseUrl`  
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
