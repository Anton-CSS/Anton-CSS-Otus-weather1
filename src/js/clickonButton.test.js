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
    ];

    document.body.innerHTML = `
        <div class="container">
            <div class="weather">
                <h1>weather forecast</h1>
                <ul class="weather__list">
                    <li>
                       <h3>Paris</h3>
                       <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon">
                       <strong>Temperature: 15.2</strong>
                       <strong>Pressure:1019</strong>
                       <strong>Humidity:62</strong>
                    </li>
                    <li>
                       <h3>Rīga</h3>
                       <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="icon">
                       <strong>Temperature: 12.58</strong>
                       <strong>Pressure:1009</strong>
                       <strong>Humidity:66</strong>
                    </li>
                 </ul>
                <input type="text" placeholder="Please enter the name of the city">
                <button>Submit</button>
                <ul class="weather__name">
                    <li>Rīga</li>
                    <li>Paris</li>
                </ul>
            </div>
            <div id="map"></div>
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
    expect(lis[0].className).toBe("hidden");
  });
});
