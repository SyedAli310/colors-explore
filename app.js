const res = document.getElementById("result");

const loader = `
<div class="loaders"> 
<div class="loaders-wrapper">
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
</div>
</div>
`;
const API_URL = "https://jsonplaceholder.typicode.com/photos";

String.prototype.insert = function (index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const getColors = async (url) => {
  res.innerHTML = loader;
  const response = await fetch(url);
  const data = await response.json();
  const colors = shuffle(data);
  setTimeout(() => {
    res.innerHTML = "";
    colors.forEach((color) => {
      let colorHexValue = `#${color.thumbnailUrl.split("/")[4]}`;
      if (colorHexValue.length < 7 && colorHexValue.length === 6) {
        colorHexValue = colorHexValue.insert(5, "0");
      }
      const colorCard = document.createElement("div");
      colorCard.classList.add("color-card");
      colorCard.innerHTML = `
            <div class='color-card-bg' style='background-color:${colorHexValue};'></div>
            <p class='color-code'>${colorHexValue}</p>
            `;
      res.appendChild(colorCard);
    });
  }, 1000);
};

window.onload = getColors(API_URL); // get colors on page load
