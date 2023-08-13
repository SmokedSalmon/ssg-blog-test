import { resolve as pathResolve, normalize as pathNormalize } from 'path'
import express from 'express'

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
const publicDir = pathResolve(projectRoot, 'public')
const staticFile = express.static(publicDir)
handler.use(['/api/public', '/public'], staticFile)

export default handler
