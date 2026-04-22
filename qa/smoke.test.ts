import { test, expect } from "@playwright/test";

test("marketing page loads and shows the title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BitterPass/);
});
