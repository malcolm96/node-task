const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({show:true})

const sportsUrl  = 'https://indianexpress.com/section/sports/';
const businessUrl = 'https://indianexpress.com/section/business/';
const techUrl = 'https://indianexpress.com/section/technology/';

const SportsController = require('./controllers/sports');
const BusinessController = require('./controllers/business');
const TechController = require('./controllers/tech');

let techContent = [];
let businessContent = [];
let sportsContent = [];



nightmare
    .goto(sportsUrl)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .then(response =>{
        sportsContent = getOtherData(response);
       SportsController.saveSportsData(sportsContent);
        nightmare.goto(techUrl)
            .wait('body')
            .evaluate(() => document.querySelector('body').innerHTML)
            .then(response =>{
                techContent = getTechData(response);
                TechController.saveTechData(techContent);
                nightmare.goto(businessUrl)
                    .wait('body')
                    .evaluate(() => document.querySelector('body').innerHTML)
                    .end()
                    .then(response => {
                        businessContent = getOtherData(response);
                        BusinessController.saveBusinessData(businessContent);
                    });
            });
    })
    .catch(err => {
        console.log(err);
});

let getTechData = html =>{
    let techData = [];
    const $ = cheerio.load(html);
    $('div.top-article>ul>li').each((i, elem) =>{
        techData.push(
            {
                title:$(elem).find('h3').text(),
                url:$(elem).find('figure>a').attr('href'),
                image:$(elem).find('img').attr('src')
            });
    });
    return techData;
}

let getOtherData = html => {
    let Data = [];
    const $ = cheerio.load(html);
    $('div.articles').each((i, elem) =>{

        Data.push(
            {
                date:$(elem).find('div.date').text(),
                title:$(elem).find('h2.title>a').text(),
                content:$(elem).find('p').text(),
                imageUrl:$(elem).find('img').attr('data-lazy-src'),
                blogUrl:$(elem).find('h2.title>a').attr('href')
            });
    });
    return Data;
}






