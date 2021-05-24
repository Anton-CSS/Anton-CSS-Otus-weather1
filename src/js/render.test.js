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
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        base: "stations",
        main: {
          temp: 291.54,
          feels_like: 290.9,
          temp_min: 289.97,
          temp_max: 292.9,
          pressure: 1003,
          humidity: 56,
          sea_level: 1003,
          grnd_level: 986,
        },
        visibility: 10000,
        wind: {
          speed: 6.32,
          deg: 147,
          gust: 8.05,
        },
        clouds: {
          all: 92,
        },
        dt: 1621510768,
        sys: {
          type: 2,
          id: 2000314,
          country: "RU",
          sunrise: 1621472965,
          sunset: 1621532579,
        },
        timezone: 10800,
        id: 524901,
        name: "Moscow",
        cod: 200,
      },
      {
        coord: {
          lon: 2.3488,
          lat: 48.8534,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        base: "stations",
        main: {
          temp: 288.35,
          feels_like: 287.54,
          temp_min: 286.69,
          temp_max: 289.94,
          pressure: 1019,
          humidity: 62,
        },
        visibility: 10000,
        wind: {
          speed: 0.89,
          deg: 15,
          gust: 3.58,
        },
        clouds: {
          all: 0,
        },
        dt: 1621511084,
        sys: {
          type: 2,
          id: 2012208,
          country: "FR",
          sunrise: 1621483365,
          sunset: 1621539109,
        },
        timezone: 7200,
        id: 2988507,
        name: "Paris",
        cod: 200,
      },
      {
        coord: {
          lon: 24.0833,
          lat: 57,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        base: "stations",
        main: {
          temp: 286.11,
          feels_like: 285.18,
          temp_min: 284.77,
          temp_max: 286.19,
          pressure: 1009,
          humidity: 66,
          sea_level: 1009,
          grnd_level: 1008,
        },
        visibility: 10000,
        wind: {
          speed: 6.93,
          deg: 331,
          gust: 12,
        },
        clouds: {
          all: 0,
        },
        dt: 1621511042,
        sys: {
          type: 1,
          id: 1876,
          country: "LV",
          sunrise: 1621475759,
          sunset: 1621536282,
        },
        timezone: 10800,
        id: 456173,
        name: "Rīga",
        cod: 200,
      },
      {
        coord: {
          lon: -0.1257,
          lat: 51.5085,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        base: "stations",
        main: {
          temp: 285.73,
          feels_like: 284.95,
          temp_min: 284.33,
          temp_max: 286.48,
          pressure: 996,
          humidity: 73,
        },
        visibility: 10000,
        wind: {
          speed: 1.79,
          deg: 252,
          gust: 6.26,
        },
        clouds: {
          all: 90,
        },
        dt: 1621594426,
        sys: {
          type: 2,
          id: 2019646,
          country: "GB",
          sunrise: 1621569622,
          sunset: 1621626848,
        },
        timezone: 3600,
        id: 2643743,
        name: "London",
        cod: 200,
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
    expect(listArray.length).toBe(4);
  });
});
