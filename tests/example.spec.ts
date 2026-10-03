// @ts-check
import { test, expect, Locator } from '@playwright/test';



test('Input Radio and checkbox', async({ page }) => {

 await page.goto('https://sdetqa.vercel.app/pw-locators-demo-app');

 const checkbox1 = page.getByRole('checkbox',{name:' Subscribe to newsletter'})
 await checkbox1.isVisible()
 await checkbox1.click()
 
const text = page.getByText('Welcome, John! 👋')
await text.isVisible()


const label = page.getByLabel('First Name')  
await label.isEditable()
await label.fill('Soham')
  
const Search = page.getByPlaceholder('Search tests...')
await expect(Search).toBeVisible()
await Search.fill('Soham')

const logo = page.getByAltText('Red apple fruit')
await expect(logo).toBeVisible()

const title = page.getByTitle('Total test runs')
await expect(title).toHaveText('4,821Total Runs')
await expect(title).toContainText('821')

const testId = page.getByTestId('add-to-cart-enterprise')
await expect(testId).toBeVisible()
let name = await testId.innerText()
console.log(name)
 
});