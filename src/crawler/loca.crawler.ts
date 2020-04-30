//@ts-nocheck
//@ts-ignore
require("@babel/register")
require("dotenv").config({ path: "../../config/.env" });
// const jejuSchema = require('../database/schemas/')
const saveLocationToDB = require('./save.locaTags.ts')
const puppeteer = require("puppeteer");

const jeju = "https://www.instagram.com/explore/tags/%EC%A0%9C%EC%A3%BC%EB%8F%84/";
var beforeClick, count, location;

const tab = async (id, pwd, url) => {
    beforeClick = 0;
    count = 0;

    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    // Instagram 로그인
    try {
        await page.goto("https://www.instagram.com/accounts/login/");
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', id);
        await page.type('input[name="password"]', pwd);
        await page.click('button[type="submit"]');
    } catch (error) {
        console.log('인스타그램 에서 로그인을 차단했습니다.', error)
    }
    // 모달 클릭
    await page.waitForSelector(".aOOlW.HoLwm");
    await page.click(".aOOlW.HoLwm");
    await page.goto(url); // redirect 서울, 제주 ...
    await page.waitForSelector("article div a");

    // Click 'a' tag
    await Promise.all([
        page.$eval("article div a", el => el.click()),
        page.waitForNavigation()
    ]).catch(e => console.log(e));

    // 최신 인스타그램 데이터만 뽑기 위해서 인기 게시물에 해당하는 페이지를 클릭으로 넘어갑나다.
    while (beforeClick < 9) {
        await page.click("._65Bje.coreSpriteRightPaginationArrow");
        beforeClick++;
    }

    // 해시태그를 뽑아냅니다.
    while (count < 10) {
        try {
            await page.waitForSelector(".M30cS", { timeout: 1000 });
            location = await page.evaluate(() => {
                const div = document.querySelector(".M30cS").textContent;
                return div;
            });
        } catch (error) {
            console.log("로케이션 태그가 존재하지 않습니다.", error);

            if (location !== "") {
                saveLocationToDB(process.env.MONGO_URL_JEJU, jejuSchema, location);
            }
            await page.click("._65Bje.coreSpriteRightPaginationArrow");
        }
        //Click the > button when the page is crawling.
        await page.click("._65Bje.coreSpriteRightPaginationArrow");
        saveLocationToDB(process.env.MONGO_URL_JEJU, jejuSchema, location);
        count++;
    }
    await page.waitFor(25000);
    browser.close();
}

// 크롤러 실행
tab(process.env.INSTA_ID, process.env.INSTA_PASSWORD, jeju)