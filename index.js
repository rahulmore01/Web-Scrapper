const PORT = 8000
// Axios is a promise based HTTP client for the browser and Node. js
const axios = require('axios')
// Cheerio allows editing nearly any HTML or XML document in javascript.
const cheerio = require('cheerio')

const express = require('express')
const app = express()
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors')
app.use(cors())

let url = 'https://www.theguardian.com/uk'

// let url = ''

// function nameValidate() {
//    const url = url.push(document.getElementById("urlInput").value);
//     }


app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))