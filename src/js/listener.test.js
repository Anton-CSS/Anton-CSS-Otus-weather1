import listener from "./listener";

describe("Test listener", () => {
  it("listener is Function", async () => {
    await expect(listener).toBeInstanceOf(Function);
  });

  it("listener return Promise", async () => {
    await expect(listener()).toBeInstanceOf(Promise);
  });

  it("listener return false", async () => {
    const result = await listener(
      null,
      [{ name: "moscow" }, { name: "kiev" }],
      ""
    );
    await expect(result).toBeFalsy();
  });

  it("listener return false", async () => {
    const methodThree = jest.fn().mockReturnValue({
      coord: {
        lat: 55.7522,
        lon: 37.6156,
      },
    });
    const result = await listener(
      null,
      [{ name: "moscow" }, { name: "kiev" }],
      "moscow",
      () => 24,
      () => 24,
      methodThree
    );
    await expect(result).toBeFalsy();
  });

  it("listener called requestWeather", async () => {
    const requestWeather = jest.fn().mockReturnValue({
      coord: {
        lat: 55.7522,
        lon: 37.6156,
      },
    });
    await listener(
      null,
      [{ name: "moscow" }, { name: "kiev" }],
      "5",
      requestWeather,
      () => 42,
      (a, b) => a + b
    );
    await expect(requestWeather).toHaveBeenCalled();
  });

  it("listener called render", async () => {
    const requestWeather = jest.fn();
    requestWeather.mockReturnValue({
      coord: {
        lat: 55.7522,
        lon: 37.6156,
      },
    });
    const render = jest.fn();
    render.mockReturnValue(42);
    await listener(
      null,
      [{ name: "moscow" }, { name: "kiev" }],
      "5",
      requestWeather,
      render,
      (a, b) => a + b
    );
    await expect(render).toHaveBeenCalled();
  });

  it("listener called readyMap", async () => {
    const requestWeather = jest.fn();
    requestWeather.mockReturnValue({
      coord: {
        lat: 55.7522,
        lon: 37.6156,
      },
    });
    const readyMap = jest.fn();
    readyMap.mockReturnValue(42);
    await listener(
      null,
      [{ name: "moscow" }, { name: "kiev" }],
      "5",
      requestWeather,
      (a, b) => a + b,
      readyMap
    );
    await expect(readyMap).toHaveBeenCalled();
  });
});
