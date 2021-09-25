function occupationSizeChanger() {
  console.log("working");
  let occ = document.getElementById("occupations");
  let top = occ.getClientRects()[0].top;
  console.log("top: ", top);
  let newSize = (-2 * scrollY) / occ.getClientRects()[0].height + 3.5;
  console.log("pre newSize: ", newSize);
  document.getElementById("occupations").style.fontSize = newSize + "rem";
}

function occupationChange() {
  const careers = [
    "Software Engineer",
    "Mechanical Engineer",
    "Systems Engineer",
    "Roboticist",
    "Product Dev Engineer",
    "10x Engineer",
    "Powerlifter"
  ];
  
  let prev = document.getElementById('occupations').innerText;

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

setInterval(occupationChange, 300);

window.addEventListener("scroll", function () {
  occupationSizeChanger();
  console.log("windowY: ", window.scrollY);
});
