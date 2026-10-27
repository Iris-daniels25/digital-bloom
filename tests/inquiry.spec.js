import { test, expect } from '@playwright/test'
import { submitInquiry } from '../src/components/submitInquiry.js'

const endpoint = 'https://formspree.io/f/xjyywkkn'

test.beforeEach(async ({ page }) => {
  // Block all external traffic by default: tests must never send real inquiries.
  await page.route('https://**/*', route => route.abort())
})

async function fill(page) {
  await page.getByLabel('Name', { exact: false }).first().fill('Test Customer')
  await page.getByLabel(/^Email/).fill('test@example.com')
  await page.getByLabel('Business/Organization').fill('Test Organization')
  await page.getByLabel('Project Details').fill('Mocked inquiry only')
}

test('validation, conditional phone, package payload, pending lock and confirmed success', async ({ page }) => {
  let calls = 0
  let release
  let request
  await page.route(endpoint, async route => {
    calls++
    request = route.request()
    await new Promise(resolve => { release = resolve })
    await route.fulfill({ json: { ok: true } })
  })
  await page.goto('/contact?preview=full&service=website-design-development&package=Website%20Refresh')
  await expect(page.getByText('Selected package:')).toContainText('Website Refresh')
  await expect(page.getByLabel('Service Interested In')).toHaveValue('website-design-development')
  await page.getByRole('button', { name: 'Send Inquiry' }).click()
  await expect(page.getByText('Enter your name.', { exact: true })).toBeVisible()
  expect(calls).toBe(0)
  await fill(page)
  await page.getByLabel('Preferred Contact Method').selectOption('Phone')
  await page.getByRole('button', { name: 'Send Inquiry' }).click()
  await expect(page.getByText('Enter a phone number including your area or country code.')).toBeVisible()
  await page.getByLabel('Phone number').fill('+1 555 123 4567')
  await page.getByRole('button', { name: 'Send Inquiry' }).click()
  await expect(page.getByRole('button', { name: 'Sending' })).toBeDisabled()
  await expect.poll(() => calls).toBe(1)
  await page.locator('form.inquiry-form').evaluate(form => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  expect(calls).toBe(1)
  expect(request.method()).toBe('POST')
  expect(request.headers().accept).toBe('application/json')
  const body = request.postDataBuffer().toString()
  for (const value of ['name="name"', 'Test Customer', 'test@example.com', 'Test Organization', 'website-design-development', 'Website Refresh', 'name="message"', 'Mocked inquiry only', '+1 555 123 4567', 'name="_gotcha"']) expect(body).toContain(value)
  await expect(page.locator('[name="_gotcha"]')).toBeHidden()
  release()
  await expect(page.getByRole('heading', { name: 'Thank you! Your inquiry has been sent.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Inquiry Sent' })).toBeDisabled()
})

for (const scenario of ['validation', 'rate-limit', 'server', 'network', 'rejected-success']) {
  test(`${scenario} failure retains entries and permits a corrected retry`, async ({ page }) => {
    let calls = 0
    await page.route(endpoint, route => {
      calls++
      if (calls > 1) return route.fulfill({ json: { ok: true } })
      if (scenario === 'network') return route.abort('failed')
      if (scenario === 'server') return route.fulfill({ status: 500, body: '<html>Error</html>' })
      return route.fulfill({ status: scenario === 'validation' ? 422 : scenario === 'rate-limit' ? 429 : 200, json: { ok: false, errors: [{ message: 'Please try again later.' }] } })
    })
    await page.goto('/contact?preview=full')
    await fill(page)
    await page.getByRole('button', { name: 'Send Inquiry' }).click()
    await expect(page.getByRole('alert')).toContainText('Your entries are still here.')
    await expect(page.getByLabel('Project Details')).toHaveValue('Mocked inquiry only')
    await expect(page.getByLabel(/^Email/)).toHaveValue('test@example.com')
    await expect(page.getByRole('heading', { name: /Thank you!/ })).toHaveCount(0)
    await page.getByRole('button', { name: 'Send Inquiry' }).click()
    await expect(page.getByRole('heading', { name: /Thank you!/ })).toBeVisible()
    expect(calls).toBe(2)
  })
}

test('service-page preselection and mobile form fit remain intact', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/services/website-design-development?preview=full')
  await expect(page.getByLabel('Service Interested In')).toHaveValue('website-design-development')
  await page.getByLabel('Service Interested In').selectOption('general-inquiry')
  await expect(page.getByLabel('Service Interested In')).toHaveValue('general-inquiry')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('missing configuration and timeout failures give an actionable error', async () => {
  let calls = 0
  await expect(submitInquiry(new FormData(), '', async () => { calls++ })).rejects.toThrow('Your entries are still here.')
  expect(calls).toBe(0)
  await expect(submitInquiry(new FormData(), endpoint, async (_url, options) => {
    expect(options.signal).toBeInstanceOf(AbortSignal)
    throw new DOMException('Timed out', 'TimeoutError')
  })).rejects.toThrow('Please try again, or email hello@thedigitalbloom.co')
})
