import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async({ page })=>{
   await page.goto('https://sdetqa.vercel.app/filters_practice.html')
})

test.afterEach(async({page})=>{
    await page.close();
})


// Verify "Add to cart" for Product 2
test('Filtering locator', async({ page }) => {

    const addToProduct = page.getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', {name:'Add to cart'})

    await expect(addToProduct).toBeVisible()
    await addToProduct.click()
})

//Count items not having "Out of stock"

test('Count items not having "Out of stock"', async({ page }) => {

    const inStock = page.getByRole('listitem')
    .filter({ hasText: 'In stock' })

    await expect(inStock).toHaveCount(3)
    
})

//Find items with "In stock"
test('Find items with "In stock"', async({ page }) => {

    const inStock = page.getByRole('listitem')
    .filter({ hasText: 'In stock' })

    console.log(await inStock.count())
   // await expect(inStock).toHaveCount(3)
    
})

//Find items with "Out of stock"
test('Find items with "Out of stock"', async({ page }) => {

    const outStock = page.getByRole('listitem')
    .filter({ hasText: 'Out of stock' })

    console.log(await outStock.count())
   // await expect(inStock).toHaveCount(3)
}
) 

//Verify elements using data-testid
test('Verify elements using data-testid', async({ page }) => {

   const apple = page.getByTestId('apple')
   const banana = page.getByTestId('banana')
   const orange = page.getByTestId('orange')
   const kiwi = page.getByTestId('kiwi')
   const mango = page.getByTestId('mango')

   await expect(apple).toBeVisible()
   await expect(banana).toBeVisible()
   await expect(orange).toBeVisible()
   await expect(kiwi).toBeVisible()
   await expect(mango).toBeVisible()

   await expect(apple).toContainText('app')
   console.log(await apple.innerText(), await banana.innerText(), await orange.innerText(), await kiwi.innerText(), await mango.innerText())


}
) 

//Count all elements with test ids //Pending
test('Count all elements with test ids', async({ page }) => {

    const countTestId = page.getByRole('listitem')
    .filter({has : })

    console.log(await countTestId.count())
   // await expect(inStock).toHaveCount(3)
}
) 

//Find "Say goodbye" button for John
test('Find "Say goodbye" button for John', async({ page }) => {

    const sayGoodBye = page.getByRole('listitem')
    .filter({hasText : 'John'})
    .getByRole('button', {name : 'Say goodbye'})

    await expect(sayGoodBye).toBeVisible();
    await expect(sayGoodBye).toContainText('Say goodbye')

   // await expect(inStock).toHaveCount(3)
}
) 
