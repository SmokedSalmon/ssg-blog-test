import { StaticPageType } from "@/pages/blog/types"

const StaticPages: { [key: string]: StaticPageType } = {
    ['test-project-1']: {},
    ['test-project-2']: {
        locale: 'zh'
    },
    ['project-ocr-001']: {
        locale: ['en', 'zh'],
        // certain user role is required to view the content }
        restricted: true,
    },
    ['wx-test-1']: {},
}

export default StaticPages