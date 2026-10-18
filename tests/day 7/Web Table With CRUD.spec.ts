import { test, expect, Locator } from '@playwright/test';
const pageURL = 'https://sdetqa.vercel.app/autoplay.html'

test.describe('Web Table crud validation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL)
    })

    test('Web table with CRUD validation', async ({ page }) => {

        //Open the CRUD Web Table page
        const crudName = page.getByText('Web Table with CRUD')
        await expect(crudName).toHaveText('Web Table with CRUD')

        //Verify the CRUD table is displayed with header
        const dynamicTable = page.locator('#dynamicTable')
        const dynamicHeader = dynamicTable.locator('thead th')
        const headerText = await dynamicHeader.allTextContents()
        console.log(headerText)
        expect(headerText).toEqual(['#', 'Name', 'Role', 'Action'])

        //Verify the input fields and buttons
        const name = page.locator('#newName')
        const role = page.locator('#newRole')
        const addbtn = page.getByText('Add').nth(1)
        const dynamic = page.getByText('+ Dynamic')
        const search = page.getByPlaceholder('Search table...')
        await expect(name).toBeVisible()
        await expect(role).toBeVisible()
        await expect(addbtn).toBeVisible()
        await expect(dynamic).toBeVisible()
        await expect(search).toBeVisible()

        //Verify the default table data

        const crudRows = dynamicTable.locator('tbody tr')
        await expect(crudRows).toHaveCount(2)
        const crudrowsCount = await crudRows.count()

        const crudtestData: string[][] = []

        for (let i = 0; i < crudrowsCount; i++) {
            const eachRow = await crudRows.nth(i).locator('td').allTextContents()
            crudtestData.push(eachRow)
        }

        console.table(crudtestData)
        expect(crudtestData[0][1]).toEqual('Alice')
        expect(crudtestData[1][1]).toEqual('Bob')

        // Enter Sam Tester as Name and QA Lead as Role. Click Add. 
        await name.fill('Sam Tester')
        await role.fill('QA Lead')
        await addbtn.click()

        // Verify the total number of rows after addition
        await expect(crudRows).toHaveCount(3)

        //Search for Alice in the search box. 
        await search.fill('Alice')
        expect(crudtestData[0][1]).toEqual('Alice')
        // await expect(crudRows).toHaveCount(1)

        //Clear the search box
        await search.clear()
        await expect(crudRows).toHaveCount(3)

        // Delete the Bob record by clicking Delete and accept the confirmation dialog.
        const deleteBobRow = crudRows.nth(1).locator('td > button')
        await deleteBobRow.click()
        page.once('dialog', async dialog => {
            // console.log(`Dialog message: ${dialog.message()}`); // Prints the dialog text
            await dialog.accept(); // Clicks OK
        });
        //await expect(crudRows).toHaveCount(2)

        // Click the + Dynamic button. 
        await dynamic.click()

        const crudRowsUpdated = dynamicTable.locator('tbody tr')
        // await expect(crudRowsUpdated).toHaveCount(2)
        const crudrowsCountUpdated = await crudRowsUpdated.count()

        const crudtestDataUpdate: string[][] = []

        for (let i = 0; i < crudrowsCountUpdated; i++) {
            const eachRow = await crudRowsUpdated.nth(i).locator('td').allTextContents()
            crudtestDataUpdate.push(eachRow)
        }

        expect(crudtestDataUpdate[3][1]).toEqual('New')
        expect(crudtestDataUpdate[3][2]).toEqual('Dev')


    })

})