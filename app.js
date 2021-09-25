/* Sets the font size of the  career on the hero image on scroll */
function occupationSizeChanger() {
  let occ = document.getElementById("occupations");
  let top = occ.getClientRects()[0].top;
  let newSize = (-2 * scrollY) / occ.getClientRects()[0].height + 7.5;
  newSize = newSize > 7.5 ? 7.5 : newSize;
  console.log("pre newSize: ", newSize);
  document.getElementById("occupations").style.fontSize = newSize + "vh";
}

/* Changes the career heading at a set interval on hero image */
function occupationChange() {
  const careers = [
    "Software Engineer",
    "Mechanical Engineer",
    "Systems Engineer",
    "Robotics Engineer",
    "Product Development Engineer",
    "10x Engineer",
    "Powerlifter",
    "Life-Long Learner",
  ];
  
  let prev = document.getElementById('occupations').innerText;

  /* Checks if next job is the same as old job
     and selects a new one if it is the same */
  function _nextJobGenerator(prev) {
      let idx = Math.floor(Math.random()*careers.length);
      let nextJob = careers[idx];
      return nextJob === prev 
        ? _nextJobGenerator(prev)
        : careers[idx];
  }
  let nextJob = _nextJobGenerator(prev)

  document.getElementById('occupations').innerText = nextJob;   
}

const occupationInterval = 750;
setInterval(occupationChange, occupationInterval);

function heroImageResize() {
  let heroImage = document.getElementById('hero-image');
  let height = heroImage.getClientRects()[0].height;
  let bottom = heroImage.getClientRects()[0].bottom;
  console.log('bottom: ', bottom, "height: ", height);
  document.getElementById('hero-image')
          .style
          .transform = `scale(${1 + (height-bottom)/height})`;
}

function fontColorChange() {
  let heroSection= document.querySelector('.hero-section');
  let pointOfSwitch = 6*heroSection.getClientRects()[0].height/8;
  console.log('pos: ', pointOfSwitch, 'scroll: ',window.scrollY)
  if (window.scrollY > pointOfSwitch) {
      document.querySelectorAll('*').forEach( e => {
        e.style.color = 'gray';
      });
      
  } else {
      document.querySelectorAll('*').forEach( e => {
        e.style.color = 'white';
      });
  }
}
window.addEventListener("scroll", function () {
  occupationSizeChanger();
  heroImageResize();
  fontColorChange();
  let heroImage = document.getElementById('hero-image');
 
  console.log("windowY: ", window.scrollY);
});

