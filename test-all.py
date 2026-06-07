from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    print("=== 1. 登录 ===")
    page.goto('http://localhost:3000/login', wait_until='networkidle')
    page.wait_for_timeout(1500)
    page.screenshot(path='d:/software/cloudtea-next/test-01-login.png', full_page=True)

    page.fill('input#login-username', 'user')
    page.fill('input#login-password', '123456')
    page.click('button[type="submit"]')
    page.wait_for_timeout(3000)
    page.wait_for_load_state('networkidle')
    print(f"  URL after login: {page.url}")
    page.screenshot(path='d:/software/cloudtea-next/test-02-products-after-login.png', full_page=True)

    print("=== 2. 商品列表 ===")
    print(f"  URL: {page.url}")

    print("=== 3. 商品详情 ===")
    page.goto('http://localhost:3000/products/1', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/test-03-product-detail.png', full_page=True)
    print(f"  URL: {page.url}")

    print("=== 4. 购物车 ===")
    page.goto('http://localhost:3000/cart', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/test-04-cart.png', full_page=True)
    print(f"  URL: {page.url}")

    print("=== 5. 订单 ===")
    page.goto('http://localhost:3000/orders', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/test-05-orders.png', full_page=True)
    print(f"  URL: {page.url}")

    print("=== 6. 结算 ===")
    page.goto('http://localhost:3000/checkout', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/test-06-checkout.png', full_page=True)
    print(f"  URL: {page.url}")

    print("=== 7. 收银台 ===")
    page.goto('http://localhost:3000/payment?orderId=mock-order-1', wait_until='networkidle')
    page.wait_for_timeout(2000)
    page.screenshot(path='d:/software/cloudtea-next/test-07-payment.png', full_page=True)
    print(f"  URL: {page.url}")

    print("\n=== 全部测试完成 ===")
    browser.close()
