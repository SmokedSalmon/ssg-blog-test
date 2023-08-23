/**
 * [...slug] is the catch-all routes to contain parameters of uncertain count
 */

import fs from 'fs'
import { resolve as pathResolve, normalize as pathNormalize } from 'path'
import express from 'express'

const isProd = process.env.NODE_ENV === 'production'
export const config = {
    api: { externalResolver: true }
}

const projectRoot = (() => {
	const parts = pathNormalize(__dirname).split('/')
	let layer = 1
	while (layer < 20 && parts.length && parts.pop() !== '.next') {
		layer ++
	}
	return parts.join('/')
})()

const handler = express()
const publicDir = pathResolve(projectRoot, `${isProd ? '.next/' : ''}public`)
const staticFile = express.static(publicDir)
handler.use(['/api/public', '/public'], staticFile)

// test
// handler.use(['/api/public', '/public'], (res, req) => {
// 	const match =  (/\/*(.*)/).exec((res && res.url))
// 	const relativeToPublic = (match && match[1]) || ''
// 	// console.log(relativeToPublic)
// 	// const dir = pathResolve(publicDir, relativeToPublic)
// 	const dir = pathResolve(projectRoot, relativeToPublic)
// 	// console.log(dir)
// 	let result = dir + '\r\n'
// 	result += fs.readdirSync(dir).join('\r\n')

// 	// const result = `${__dirname}\r\n${dir}`
// 	req.status(200).send(result)
// })

export default handler
