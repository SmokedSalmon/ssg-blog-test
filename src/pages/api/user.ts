/**
 * A very simple user module, used to tell the role of blog of other low security content page
 * Self-made of basic Authentication
 */
import type { NextApiRequest, NextApiResponse, GetStaticProps } from 'next'
import { BasicAES128Encoder } from '@/lib/coder'
import users from 'dummyData/users.json'

type RoleTypes = 'admin' | 'member' | 'guest'
type UserRecordType = { name: string, role: RoleTypes }
type ResponseData = {
    message: string,
    name?: string,
    role?: RoleTypes,
}

const PlainUserNameWhiteList = ['jerry', 'smokedsalmon', 'gainaxc2']

const simpleEncoder = (plainText: string) => {
    try {
        return [...(Buffer.from(plainText, 'utf8').toString('base64'))]
            .map(char => char.charCodeAt(0) + 1)
            .map((code) => String.fromCharCode(code))
            .join('')
    } catch (err) {}
}

const simpleDecoder = (encoded: string): (string | undefined) => {
    try {
        return Buffer.from(
            [...encoded]
                .map(char => char.charCodeAt(0) - 1)
                .map((code) => String.fromCharCode(code))
                .join(''),
            'base64'
        ).toString('utf8')
    } catch (err) {}
}

const getUser = (name: string = ''): (UserRecordType | undefined) => {
    if (!name) return
    if (PlainUserNameWhiteList.includes(name)) return users.find(record => record.name === name) as UserRecordType
    try {
        return users.find(record => record.name === BasicAES128Encoder.decode(name)) as UserRecordType
    } catch (error) {
        return
    }
}

/*
 * Get the allow user role from file
*/
// export const getStaticProps: GetStaticProps<{ bodyClass?: string, content: string }> = async () => {
//     // at build time, process.cwd() is the project root
//     const rawMarkdown = await readFile(resolvePath(process.cwd(), './dummyData/CMS/${params.name}.md‘), 'utf-8')
//     return { props: { bodyClass: 'blog', content: rawMarkdown } }
// }

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { u } = req.query as { u: string }
    const user = getUser(u)
    if (!user) {
        res.status(200).json({ message: 'Invalid user' })
    } else {
        res.status(200).json({
            message: `You are asking for ${user.name}'s role? - ${user.role}`,
            name: user.name,
            role: user.role,
        })
    }
}