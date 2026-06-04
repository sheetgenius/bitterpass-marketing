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

test("home page explains the post-request path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/What happens next/i)).toBeVisible();
  await expect(page.getByText(/Approved teams get the current console and CLI onboarding path/i)).toBeVisible();
  await expect(page.getByText(/BitterDesk is the path for access requests, missing invitations, and stalled setup/i)).toBeVisible();
});

test("home page routes access requests to BitterDesk instead of a dead static form", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('form[action="/__submit"]')).toHaveCount(0);

  const requestLink = page.getByRole("link", { name: /Start request in BitterDesk/i });
  await expect(requestLink).toBeVisible();
  await expect(requestLink).toHaveAttribute("href", "https://bitterdesk.com");
  await expect(page.getByText(/Private-launch terms are scoped manually/i)).toBeVisible();
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

test("home page exposes search and authority proof metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://bitterpass.com/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://bitterpass.com/og-image.svg",
  );

  const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
  expect(jsonLd).toContain('"SoftwareApplication"');
  expect(jsonLd).toContain('"FAQPage"');
  expect(jsonLd).toContain("Operator-approved credentials for agents with scoped, expiring, revocable, auditable access.");

  await expect(page.getByRole("heading", { name: /Buyer questions before a runner/i })).toBeVisible();
  await expect(page.getByText(/BitterPass owns approval, issuance, expiry, revocation, and audit receipts/i)).toBeVisible();
});

test("home page keeps Atlas authority framing instead of consumer password-manager framing", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/scoped bundles, expiry, revocation, and receipts/i)).toBeVisible();
  await expect(page.getByText(/There is no self-serve signup queue or static form endpoint/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Credential authority for operators running agents/i })).toBeVisible();
  await expect(page.getByText(/generic password manager/i)).toHaveCount(0);
});

test("deploy health endpoint responds for live verification", async ({ page }) => {
  const response = await page.goto("/up/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toContainText("ok");
});

test("account paths bridge to Bitter account surfaces", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Sign in through BitterPass Console." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue with Bitter account" })).toHaveAttribute(
    "href",
    "https://app.bitterpass.com/login",
  );
  await expect(page.getByRole("link", { name: "Request Bitter account" })).toHaveAttribute(
    "href",
    "https://bitter.sh/signup",
  );

  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Request access through Bitter." })).toBeVisible();
  await expect(page.getByText("There is no BitterPass-only signup path")).toBeVisible();
  await expect(page.getByRole("link", { name: "Request Bitter account" })).toHaveAttribute(
    "href",
    "https://bitter.sh/signup",
  );
});

test("public crawler and markdown routes mirror the product boundary", async ({ page }) => {
  let response = await page.goto("/llms.txt");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toContainText("Marketing surface only");
  await expect(page.locator("body")).toContainText("app.bitterpass.com");

  response = await page.goto("/llms-full.txt");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toContainText("Claim Ledger");
  await expect(page.locator("body")).toContainText("CTA Truth");

  response = await page.goto("/index.md");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toContainText("operator-approved credential authority");
  await expect(page.locator("body")).toContainText("custody boundary");

  response = await page.goto("/cli-setup.md");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toContainText("invitation-gated");
  await expect(page.locator("body")).toContainText("runner identity");
});
