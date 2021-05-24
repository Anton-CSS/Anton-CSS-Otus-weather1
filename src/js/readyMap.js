/* global ymaps */
const map = document.getElementById("map");

const readyMap = (lat, lon) => {
  ymaps.ready(() => {
    map.innerHTML = " ";
    const myMap = new ymaps.Map(
      "map",
      {
        center: [lat, lon],
        zoom: 9,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );
    const myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        // eslint-disable-line
        hintContent: "Собственный значок метки",
        balloonContent: "Сenter city",
      },
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#image",
        // Своё изображение иконки метки.
        iconImageHref: "/img/flags.svg",
        // Размеры метки.
        iconImageSize: [36, 36],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");
  });
};

export default readyMap;
