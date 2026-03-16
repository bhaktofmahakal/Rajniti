describe("api base URL helpers", () => {
  const originalApiUrl = process.env.NEXT_PUBLIC_API_URL

  afterEach(() => {
    if (originalApiUrl === undefined) {
      delete process.env.NEXT_PUBLIC_API_URL
    } else {
      process.env.NEXT_PUBLIC_API_URL = originalApiUrl
    }
    jest.resetModules()
  })

  it("defaults to the local v1 API when the env var is missing", async () => {
    delete process.env.NEXT_PUBLIC_API_URL
    jest.resetModules()

    const { getApiBaseUrl, buildApiUrl } = await import("@/lib/api/base")

    expect(getApiBaseUrl()).toBe("http://localhost:8000/api/v1")
    expect(buildApiUrl("/users/check-username")).toBe(
      "http://localhost:8000/api/v1/users/check-username"
    )
  })

  it("appends /api/v1 when only the backend origin is configured", async () => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000/"
    jest.resetModules()

    const { getApiBaseUrl } = await import("@/lib/api/base")

    expect(getApiBaseUrl()).toBe("http://localhost:8000/api/v1")
  })

  it("preserves a configured /api/v1 base URL", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.rajniti.in/api/v1/"
    jest.resetModules()

    const { getApiBaseUrl } = await import("@/lib/api/base")

    expect(getApiBaseUrl()).toBe("https://api.rajniti.in/api/v1")
  })
})
