/* functions that handle dynamic changes to DOM */

/* Sets the font size of the  career on the hero image on scroll */
function occupationSizeChanger() {
  const maxSize = 7.5;
  let heroImage = document.getElementById("hero-image");
  let heroImageHeight = heroImage.getClientRects()[0].height;
  let heroImageBottom = heroImage.getClientRects()[0].bottom;
  let ratio = (heroImageHeight - heroImageBottom) / heroImageHeight;

  // console.log('ratio: ', ratio);

  let newSize = maxSize - maxSize * ratio;
  newSize = newSize > maxSize ? maxSize : newSize;
  const heroText = document.querySelectorAll(".hero-text");
  heroText.forEach((node) => {
    node.style.fontSize = newSize + "vh";
  });
}

/* Function that hanges the career heading at a set interval on hero image */
function occupationChanger() {
  const careers = [
    "Full-Stack\nWeb Developer",
    "Full-Stack\nWeb Developer",
    "Full-Stack\nWeb Developer",
    "Software\nEngineer",
    "Software\nEngineer",
    "Software\nEngineer",
    "Mechanical\nEngineer",
    "Systems\nEngineer",
    "Mechanical\nTest\nEngineer",
    "Robotics \nEngineer",
    "Roboticist",
    "Product\nDevelopment\nEngineer",
    "10x \nEngineer",
    "Powerlifter",
    "Life-Long \nLearner",
    "Better \n Every \n Day",
  ];

  let prev = document.querySelectorAll(".occ")[0].innerText;

  /* Checks if next job is the same as old job
     and selects a new one if it is the same */
  function _nextJobGenerator(prev) {
    let idx = Math.floor(Math.random() * careers.length);
    let nextJob = careers[idx];
    return nextJob === prev ? _nextJobGenerator(prev) : careers[idx];
  }
  let nextJob = _nextJobGenerator(prev);
  document.querySelectorAll(".occ").forEach((ele) => {
    ele.innerText = nextJob;
  });
}

const occupationInterval = 750;
setInterval(occupationChanger, occupationInterval);

function heroImageResize() {
  let heroImage = document.getElementById("hero-image");
  let height = heroImage.getClientRects()[0].height;
  let bottom = heroImage.getClientRects()[0].bottom;
  // console.log("bottom: ", bottom, "height: ", height);
  document.getElementById("hero-image").style.transform = `scale(${
    1 + ((3 / 2) * (height - bottom)) / height
  })`;
}

/* changes font color when user scrolls past hero image */
function fontColorChange() {
  let heroSection = document.querySelector(".hero-section");
  // Ratio off of hero image to change color
  let exitRatio = 5 / 7;
  let pointOfSwitch = heroSection.getClientRects()[0].height * exitRatio;
  // console.log("pos: ", pointOfSwitch, "scroll: ", window.scrollY);
  // TODO: Make it so that text and things only appear when scrolling
  if (window.scrollY > pointOfSwitch) {
    document.querySelectorAll("*").forEach((e) => {
      // e.style.color = "#64ffda"
      e.style.color = "#0a192f";
    });
  } else {
    document.querySelectorAll("*").forEach((e) => {
      e.style.color = "white";
    });
  }
}

/** Function that adds an underline when the user is on the pertaining section
 *  of the right-side navbar list 
 */
function navUnderlineOnSection() {
  let sections = ["about", "portfolio", "contact", "story"];
  sections.forEach((section) => {
    let eleBounds = document.getElementById(section).getClientRects()[0];
    if (
      eleBounds.top === 0 ||
      (Math.abs(eleBounds.top-10) <= eleBounds.height && eleBounds.top < 10)
    ) {
      document.getElementById(section + "-tag").style.textDecoration =
        "underline red";
    } else {
      document.getElementById(section + "-tag").style.textDecoration = "none";
    }
  });
}

/* Function that shows the percentage of how far the user is down the page */
function pageScrollPercentage() {
  let scroll = window.scrollY;
  let pageRect = document.querySelector("main").getBoundingClientRect();
  let percentage = Math.round((scroll / pageRect.height) * 100);

  console.log(
    "percentage: ",
    percentage,
    "scroll: ",
    scroll,
    "height: ",
    pageRect.height
  );
  if (percentage > 4 && percentage <= 100) {
    document.getElementById("page-percentage").innerText = `${percentage}%`;
  } else if (percentage > 100) {
    document.getElementById("page-percentage").innerText = '100%';
    console.log('here')
  } else {
    document.getElementById("page-percentage").innerText = '';
  }
}

window.addEventListener("scroll", function () {
  occupationSizeChanger();
  heroImageResize();
  fontColorChange();
  navUnderlineOnSection();
  pageScrollPercentage();

  // console.log("windowY: ", window.scrollY);
});
