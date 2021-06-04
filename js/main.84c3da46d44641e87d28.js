(()=>{"use strict";const e=async(e="Moscow")=>{try{const t=new URL("https://api.openweathermap.org/data/2.5/weather");t.searchParams.set("q",e),t.searchParams.set("appid","1dc0ee761828522de14faa39722cb3b0");const n=await fetch(t);return await n.json()}catch(e){console.error(e)}},t=document.getElementById("map"),n=(e,n)=>{ymaps.ready((()=>{t.innerHTML=" ";const r=new ymaps.Map("map",{center:[e,n],zoom:9},{searchControlProvider:"yandex#search"}),a=new ymaps.Placemark(r.getCenter(),{hintContent:"Собственный значок метки",balloonContent:"Сenter city"},{iconLayout:"default#image",iconImageHref:"./img/flags.svg",iconImageSize:[36,36],iconImageOffset:[-5,-38]});r.geoObjects.add(a),r.behaviors.disable("scrollZoom")}))},r=(e=JSON.parse(localStorage.getItem("weather")),t=document.querySelector(".weather__name"),r=document.querySelector(".weather__list"),a=n)=>{t.addEventListener("click",(t=>{"LI"===t.target.tagName&&[...r.querySelectorAll("li")].forEach((n=>{if(n.children[0].textContent===t.target.textContent){n.classList.remove("hidden");const r=e.find((e=>e.name===t.target.textContent));a(r.coord.lat,r.coord.lon)}else n.classList.add("hidden")}))}))},a=(e=JSON.parse(localStorage.getItem("weather")),t=document.querySelector(".weather__list"),n=document.querySelector(".weather__name"),o=r)=>{e&&(t.innerHTML="",n.innerHTML="",e.forEach((r=>{const c=document.createElement("li"),s=document.createElement("li");if(c.insertAdjacentHTML("afterbegin",`\n               <h3>${r.name}</h3>\n               <img src="http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png" alt="icon">\n               <strong>Temperature: ${(r.main.temp-273.15).toFixed(2)}</strong>\n               <strong>Pressure:${r.main.pressure}</strong>\n               <strong>Humidity:${r.main.humidity}</strong>\n            `),s.textContent=r.name,t.children.length<10)t.insertAdjacentElement("afterbegin",c),n.insertAdjacentElement("afterbegin",s);else{const n=[...t.querySelectorAll("li")],r=e.findIndex((e=>e.name===n[1].children[0].textContent));e.splice(r,1),localStorage.setItem("weather",JSON.stringify(e)),a()}o()})))},o=a,c=async(t=[],r=e,a=o,c=n)=>{try{const e=await fetch("https://get.geojs.io/v1/ip/geo.json"),n=await e.json(),o=await r(n.city);t.push(o),localStorage.setItem("weather",JSON.stringify(t)),c(o.coord.lat,o.coord.lon),a()}catch(e){console.error(e)}},s=async(t,r=JSON.parse(localStorage.getItem("weather")),a=document.querySelector("input").value,c=e,s=o,i=n)=>{if(!a)return!1;if(r.some((e=>e.name.toLowerCase().trim()===a.trim().toLowerCase())))return!1;const l=await c(a);return l&&r.push(l),localStorage.setItem("weather",JSON.stringify(r)),i(l.coord.lat,l.coord.lon),s(),r},i=document.querySelector("input"),l=document.querySelector("button");localStorage.getItem("weather")||c(),setTimeout(o,500),l.addEventListener("click",(()=>{s(),i.value=""})),document.body.addEventListener("keydown",(async e=>{"Enter"===e.code&&(s(),i.value="")}))})();