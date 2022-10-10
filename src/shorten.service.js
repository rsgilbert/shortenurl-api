import db from '../db.js'
import { customAlphabet } from 'nanoid/non-secure'

/**
 * 
 * @param {string} url 
 * @returns { Promise<string> } - a code that can be used to identify the url 
 */
export const shortenUrl = async url => {
    let stmt = 'INSERT INTO urls(id, url) VALUES (?, ?)'
    let values = [generateId(), url]
    await db.query(conn => conn.query(stmt, values))
    return values[0]
}

export const originalUrlFor = async id => {
    let stmt = 'SELECT * FROM urls WHERE id = ? LIMIT 1'
    let values = [id]
    const [result] = await db.query(conn => conn.query(stmt, values))
    if(!result) throw Error('No url found for id ' + id)
    return result.url
}

const generateId = () => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5)
    return nanoid() // 1 in 11 million
}

