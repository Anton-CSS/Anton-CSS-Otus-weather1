import requestWeather from "./requestWeather";

describe("Test requestWeather", () => {
  let originalFetch;
  let originalConsole;
  beforeEach(() => {
    originalFetch = window.fetch;
    originalConsole = window.console;
  });
  afterEach(() => {
    window.fetch = originalFetch;
    window.console = originalConsole;
  });

  it("requestWeather is return value", async () => {
    const result = { name: "kiev", json: () => 43 };
    window.fetch = jest.fn().mockResolvedValue(result);
    const data = await requestWeather("kiev");
    expect(data).toBe(43);
  });

  it("requestWeather is function", async () => {
    await expect(requestWeather).toBeInstanceOf(Function);
  });

  it("requestWeather is return error", async () => {
    console.error = jest.fn();
    window.fetch = jest.fn().mockRejectedValue(new Error("Async error"));
    await requestWeather("kiev");
    expect(console.error.mock.calls[0][0]).toEqual(new Error("Async error"));
  });
});
