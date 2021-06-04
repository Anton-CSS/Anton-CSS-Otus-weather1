import clickonButton from "./clickonButton";

const render = (
  array = JSON.parse(localStorage.getItem("weather")),
  list = document.querySelector(".weather__list"),
  weather = document.querySelector(".weather__name"),
  fn = clickonButton
) => {
  if (array) {
    // eslint-disable-next-line no-param-reassign
    list.innerHTML = "";
    // eslint-disable-next-line no-param-reassign
    weather.innerHTML = "";
    array.forEach((item) => {
      const li = document.createElement("li");
      const liName = document.createElement("li");
      li.insertAdjacentHTML(
        "afterbegin",
        `
               <h3>${item.name}</h3>
               <img src="http://openweathermap.org/img/wn/${
                 item.weather["0"].icon
               }@2x.png" alt="icon">
               <strong>Temperature: ${(item.main.temp - 273.15).toFixed(
                 2
               )}</strong>
               <strong>Pressure:${item.main.pressure}</strong>
               <strong>Humidity:${item.main.humidity}</strong>
            `
      );
      liName.textContent = item.name;
      if (list.children.length < 10) {
        list.insertAdjacentElement("afterbegin", li);
        weather.insertAdjacentElement("afterbegin", liName);
      } else {
        const lis = [...list.querySelectorAll("li")];
        const number = array.findIndex(
          (el) => el.name === lis[1].children[0].textContent
        );
        array.splice(number, 1);
        localStorage.setItem("weather", JSON.stringify(array));
        render();
      }
      fn();
    });
  }
};
export default render;
