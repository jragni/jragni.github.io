"use strict";

/** JS for the static page */

setInterval(occupationChanger, 500);

function occupationChanger() {
  let occupations = [
    "Software Engineer",
    "Mechanical Engineer",
    "Systems Engineer",
    "10X-er",
    "Roboticist",
  ];
  let idx = Math.floor(Math.random() * occupations.length);
  document.querySelector("#occupational-identity").innerText = occupations[idx];
}

// Main Header occupational identity shrinks on scroll
window.addEventListener("scroll", function () {
  let newSize = document.body.scrollTop * -0.01 + 4;
  console.log("this is the scroll: ", document.body.scrollTop);
  console.log(newSize);
  newSize = newSize < 0.0125 ? 0 : newSize + "rem";
  document.querySelector("#occupational-identity").style.fontSize = newSize;
});
