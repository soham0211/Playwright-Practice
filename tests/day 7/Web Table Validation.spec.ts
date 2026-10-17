import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Drop down validation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL)
    })

    test(' Static Web Table Functional Validations', async ({ page }) => {

        //Count number of rows in the table → Expected: 4 and Count number of columns in the table → Expected: 5 
        const staticTable = page.locator('table').first()
        const rows = staticTable.locator('tbody tr')
        const columns = staticTable.locator('thead tr th')

        console.log(await rows.count())
        console.log(await columns.count())
        await expect(rows).toHaveCount(4)
        await expect(columns).toHaveCount(5)

        //Read all data from 3rd row Expected: Keyboard | Electronics | $79 | 0 | Out of Stock

        const thirdRowData = rows.nth(2).locator('td')
        await expect(thirdRowData).toHaveText(['Keyboard', 'Electronics', '$79', '0', 'Out of Stock'])

        // Read all data from the table (excluding header) → Expected: 4 rows of product data
        const allRowDataLocator = staticTable.locator('tbody td')

        const rowCount = await rows.count()
        const tableData: string[][] = []

        for (let i = 0; i < rowCount; i++) {
            const rowByIndex = rows.nth(i).locator('td')

            const specificRowValueByIndex = await rowByIndex.allTextContents()
            tableData.push(specificRowValueByIndex)
        }

        // console.log(tableData)
        //console.table(tableData)

        //Print all product names → Expected: Laptop, Mouse, Keyboard, Monitor
        const productName = tableData.map(row => row[0])
        console.log(productName)

        //console.log(tableData.length)
        //Print products where Stock = 0 → Expected: Keyboard
        for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][3] === '0') {
                console.log(tableData[j][0])
                expect(tableData[j][0]).toEqual('Keyboard')
            }
        }

        //Print products where Status = "In Stock" → Expected: Laptop, Mouse, Monitor 

        for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][4].trim() === 'In Stock') {
                console.log(tableData[j][0].trim())
                const singleProductName = tableData[j][0]
                expect(tableData[j][0]).toEqual(singleProductName)

            }
        }

        //Count number of products "In Stock" → Expected: 3
        let rowcount = 0
        for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][4].trim() === 'In Stock') {

                rowcount++
            }
        }
        console.log("In Stock Count = ", rowcount)


        //Count number of products "Out of Stock" → Expected: 1 
        let columncount = 0
        for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][4].trim() === 'Out of Stock') {

                columncount++
            }
        }
        console.log("Out of Stock Count = ", columncount)

        // Get price of a specific product (e.g., Mouse) → Expected: $29
        for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][0].trim() === 'Mouse') {
                console.log(tableData[j][2].trim())
                expect(tableData[j][2].trim()).toEqual('$29')

            }
        }

        //Calculate total price of all products → Expected: 999 + 29 + 79 + 349 = 1456 
        let totalPrice = 0
        for (let j = 0; j < tableData.length; j++) {
            let productPrice = tableData[j][2]
            totalPrice = totalPrice + parseInt(productPrice.replace('$', ''))
        }
        console.log(totalPrice)
        expect(totalPrice).toBe(1456)

        // Find product with highest price → Expected: Laptop ($999)

        let highestPrice
        for (let k = 1; k < tableData.length; k++) {

            
            let comparePrice

            highestPrice = parseInt(tableData[0][2].replace('$', ''))
            comparePrice = parseInt(tableData[k][2].replace('$', ''))
            if (highestPrice < comparePrice) {

                highestPrice = comparePrice
            }

        }
        console.log(highestPrice)


        // Find product with lowest price → Expected: Mouse ($29)
        let lowestPrice = parseInt(tableData[0][2].replace('$', ''))
        for (let k = 1; k < tableData.length; k++) {

            let comparePrice
            comparePrice = parseInt(tableData[k][2].replace('$', ''))
            if (lowestPrice > comparePrice) {

                lowestPrice = comparePrice
            }

        }
        console.log(lowestPrice)

        //Print products with price greater than $100 → Expected: Laptop, Monitor

        for (let j = 0; j < tableData.length; j++) {
            let productPrice = parseInt(tableData[j][2].replace('$', ''))
            if(productPrice > 100){
                console.log("Product Name = ", tableData[j][0])
            }
            
        }

    })

})
