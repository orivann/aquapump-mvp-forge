from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8081/contact")
    page.wait_for_load_state("networkidle")
    page.fill('input[id="name"]', "Jules")
    page.fill('input[id="email"]', "jules@example.com")
    page.fill('input[id="company"]', "Jules Inc.")
    page.fill('input[id="phone"]', "123-456-7890")
    page.click('button[role="combobox"]')
    page.click('div[role="option"]:has-text("Pump Selection")')
    page.fill('textarea[id="message"]', "This is a test message.")
    page.click('button[type="submit"]')
    page.wait_for_timeout(2000) # wait for the toast to appear
    page.screenshot(path="/tmp/contact_form_submission.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
