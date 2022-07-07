const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getBooks = (query = 'Indonesia') => new Promise((resolve, reject) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const getDetailBooks = (booksId) => new Promise((resolve, reject) => {
    fetch(`https://play.google.com/store/books/details?id=${booksId}&source=gbs_api`)
    .then(res => res.text())
    .then(res => {
        const $ = cheerio.load(res);
        const rating = $('#yDmH0d > c-wiz.SSPGKf.Czez9d > div > div > div.tU8Y5c > div.wkMJlb.YWi3ub > div > div.qZmL0 > c-wiz:nth-child(3) > section > div > div > div.HJV0ef > div > div > div:nth-child(1) > div.jILTFe').text();
        resolve(rating)
    })
    .catch(err => reject(err))
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const arrayChunk = (arr, len) => {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

module.exports = {
    delay,
    getBooks,
    arrayChunk,
    getDetailBooks
}