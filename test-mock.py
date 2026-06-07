from playwright.sync_api import sync_playwright
import os

pages_to_test = [
    ('/', 'home'),
    ('/products', 'products'),
    ('/products/1', 'product-detail'),
    ('/login', 'login'),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    for path, name in pages_to_test:
        try:
            resp = page.goto(f'http://localhost:3000{path}', wait_until='networkidle', timeout=15000)
            page.wait_for_timeout(2000)
            print(f"[{resp.status}] {name} ({path}) -> {page.url}")
            page.screenshot(path=f'd:/software/cloudtea-next/shot-{name}.png', full_page=True)
        except Exception as e:
            print(f"[ERROR] {name} ({path}): {e}")
    
    browser.close()
