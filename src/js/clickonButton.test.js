import clickonButton from "./clickonButton";

describe("Test ClickonButton", () => {
  it("ClickonButton is Function", () => {
    expect(clickonButton).toBeInstanceOf(Function);
    expect(clickonButton).toBeDefined();
    expect(clickonButton).toBeTruthy();
  });

  it("ClickonButton called readyMap", () => {
    const array = [
      {
        coord: {
          lon: 2.3488,
          lat: 48.8534,
        },
        weather: [
          {
            icon: "01d",
          },
        ],
        main: {
          temp: 288.35,
          pressure: 1019,
          humidity: 62,
        },
        name: "Paris",
      },
      {
        coord: {
          lon: 24.0833,
          lat: 57,
        },
        weather: [
          {
            icon: "01d",
          },
        ],
        main: {
          temp: 286.11,
          pressure: 1009,
          humidity: 66,
        },
        name: "Rīga",
      },
      {
        coord: {
          lon: -0.1257,
          lat: 51.5085,
        },
        weather: [
          {
            icon: "04d",
          },
        ],
        main: {
          temp: 285.73,
          pressure: 996,
          humidity: 73,
        },
        name: "London",
      },
    ];

    document.body.innerHTML = `
        <div class="container">
            <div class="weather">
                <h1>weather forecast</h1>
                <ul class="weather__list">
                    <li>
                       <h3>London</h3>
                       <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon">
                       <strong>Temperature: 285.73</strong>
                       <strong>Pressure:996</strong>
                       <strong>Humidity:73</strong>
                    </li>
                    <li>
                       <h3>Rīga</h3>
                       <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon">
                       <strong>Temperature: 285.73</strong>
                       <strong>Pressure:996</strong>
                       <strong>Humidity:73</strong>
                    </li>
                    <li>
                       <h3>Paris</h3>
                       <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon">
                       <strong>Temperature: 285.73</strong>
                       <strong>Pressure:996</strong>
                       <strong>Humidity:73</strong>
                    </li>
                 </ul>
                <input type="text" placeholder="Please enter the name of the city">
                <button>Submit</button>
                <ul class="weather__name">
                    <li>London</li>
                    <li>Rīga</li>
                    <li>Paris</li>
                </ul>
            </div>
            <div id="map" style="width: 100%; height: 200px"></div>
        </div>
        `;
    const weatherName = document.querySelector(".weather__name");
    const ul = document.querySelector(".weather__list");
    const readyMap = jest.fn();
    const li = weatherName.querySelector("li");
    const lis = [...ul.querySelectorAll("li")];
    clickonButton(array, weatherName, ul, readyMap);
    li.click();
    expect(readyMap).toHaveBeenCalled();
    expect(li.className).toBe("");
    expect(lis[1].className).toBe("hidden");
  });
});
