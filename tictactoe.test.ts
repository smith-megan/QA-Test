import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})
describe('Single game test', async ()=>{

    test('I can start a game', async () => {

        let button = await (await driver).findElement(By.id('start-game'));
        await button.click();
        
    });

    test('I can place an X in the top left square', async ()=>{
        let X= await(await driver).findElement(By.xpath('//*[@id="cell-0"]'))
        await X.click();
        let found= await(await driver).findElement(By.xpath('//*[@id="cell-0"]')).getText()
        expect(found).toEqual("X")
    }) 
    test('I can place an X in the upper right square', async ()=>{
        let X= await(await driver).findElement(By.xpath('//*[@id="cell-2"]'))
        await X.click();
        
        let found= await(await driver).findElement(By.xpath('//*[@id="cell-2"]')).getText()
        expect(found).toEqual("X")
    })
    test('I can place an X in the bottom right square', async ()=>{
        let X= await(await driver).findElement(By.xpath('//*[@id="cell-8"]'))
        await X.click();
        
        let found= await(await driver).findElement(By.xpath('//*[@id="cell-8"]')).getText()
        expect(found).toEqual("X")
    })
      
    test('Computer places an O', async ()=>{
        let board= await(await driver).findElement(By.xpath('//*[@id="cell-1"]')).getText()
        expect(board).toEqual("O")
    })
    test('I cannot write over another square', async()=>{
        let squareBefore= await(await driver).findElement(By.xpath('//*[@id="cell-1"]'))
        await squareBefore.click()
        let squareAfter=await(await driver).findElement(By.xpath('//*[@id="cell-1"]')).getText()
        expect(squareAfter).toEqual("O")
    })
})