import firstRequest from "./firstRequest";
import listener from "./listener";
import render from "./render";

const input = document.querySelector("input");
const btn = document.querySelector("button");

if (!localStorage.getItem("weather")) {
  firstRequest();
}
setTimeout(render, 500);

btn.addEventListener("click", () => {
  listener();
  input.value = "";
});
document.body.addEventListener("keydown", async (e) => {
  if (e.code === "Enter") {
    listener();
    input.value = "";
  }
});
