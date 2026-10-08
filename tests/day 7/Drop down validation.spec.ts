import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Drop down validation', ()=>{

test.beforeEach(async({page})=>{

page.goto(pageURL)

})

test.afterEach(async({page})=>{

await page.close()

})

test('Single Select Dropdown', async({page})=>{

//Locate Country dropdown
const countryDropdown = page.locator('#country')  
await expect(countryDropdown).toBeVisible()

//Get default selected value
await expect(countryDropdown).toHaveText('India')



})

})