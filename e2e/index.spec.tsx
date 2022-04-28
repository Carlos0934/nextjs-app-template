import { test, expect } from '@playwright/test'

test('should navigate to the home page', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // check if the page title is 'home'
  const title = await page.title()
  expect(title).toBe('home')
})
