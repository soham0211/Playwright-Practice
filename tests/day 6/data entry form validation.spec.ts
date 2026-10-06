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

   const last3days = ['Sun', 'Fri', 'Sat']

   for(const day of last3days){

   //Uncheck last 3
    const uncheck = page.getByLabel(day)
    await uncheck.uncheck()
    await expect(uncheck).not.toBeChecked()
   }

   //Toggle all checkboxes 
   for(const day of alldays){
      const dayStatus = page.getByLabel(day)
      if(await dayStatus.isChecked()){

         await dayStatus.uncheck()
 
         await expect(dayStatus).not.toBeChecked()
      }
      else{
         await dayStatus.check()
         await expect(dayStatus).toBeChecked()
      }
   }

})

//Select checkboxes using index
test('Select checkboxes using index', async({page})=>{

   const alldays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   const indexDays = [1, 3, 6]

   for( const index of indexDays){
      const day = page.getByLabel(alldays[index])
     await day.check()
   }
   

})

//Select Fri checkbox
test('Select Fri checkbox', async({page})=>{

   const checkbox =  page.getByLabel('Fri')
   await checkbox.check()

})

//Submit Button Validation 
test('Submit Button Validation ', async({page})=>{

   //Locate Submit button 
   const submitButton = page.getByRole('button', {name: 'Submit'}).first()
   await expect(submitButton).toBeVisible()

   //Click on Submit button and Verify button state 
   await submitButton.click()
   await expect(submitButton).toBeEnabled()




})




})