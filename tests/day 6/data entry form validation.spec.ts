import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Data Entry Form Validation', ()=>{

test.beforeEach(async({ page })=>{
   await page.goto(pageURL)
})
/*
test.afterEach(async({page})=>{
    await page.close();
})
*/    
//Select Sun checkbox
test('Select Sun checkbox', async({page})=>{

   const checkbox =  page.getByLabel('Sun')
   await checkbox.check()

})
//Select all checkboxes (Mon–Sun)
test('Select all checkboxes', async({page})=>{

   const alldays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

   for(const day of alldays){

    const check = page.getByLabel(day)
    await check.check()
    await expect(check).toBeChecked()


   }

})



})