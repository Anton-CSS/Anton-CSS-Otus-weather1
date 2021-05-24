/* eslint-disable */
const requestWeather = async (name = "Moscow") => {
  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("q", name);
    url.searchParams.set("appid", "1dc0ee761828522de14faa39722cb3b0");
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

export default requestWeather;
