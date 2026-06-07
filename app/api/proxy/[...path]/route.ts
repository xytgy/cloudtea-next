import { NextRequest, NextResponse } from "next/server"

const targetUrl = process.env.PROXY_TARGET_URL || "http://localhost:8080"
const allowedPrefixes = (process.env.PROXY_ALLOWED_PREFIXES || "").split(",").filter(Boolean)

function isAllowedPath(path: string): boolean {
  if (allowedPrefixes.length === 0) return true
  return allowedPrefixes.some((prefix) => path.startsWith(prefix))
}

function getAuthToken(request: NextRequest): string | null {
  const cookieToken = request.cookies.get("cloudtea-token")?.value
  if (cookieToken) return cookieToken
  const authHeader = request.headers.get("authorization")
  if (authHeader) return authHeader
  return null
}

function buildHeaders(request: NextRequest, isFormData: boolean): Headers {
  const headers = new Headers()

  const skipHeaders = new Set([
    "host",
    "origin",
    "referer",
    "connection",
    "content-length",
    "content-type",
  ])

  request.headers.forEach((value, key) => {
    if (!skipHeaders.has(key.toLowerCase())) {
      headers.set(key, value)
    }
  })

  if (!isFormData) {
    headers.set("content-type", "application/json")
  }

  const token = getAuthToken(request)
  if (token) {
    headers.set("authorization", token.startsWith("Bearer ") ? token : `Bearer ${token}`)
  }

  return headers
}

async function proxyRequest(request: NextRequest, path: string[]) {
  const apiPath = path.join("/")
  const fullPath = `/${apiPath}`

  if (!isAllowedPath(fullPath)) {
    return NextResponse.json(
      { code: 403, message: "Forbidden", data: null },
      { status: 403 }
    )
  }

  const targetEndpoint = `${targetUrl}${fullPath}`
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()
  const fullTargetUrl = searchParams ? `${targetEndpoint}?${searchParams}` : targetEndpoint

  const isFormData = request.headers.get("content-type")?.includes("multipart/form-data") ?? false
  const headers = buildHeaders(request, isFormData)

  let body: BodyInit | undefined
  if (request.method !== "GET" && request.method !== "HEAD") {
    if (isFormData) {
      body = await request.formData()
    } else {
      body = await request.text()
    }
  }

  try {
    const response = await fetch(fullTargetUrl, {
      method: request.method,
      headers,
      body,
    })

    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase()
      if (lowerKey !== "transfer-encoding" && lowerKey !== "content-encoding") {
        responseHeaders.set(key, value)
      }
    })

    const contentType = response.headers.get("content-type")
    if (contentType?.includes("application/json")) {
      const data = await response.json()
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      })
    }

    const text = await response.text()
    return new NextResponse(text, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch {
    return NextResponse.json(
      { code: 502, message: "Bad Gateway", data: null },
      { status: 502 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path)
}
