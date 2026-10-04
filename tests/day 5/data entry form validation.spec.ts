import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Data Entry Form Validation', ()=>{

test.beforeEach(async({ page })=>{
   await page.goto(pageURL)
})

test.afterEach(async({page})=>{
    await page.close();
})

//Page Load Validation
test('Page Load Validation', async({page})=>{

    const logo = page.getByText('AutoPlay')
    await expect(logo).toHaveText('AutoPlay')
})

//Input Fields Validation
test('Input Fields Validation', async({page})=>{

   const firstName = page.getByLabel('Full name')
   const email = page.getByLabel('Email')
   const phone = page.getByLabel('Phone')
   const address = page.getByLabel('Address')

   //Field should be visible & enabled
   await expect(firstName).toBeVisible()
   await expect(firstName).toBeEnabled()

   //Max length should be 15
   await expect(firstName).toHaveAttribute('maxlength', '15')

   //Value should be entered correctly
   firstName.fill('John Canedy')
   await expect(firstName).toHaveValue('John Canedy')

   //Field should be visible and Value should match input
   await expect(email).toBeVisible()
   email.fill('soham@gmail.com')
   await expect(email).toHaveValue('soham@gmail.com')

   //Field should be visible and Value should match input
   await expect(phone).toBeVisible()
   phone.fill('123456')
   await expect(phone).toHaveValue('123456')

// Field should be visible and Value should accept newline input
   await expect(address).toBeVisible()
   address.fill('Room No 0101 /n Soham Royal Homes')
   await expect(address).toHaveValue('Room No 0101 /n Soham Royal Homes')



})


})