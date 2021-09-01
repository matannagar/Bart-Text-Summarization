
const link = "http://127.0.0.1:5000/index?Summary=Churchill%20succeeded%20as%20an%20orator%20despite%20being%20handicapped%20from%20childhood%20with%20a%20speech%20impediment.%20He%20had%20a%20lateral%20lisp%20and%20was%20unable%20to%20pronounce%20the%20letter%20s%2C%20verbalising%20it%20with%20a%20slur.%20His%20first%20speech%20as%20prime%20minister%2C%20delivered%20to%20the%20commons%20on%2013%20may%20was%20the%20%22blood%2C%20toil%2C%20tears%20and%20sweat%22%20speech.%20His%20use%20of%20rhetoric%20hardened%20public%20opinion%20against%20a%20peaceful%20resolution%20and%20prepared%20the%20british%20people%20for%20a%20long%20war.%20He%20drafted%20outside%20experts%20into%20government%20to%20fulfil%20vital%20functions%2C%20especially%20on%20the%20home%20front.%20He%20believed%20that%20the%20only%20option%20was%20to%20fight%20on%2C%20even%20if%20france%20capitulated%2C%20but%20his%20position%20remained%20precarious%20until%20chamberlain%20resolved%20to%20support%20him.%20The%20war%20ended%20on%204%20June%201941%2C%20with%20the%20evacuation%20of%20dunkirk%20from%20allied%20servicemen%2C%20and%20the%20battle%20of%20france%20from%20france%20ended%20on%20tune%20on%204%20February%201942.%20He%20died%20of%20a%20heart%20attack%20in%20December%201941%2C%20at%20the%20age%20of%2048.%20He%20was%20succeeded%20by%20his%20son%2C%20the%20future%20prime%20minister%20of%20the%20UK%2C%20Edward%26nbsp%3BChurchill%2C%20who%20was%20also%20a%20war%20cabinet%20member.%20His%20funeral%20was%20held%20at%20St%20Paul%27s%20Cathedral%2C%20London%2C%20on%2011%20December%201941.%20He%20is%20buried%20in%20a%20plot%20of%20land%20he%20inherited%20from%20his%20father%2C%20which%20he%20had%20inherited%20when%20he%20became%20prime%20minister%20in%201940.%20He%20also%20had%20a%20house%20of%20honour%20at%20St%20James%27%20Palace%2C%20London.%20His%20son%2C%20Edward%2C%20later%20became%20the%20Prime%20Minister%20of%20the%20United%20Kingdom.%20"



// const puppeteer = require('puppeteer');

// async function shorturl(link) {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto("https://www.shorturl.at", { waitUntil: 'networkidle0' });

//     await page.waitForSelector('input[name=u]');
//     await page.$eval('input[name=u]', (el, value) => el.value = value, link);
//     await page.click('input[type="submit"]');
//     // await page.waitForNavigation();
//     await page.waitForSelector('#shortenurl');

//     const result = await page.evaluate(() => {
//         const anchor = document.querySelector('#shortenurl').value;
//         return anchor;
//     });

//     console.log(result);
//     await browser.close();

//     return result;
// };

// shorturl.then(ans => {
//     console.log(ans);
//     console.log("inhere");
//     console.log("inhere2")
// }).catch();

// //


