import render from "./render";

describe("Test render", () => {
  it("render is Function", () => {
    expect(render).toBeInstanceOf(Function);
    expect(render).toBeDefined();
    expect(render).toBeTruthy();
  });
  it("render called ClickonButton", () => {
    const array = [
      {
        coord: {
          lon: 37.6156,
          lat: 55.7522,
        },
        weather: [
          {
            icon: "04d",
          },
        ],
        main: {
          temp: 291.54,
          pressure: 1003,
          humidity: 56,
        },
        name: "Moscow",
      },
    ];

    document.body.innerHTML = `
        <div class="container">
            <div class="weather">
                <h1>weather forecast</h1>
                <ul class="weather__list"></ul>
                <input type="text" placeholder="Please enter the name of the city">
                <button>Submit</button>
                <ul class="weather__name"></ul>
            </div>
            <div id="map" style="width: 100%; height: 200px"></div>
        </div>
        `;

    const ClickonButton = jest.fn().mockImplementation(() => 42);
    const list = document.querySelector(".weather__list");
    const weather = document.querySelector(".weather__name");
    render(array, list, weather, ClickonButton);
    const listArray = [...list.children];
    expect(ClickonButton).toHaveBeenCalled();
    expect(listArray.length).toBe(1);
  });
});
