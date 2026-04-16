const { test, expect } = require('@playwright/test');

// Group all tests related to the Tic-Tac-Toe app
test.describe('Tic-Tac-Toe App', () => {

    // Runs before EACH test
    // This ensures every test starts with a fresh page
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // Test that the page loads and basic UI is correct
    test('page loads correctly', async ({ page }) => {
        // Check the title is displayed properly
        await expect(page.locator('h1')).toHaveText('Tic-Tac-Toe');

        // Check initial game state text
        await expect(page.locator('#status')).toHaveText("Player X's turn");
    });

    // Test that a player can click a cell and place an X
    test('player can place X in a cell', async ({ page }) => {
        const firstCell = page.locator('.cell').nth(0);

        // Simulate user clicking the first cell
        await firstCell.click();

        // Verify that the cell now contains 'X'
        await expect(firstCell).toHaveText('X');
    });

    // Test that the AI responds after the player moves
    test('AI makes a move after player', async ({ page }) => {
        const cells = page.locator('.cell');

        // Player move
        await cells.nth(0).click();

        // Wait for AI move (because your AI uses setTimeout)
        await page.waitForTimeout(400);

        // Count how many cells contain X or O
        const filledCells = await cells.filter({ hasText: /X|O/ }).count();

        // There should now be 2 moves: player + AI
        expect(filledCells).toBe(2);
    });

    // Test that clicking the same cell twice does nothing
    test('cannot click same cell twice', async ({ page }) => {
        const cell = page.locator('.cell').nth(0);

        // First click places X
        await cell.click();

        // Second click should be ignored
        await cell.click();

        // Ensure the cell still only contains X (not overwritten)
        await expect(cell).toHaveText('X');
    });

    // Test that the restart button clears the board
    test('restart button clears the board', async ({ page }) => {
        const cells = page.locator('.cell');

        // Make a move so the board is not empty
        await cells.nth(0).click();

        // Click restart button
        await page.click('#restart');

        // Verify all cells are empty again
        for (let i = 0; i < 9; i++) {
        await expect(cells.nth(i)).toHaveText('');
        }
    });

    // Test that the scoreboard exists and starts at 0
    test('scoreboard exists and starts at 0', async ({ page }) => {
        await expect(page.locator('#playerScore')).toHaveText('0');
        await expect(page.locator('#aiScore')).toHaveText('0');
    });

    // Test that score updates after a player win
    test('score updates after a win (basic check)', async ({ page }) => {
        const cells = page.locator('.cell');

        // Attempt to create a quick win for the player
        // NOTE: This may not always succeed due to random AI
        await cells.nth(0).click();
        await page.waitForTimeout(300);

        await cells.nth(1).click();
        await page.waitForTimeout(300);

        await cells.nth(2).click();

        // Wait for game logic + AI
        await page.waitForTimeout(500);

        const playerScore = page.locator('#playerScore');

        // Instead of expecting a specific value,
        // just verify that it is no longer 0
        await expect(playerScore).not.toHaveText('0');
    });

});