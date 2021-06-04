import requestWeather from "./requestWeather";
import readyMap from "./readyMap";
import render from "./render";

const listener = async (
  event,
  memory = JSON.parse(localStorage.getItem("weather")),
  value = document.querySelector("input").value,
  methodOne = requestWeather,
  methodTwo = render,
  methodThree = readyMap
) => {
  if (!value) {
    return false;
  }

  if (
    memory.some(
      (item) => item.name.toLowerCase().trim() === value.trim().toLowerCase()
    )
  ) {
    return false;
  }

  const data = await methodOne(value);
  if (data) {
    memory.push(data);
  }
  localStorage.setItem("weather", JSON.stringify(memory));
  methodThree(data.coord.lat, data.coord.lon);
  methodTwo();
  return memory;
};

export default listener;
