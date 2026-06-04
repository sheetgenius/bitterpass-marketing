import { defineConfig, devices } from "@playwright/test";

const localBaseUrl = "http://127.0.0.1:8766";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || localBaseUrl;

export default defineConfig({
  testDir: "./qa",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "python3 -m http.server 8766 --directory .output/public",
        url: localBaseUrl,
        reuseExistingServer: false,
        timeout: 10_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
