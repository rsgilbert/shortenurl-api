import express from 'express'
import http from '@passioncloud/http'
import { query, body, } from 'express-validator'
import { expressValidatorHandler } from './router-utils.js'

import { shortenUrl } from '../shorten.service.js'

const shortenRouter = express.Router()

shortenRouter.post('/', 
    body('url').isLength({min: 1}), 
    expressValidatorHandler,
    async (req, res, next) => {
    try {
        const { url } = req.body
        const id = await shortenUrl(url)
        const shortUrl = `${req.protocol}://${req.get('host')}/${id}`
        return res.json({ shortUrl })
    }
    catch (e) {
        next(e)
    }
})


export default shortenRouter