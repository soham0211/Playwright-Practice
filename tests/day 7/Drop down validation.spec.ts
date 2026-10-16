import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Drop down validation', ()=>{

/*test.beforeEach(async({page})=>{

await page.goto(pageURL)

})*/

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

test('Multi Select Dropdown (Colors)', async({page})=>{

//Locate Colors dropdown
const colors = page.locator('#colors')
await expect(colors).toBeVisible()

//Get default selected value
await expect(colors).toHaveValue('blue')

//Select multiple options using labels (Red, Green, Yellow)

await colors.selectOption([{label:'Red'},{label:'Green'}, {label:'Yellow'}])

//Select multiple options using values (red, green, yellow) 
await colors.selectOption([{value:'red'},{value:'green'}, {value:'yellow'}])

//Select multiple options using index (0,2,3) 
await colors.selectOption([{index:0},{index:2}, {index:3}])

//Verify multiple selections by values
await expect(colors).toHaveValues(['red', 'green', 'yellow'])

//Verify multiple selections by labels

const countryText = await colors.locator('option:checked').allTextContents()

expect(countryText).toEqual(['Red', 'Green', 'Yellow'])



})

test('Auto-Suggest Dropdown in Flipkart', async({page})=>{

    //Open Flipkart Website
    await page.goto('https://www.flipkart.com/')
    await page.getByText('✕', { exact: true }).click()

    //Search for a Product 
    const search = page.getByPlaceholder('Search for Products, Brands and More').first()
    await search.fill('smart')

    // Handle Auto-Suggest Dropdown
    /*const suggestionLocator = page.locator('.Swx5kP div a span')
    const suggestionList = await suggestionLocator.allTextContents()

    console.log(suggestionList)*/

    //const suggestionLocator = page.locator('form ul li, ._3OO9HO'); // Fallback to reliable list containers
    const suggestionLocator = page.locator('ul li').filter({ hasText: /smart/i })
    // Alternatively, wait specifically for the first suggestion to be visible
    await page.locator('form ul li').first().waitFor({ state: 'visible', timeout: 5000 });

    // Fetch all suggestion texts
    const suggestionList = await suggestionLocator.allTextContents();

    console.log('Suggestions found:', suggestionList);
    for (let i = 0; i < suggestionList.length; i++) {
        const text = suggestionList[i];

        // Check if the text matches what you want
        if (text.toLowerCase().includes('smartphone')) {
            // Use index 'i' to click the actual element from the locator
            await suggestionLocator.nth(i).click();
        }}
            

})

})