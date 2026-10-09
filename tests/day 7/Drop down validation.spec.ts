import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Drop down validation', ()=>{

test.beforeEach(async({page})=>{

await page.goto(pageURL)

})

/*test.afterEach(async({page})=>{

await page.close()

})*/

test('Single Select Dropdown', async({page})=>{

//Locate Country dropdown
const countryDropdown = page.locator('#country')  
await expect(countryDropdown).toBeVisible()

//Get default selected value
await expect(countryDropdown).toHaveValue('india')

//Select option using label "USA"
await countryDropdown.selectOption({label:'USA'})

//Select option using value "uk" 
await countryDropdown.selectOption('uk')

//Select option using index (3)
await countryDropdown.selectOption({index: 3})

//Select option using value + label (France)
await countryDropdown.selectOption({value:'france', label:'France'}) 

//Count total dropdown options 
const listCount = await countryDropdown.locator('option').count()
console.log(listCount)
expect(listCount).toBe(5)

//List should contain "Germany" 
const listText = await countryDropdown.locator('option').allTextContents()
await expect(listText).toContain('Germany')

//Print dropdown options 
console.log(listText)



})

})