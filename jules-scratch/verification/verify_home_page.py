from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://192.168.0.2:8080")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()
