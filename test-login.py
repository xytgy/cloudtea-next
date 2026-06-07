from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto('http://localhost:3000/login', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/shot-login-mock.png', full_page=True)
    print(f"URL: {page.url}")
    print(f"Title: {page.title()}")
    browser.close()
