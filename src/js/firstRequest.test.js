import firstRequest from "./firstRequest";

describe("Test firstRequest", () => {
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

  it("firstRequest is Function", async () => {
    await expect(firstRequest).toBeInstanceOf(Function);
  });

  it("firstRequest called fetch, requestWeather, render and ", async () => {
    const result = {
      json: () => ({
        coord: {
          lat: 55.7522,
          lon: 37.6156,
        },
        city: "Moscow",
      }),
    };
    window.fetch = jest.fn().mockResolvedValue(result);

    const requestWeather = jest.fn().mockResolvedValue(result.json());
    const redyMap = jest.fn();
    const render = jest.fn();
    await firstRequest([], requestWeather, render, redyMap);
    const fetchResult = await fetch();
    await expect(fetchResult).toEqual(result);
    await expect(requestWeather).toBeCalled();
    await expect(render).toBeCalled();
    await expect(redyMap).toBeCalled();
  });

  it("firstRequest is return error", async () => {
    console.error = jest.fn();
    window.fetch = jest.fn().mockRejectedValue(new Error("Async error"));
    await firstRequest("kiev");
    expect(console.error.mock.calls[0][0]).toEqual(new Error("Async error"));
  });
});
