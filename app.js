const puppeteer = require("puppeteer");
const fs = require('fs');
async function start() {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto("https://web.whatsapp.com");
    await console.log("------Botun Başlaması İçin Whatsapp'a Giriş Yapman Gerekiyor-----")
    await page.waitForSelector("._2cNrC", { timeout: 0 });
    await console.log("------QR KOD ONAYLANDI-----")
    await page.evaluate(async function () {
        let settingsHeader = await document.evaluate('/html/body/div[1]/div/div/div[3]/header', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        let settingsHeaderAdd = await document.createElement('a');
        await settingsHeaderAdd.setAttribute('id', 'senderLink');
        await settingsHeader.appendChild(settingsHeaderAdd)
    })
    const allFileContents = await fs.readFileSync('numbers.txt', 'utf-8');
    const numberstwo = allFileContents.split(/\r?\n/)
    const complateFileContents = await fs.readFileSync('gonderildi.txt', 'utf-8');
    const complatetwo = complateFileContents.split(/\r?\n/)
    for (let index = 0; index < numberstwo.length; index++) {
        const element = await numberstwo[index];
        let elementK = await 0;
        for (let index2 = 0; index2 < complatetwo.length; index2++) {
            const element2 = await complatetwo[index2]
            if (element2 == element) {
                await elementK++;
            }
        }
        if (elementK == 0) {
          
            if (complatetwo.length == 0) {
          

              

                fs.appendFile('gonderildi.txt', element+'\n\n', (err) => {
                    if (err)
                        throw err;
                });
            }
            else {
                fs.appendFile('gonderildi.txt', element+'\n', (err) => {
                    if (err)
                        throw err;
                });
            }
            await page.evaluate(async function (element) {
                let settingsHeaderAdd = await document.querySelector('#senderLink');
                await console.log(`https://api.whatsapp.com/send?phone=${element}`)
                await settingsHeaderAdd.setAttribute('href', `https://api.whatsapp.com/send?phone=${element}&text=QUEENAR%2cqueenarstyle%0d%0a572++Model+Elbise+S+M+L+XL%0d%0a5+renk+(color)%0d%0a14%24%0d%0a%0d%0a*%c4%b0LET%c4%b0%c5%9e%c4%b0M+NUMARALARIMIZ*%0d%0a05398194144%0d%0a05395294144%0d%0ahttps%3a%2f%2ft.me%2fqueenarstylee%0d%0ahttps%3a%2f%2finstagram.com%2fqueenarstyle%3figshid%3dYmMyMTA2M2Y%3d`)
                await settingsHeaderAdd.click();
            }, element)
            try {
                await page.waitForSelector("._3HQNh button.tvf2evcx", { timeout: 5000 });
                page.evaluate(() => {
                    document.querySelector("button.tvf2evcx").click();
                    document.querySelector("._3HQNh ._2jitM ._26lC3").click();
                    document.querySelector("._3iTtj ._14ik1 ul li:first-child button").click();
                });
                let dc = await page.waitForFileChooser({ timeout: 0 })
                await dc.accept(["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"])
                await page.waitForSelector("._1HI4Y ._33pCO ._1w1m1 ._165_h._2HL9j", { timeout: 0 });
                console.log("[" + element + "] Mesaj ve Fotoğraf Gönderildi.")
                page.evaluate(() => {
                    document.querySelector("._1HI4Y ._33pCO ._1w1m1 ._165_h._2HL9j").click();
                })
            } catch (error) {
                console.log("[" + element + "] Bu Numara Engelli Veya Hatalı.")
            }
        }
        else {
            console.log("["+element+"] Bu Numaraya Zaten Mesaj Gönderilmiş.")
        }  
    }
}
start();
