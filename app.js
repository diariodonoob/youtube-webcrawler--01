require('dotenv').load()
const axios = require('axios')
const cheerio = require('cheerio')


const LeanResponse = (html) => {
    let $ = cheerio.load(html)
    return $('.story-title').map((index, element) => ({
        title: $(element).find('.story-link').text(),
        url: $(element).find('.story-link').attr('href')
    })).get()
}


const SearchNoticies = async (LeanResponse) => {
    try {
        const response = await axios({ url: process.env.FRONT_NOTICIES, method: 'get' })
        const objectReturn = await LeanResponse(response.data)
        return Promise.resolve(objectReturn)
    } catch (err) {
        return Promise.reject(err)
    }
}

SearchNoticies(LeanResponse)
    .then(resp => console.log('response', resp))
    .catch(err => console.log('error', err))