import requestWeather from "./requestWeather";
import readyMap from "./readyMap";
import render from "./render";

const firstRequest = async (
  memory = [],
  methodOne = requestWeather,
  methodTwo = render,
  methodThree = readyMap
) => {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const result = await response.json();
    const data = await methodOne(result.city);
    memory.push(data);
    localStorage.setItem("weather", JSON.stringify(memory));
    methodThree(data.coord.lat, data.coord.lon);
    methodTwo();
  } catch (e) {
    console.error(e);
  }
};

export default firstRequest;
