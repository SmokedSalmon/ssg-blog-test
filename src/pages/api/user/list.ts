/**
 * A very simple user module, used to tell the role of blog of other low security content page
 * Self-made of basic Authentication
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { BasicAES128Encoder } from '@/lib/coder'
import users from 'dummyData/users.json'

type ResponseData = string | { message: string }

const ListUserPassPhase = '0000' // hard-coded for now, it is not that important

const simpleEncoder = (plainText: string) => {
    try {
        return [...(Buffer.from(plainText, 'utf8').toString('base64'))]
            .map(char => char.charCodeAt(0) + 1)
            .map((code) => String.fromCharCode(code))
            .join('')
    } catch (err) {}
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { pass } = req.query as { pass: string }
    if (!pass || pass !== ListUserPassPhase) {
        res.status(200).json({ message: 'Invalid pass phase' })
    } else {
        const list = users.map(userRecord => ({ name: userRecord.name, encoded: BasicAES128Encoder.encode(userRecord.name) || '<CORRUPTED>' }))
        res.status(200).send(JSON.stringify(list, null, 2))
    }
}