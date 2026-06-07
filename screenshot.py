from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/screenshot.png', full_page=True)
    print(f"URL: {page.url}")
    print(f"Title: {page.title()}")
    errors = page.evaluate("() => document.querySelector('#nextjs__container_errors_desc')?.textContent || 'No errors'")
    print(f"Errors: {errors}")
    content = page.evaluate("() => document.body.innerText.substring(0, 2000)")
    print(f"Content:\n{content}")
    browser.close()
