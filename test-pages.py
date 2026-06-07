from playwright.sync_api import sync_playwright

pages_to_test = [
    ('/login', '登录页'),
    ('/products', '商品列表'),
    ('/products/1', '商品详情'),
    ('/cart', '购物车'),
    ('/orders', '我的订单'),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    for path, name in pages_to_test:
        try:
            resp = page.goto(f'http://localhost:3000{path}', wait_until='networkidle', timeout=10000)
            page.wait_for_timeout(1500)
            url = page.url
            print(f"[{resp.status}] {name} ({path}) -> {url}")
            page.screenshot(path=f'd:/software/cloudtea-next/screenshot-{path.replace("/", "-")}.png')
        except Exception as e:
            print(f"[ERROR] {name} ({path}): {e}")
    
    browser.close()
