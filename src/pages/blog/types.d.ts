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
}