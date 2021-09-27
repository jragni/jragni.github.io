/* Sets the font size of the  career on the hero image on scroll */
function occupationSizeChanger() {
  const maxSize = 7.5;
  let heroImage = document.getElementById("hero-image");
  let heroImageHeight = heroImage.getClientRects()[0].height;
  let heroImageBottom = heroImage.getClientRects()[0].bottom;
  let ratio = (heroImageHeight - heroImageBottom )/heroImageHeight;

  console.log('ratio: ', ratio);
  
  let newSize = maxSize - maxSize * ratio;
  newSize = newSize > maxSize ? maxSize : newSize;
  const heroText = document.querySelectorAll('.hero-text');
  heroText.forEach(node => {node.style.fontSize = newSize + "vh";});
}

/* Changes the career heading at a set interval on hero image */
function occupationChanger() {
  const careers = [
    "Software \nEngineer",
    "Software \nEngineer",
    "Software \nEngineer",
    "Software \nEngineer",
    "Mechanical \nEngineer",
    "Systems \nEngineer",
    "Robotics \nEngineer",
    "Product \nDevelopment \nEngineer",
    "10x \nEngineer",
    "Powerlifter",
    "Life-Long \nLearner",
    "Better \n Every \n Day",
  ];

  let prev = document.getElementById("occ").innerText;

  /* Checks if next job is the same as old job
     and selects a new one if it is the same */
  function _nextJobGenerator(prev) {
    let idx = Math.floor(Math.random() * careers.length);
    let nextJob = careers[idx];
    return nextJob === prev ? _nextJobGenerator(prev) : careers[idx];
  }
  let nextJob = _nextJobGenerator(prev);

  document.getElementById("occ").innerText = nextJob;
}

const occupationInterval = 750;
setInterval(occupationChanger, occupationInterval);

function heroImageResize() {
  let heroImage = document.getElementById("hero-image");
  let height = heroImage.getClientRects()[0].height;
  let bottom = heroImage.getClientRects()[0].bottom;
  console.log("bottom: ", bottom, "height: ", height);
  document.getElementById("hero-image").style.transform = `scale(${
    1 + 3/2*(height - bottom) / height
  })`;
}

/* changes font color when user scrolls past hero image */
function fontColorChange() {
  let heroSection = document.querySelector(".hero-section");
  // Ratio off of hero image to change color
  let exitRatio = 5 / 7;
  let pointOfSwitch = heroSection.getClientRects()[0].height * exitRatio;
  // console.log("pos: ", pointOfSwitch, "scroll: ", window.scrollY);
  if (window.scrollY > pointOfSwitch) {
    document.querySelectorAll("*").forEach((e) => {
      e.style.color = "gray";
    });
  } else {
    document.querySelectorAll("*").forEach((e) => {
      e.style.color = "white";
    });
  }
}

function navUnderlineOnSection() {
  let sections = ["about", "portfolio", "contact", "story"];
  sections.forEach((section) => {
    let eleBounds = document.getElementById(section).getClientRects()[0];
    if (eleBounds.top === 0 
      || (Math.abs(eleBounds.top) < eleBounds.height && eleBounds.top < 0 )
    ) {
      document.getElementById(section + "-tag").style.textDecoration =
        "underline red";
    } else {
      document.getElementById(section + "-tag").style.textDecoration = "none";
    }
  });
}

window.addEventListener("scroll", function () {
  occupationSizeChanger();
  heroImageResize();
  fontColorChange();
  navUnderlineOnSection();
  let heroImage = document.getElementById("hero-image");

  console.log("windowY: ", window.scrollY);
});
