/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firstRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firstRequest */ "./js/firstRequest.js");
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listener */ "./js/listener.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./js/render.js");



const input = document.querySelector("input");
const btn = document.querySelector("button");

if (!localStorage.getItem("weather")) {
  (0,_firstRequest__WEBPACK_IMPORTED_MODULE_0__.default)();
}

setTimeout(_render__WEBPACK_IMPORTED_MODULE_2__.default, 500);
btn.addEventListener("click", () => {
  (0,_listener__WEBPACK_IMPORTED_MODULE_1__.default)();
  input.value = "";
});
document.body.addEventListener("keydown", async e => {
  if (e.code === "Enter") {
    (0,_listener__WEBPACK_IMPORTED_MODULE_1__.default)();
    input.value = "";
  }
});

/***/ }),

/***/ "./js/clickonButton.js":
/*!*****************************!*\
  !*** ./js/clickonButton.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _readyMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./readyMap */ "./js/readyMap.js");


const clickonButton = (array = JSON.parse(localStorage.getItem("weather")), weatherListEl = document.querySelector(".weather__name"), ul = document.querySelector(".weather__list"), createMap = _readyMap__WEBPACK_IMPORTED_MODULE_0__.default) => {
  const listName = [...weatherListEl.querySelectorAll("li")];
  const lisArray = [...ul.querySelectorAll("li")];
  listName.forEach(el => {
    el.addEventListener("click", e => {
      lisArray.forEach(item => {
        if (item.children[0].textContent === e.target.textContent) {
          item.classList.remove("hidden");
          const coords = array.find(elem => elem.name === e.target.textContent);
          createMap(coords.coord.lat, coords.coord.lon);
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clickonButton);

/***/ }),

/***/ "./js/firstRequest.js":
/*!****************************!*\
  !*** ./js/firstRequest.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requestWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requestWeather */ "./js/requestWeather.js");
/* harmony import */ var _readyMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readyMap */ "./js/readyMap.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./js/render.js");




const firstRequest = async (memory = [], methodOne = _requestWeather__WEBPACK_IMPORTED_MODULE_0__.default, methodTwo = _render__WEBPACK_IMPORTED_MODULE_2__.default, methodThree = _readyMap__WEBPACK_IMPORTED_MODULE_1__.default) => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (firstRequest);

/***/ }),

/***/ "./js/listener.js":
/*!************************!*\
  !*** ./js/listener.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requestWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requestWeather */ "./js/requestWeather.js");
/* harmony import */ var _readyMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readyMap */ "./js/readyMap.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./js/render.js");




const listener = async (event, memory = JSON.parse(localStorage.getItem("weather")), value = document.querySelector("input").value, methodOne = _requestWeather__WEBPACK_IMPORTED_MODULE_0__.default, methodTwo = _render__WEBPACK_IMPORTED_MODULE_2__.default, methodThree = _readyMap__WEBPACK_IMPORTED_MODULE_1__.default) => {
  if (!value) {
    return false;
  }

  if (memory.some(item => item.name.toLowerCase().trim() === value.trim().toLowerCase())) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listener);

/***/ }),

/***/ "./js/readyMap.js":
/*!************************!*\
  !*** ./js/readyMap.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global ymaps */
const map = document.getElementById("map");

const readyMap = (lat, lon) => {
  ymaps.ready(() => {
    map.innerHTML = " ";
    const myMap = new ymaps.Map("map", {
      center: [lat, lon],
      zoom: 9
    }, {
      searchControlProvider: "yandex#search"
    });
    const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      // eslint-disable-line
      hintContent: "Собственный значок метки",
      balloonContent: "Сenter city"
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#image",
      // Своё изображение иконки метки.
      iconImageHref: "/img/flags.svg",
      // Размеры метки.
      iconImageSize: [36, 36],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (readyMap);

/***/ }),

/***/ "./js/render.js":
/*!**********************!*\
  !*** ./js/render.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clickonButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickonButton */ "./js/clickonButton.js");


const render = (array = JSON.parse(localStorage.getItem("weather")), list = document.querySelector(".weather__list"), weather = document.querySelector(".weather__name"), fn = _clickonButton__WEBPACK_IMPORTED_MODULE_0__.default) => {
  if (array) {
    // eslint-disable-next-line no-param-reassign
    list.innerHTML = ""; // eslint-disable-next-line no-param-reassign

    weather.innerHTML = "";
    array.forEach(item => {
      const li = document.createElement("li");
      const liName = document.createElement("li");
      li.insertAdjacentHTML("afterbegin", `
               <h3>${item.name}</h3>
               <img src="http://openweathermap.org/img/wn/${item.weather["0"].icon}@2x.png" alt="icon">
               <strong>Temperature: ${(item.main.temp - 273.15).toFixed(2)}</strong>
               <strong>Pressure:${item.main.pressure}</strong>
               <strong>Humidity:${item.main.humidity}</strong>
            `);
      liName.textContent = item.name;

      if (list.children.length < 10) {
        list.insertAdjacentElement("afterbegin", li);
        weather.insertAdjacentElement("afterbegin", liName);
      } else {
        const lis = [...list.querySelectorAll("li")];
        const number = array.findIndex(el => el.name === lis[1].children[0].textContent);
        array.splice(number, 1);
        localStorage.setItem("weather", JSON.stringify(array));
        render();
      }

      fn();
    });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./js/requestWeather.js":
/*!******************************!*\
  !*** ./js/requestWeather.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestWeather);

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ ((module) => {

// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"\n    />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\n    <title>Document</title>\n    <script\n      src=\"https://api-maps.yandex.ru/2.1/?apikey=c57f9ad4-b24f-4dbc-840c-94772b04b6bd&lang=ru_RU\"\n      type=\"text/javascript\"\n    ></script>\n  </head>\n\n  <body>\n    <div class=\"container\">\n      <div class=\"weather\">\n        <h1>weather forecast</h1>\n        <ul class=\"weather__list\"></ul>\n        <input type=\"text\" placeholder=\"Please enter the name of the city\" />\n        <button>Submit</button>\n        <ul class=\"weather__name\"></ul>\n      </div>\n      <div id=\"map\"></div>\n    </div>\n  </body>\n</html>\n";
// Exports
module.exports = code;

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ "./scss/style.scss");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/app */ "./js/app.js");



})();

/******/ })()
;
//# sourceMappingURL=main.js.map