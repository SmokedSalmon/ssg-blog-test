export type StaticPageType = {
    locale?: string | string[],
    restricted?: boolean,
}

export type StaticPagePropType = {
    bodyClass?: string,
    title: string,
    abstract: string,
    content: string,
    restricted: boolean,
    locale: string,
    localeSetting?: string | string[],
    metaTitle?: string,
    metaDesc?: string,
    metaImage?: string,
}

export type MarkdownMetaType = {
    title?: string,
    abstract?: string,
    thumbnail?: string,
    tags?: [string],
}