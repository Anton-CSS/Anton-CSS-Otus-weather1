import readyMap from "./readyMap";

const clickonButton = (
  array = JSON.parse(localStorage.getItem("weather")),
  weatherListEl = document.querySelector(".weather__name"),
  ul = document.querySelector(".weather__list"),
  createMap = readyMap
) => {
  const listName = [...weatherListEl.querySelectorAll("li")];
  const lisArray = [...ul.querySelectorAll("li")];
  listName.forEach((el) => {
    el.addEventListener("click", (e) => {
      lisArray.forEach((item) => {
        if (item.children[0].textContent === e.target.textContent) {
          item.classList.remove("hidden");
          const coords = array.find(
            (elem) => elem.name === e.target.textContent
          );
          createMap(coords.coord.lat, coords.coord.lon);
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
};

export default clickonButton;
