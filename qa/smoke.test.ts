import { test, expect } from "@playwright/test";

test("marketing page loads and shows the title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BitterPass/);
});

test("home page does not link to the retired sheetgenius/bitter docs path", async ({ page }) => {
  await page.goto("/");
  const brokenLinkCount = await page
    .locator('a[href*="sheetgenius/bitter/blob/main"]')
    .count();
  expect(brokenLinkCount).toBe(0);
});

test("home page exposes the support link to bitterdesk.com", async ({ page }) => {
  await page.goto("/");
  const supportLink = page.locator('a[href*="bitterdesk.com"]').first();
  await expect(supportLink).toBeVisible();
});

test("cli-setup page loads and shows the setup heading", async ({ page }) => {
  const response = await page.goto("/cli-setup");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/CLI setup/);
  await expect(page.getByRole("heading", { name: /Set up the BitterPass CLI/i })).toBeVisible();
});

test("cli-setup page links back to the access form and the console", async ({ page }) => {
  await page.goto("/cli-setup");
  await expect(page.locator('a[href="https://app.bitterpass.com"]').first()).toBeVisible();
  await expect(page.locator('a[href*="#access"]').first()).toBeVisible();
});
