"use strict";

/** JS for the static page */

setInterval(occupationChanger, 500);

// Occupations every half second
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

function occupationSizeChanger() {
  let offset = document.getElementById("header").offsetHeight;
  let scrollY = window.scrollY;
  let newSize = (-3 * scrollY) / offset + 3;
  //console.log("new size: ", newSize);
  newSize = newSize < 1 ? 0 : newSize + "rem";
  document.querySelector("#occupational-identity").style.fontSize = newSize;
}

/* heroImageSizeChanger
 * Function that shrinks the Hero Image proportional to scroll distance from the
 * top
 */
function heroImageSizeChanger() {
  let offsetHeight = document.getElementById("header").offsetHeight;
  let newSize = Math.floor((1 + window.scrollY / offsetHeight) * 100);
  //console.log("new size: ", newSize);

  document.getElementById("header").style.backgroundSize = `${newSize}%`;
}

/** function that hides and expands .paragraphs elements */
function scrollingParagraphExpander() {
  let paragraphs = document.querySelectorAll(".paragraphs");
  //let paragraphs = document.querySelectorAll(".paragraphs")[0];
  // if node is in range, expand text, otherwise hide
  paragraphs.forEach(paragraphSizer);
  //paragraphSizer(paragraphs);
}
function paragraphSizer(node) {
  let nodeBounds = node.getBoundingClientRect();
  let nodeY = nodeBounds.top;
  let viewheight = window.innerHeight;
  let ratio = nodeY / viewheight;

  console.log(
    "nodeY: ",
    nodeY,
    "view height: ",
    viewheight,
    "ratio: ",
    ratio,
    "font-size: ",
    node.style.fontSize,
    "delta ",
    (nodeY - viewheight) / viewheight
  );

  if (ratio >= 1.2) {
    node.style.fontSize = 0;
  } else if (ratio > 0.25 && ratio < 0.95) {
    node.style.fontSize = `3rem`;
  }
}

// Main Header occupational identity shrinks on scroll
window.addEventListener("scroll", function () {
  //console.log(document.body.scrollTop);
  //console.log("window scroll: ", window.scrollY);
  occupationSizeChanger();
  heroImageSizeChanger();
  scrollingParagraphExpander();
});
