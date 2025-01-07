const https = require('https');
const fs = require('fs');
let num = process.env['INPUT_NUM'];
let repo = process.env['INPUT_REPO'];

let name = repo == 'apache/linkis-website' ?  'contributorsWebsite.json' : 'contributors.json'
const options = {headers: {'User-Agent': 'request'}};

// repo such as apache/linkis-website
https.get(`https://api.github.com/repos/${repo}/contributors?page=1&per_page=${num}`, options, res => {
    let chunks = [];
    res.on('data', chunk => {
        chunks.push(chunk);
    });
    res.on('end', () => {
        let jsonstr = Buffer.concat(chunks).toString('utf-8');
        fs.writeFileSync(`./src/components/${name}`, jsonstr, (err) => {
            if(err) console.log(err);
        })
    })
}).on('error', err => {
    console.log('Error: ', err.message);
});



