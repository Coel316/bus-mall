'use strict';

var leftImageEl = document.getElementById('left');
var rightImageEl = document.getElementById('right');
var centerImageEl = document.getElementById('center');

var containerEl = document.getElementById('image_container');

// leftImageEl.src = 'images/bag.jpg';
// leftImageEl.name = 'bag.jpg';
// leftImageEl.title = 'bag.jpg'

// rightImageEl.src = 'images/boots.jpg';
// rightImageEl.name = 'boots.jpg';
// rightImageEl.title = 'boots.jpg';

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

function makeRandom() {
  //below was --> return Math.floor(Math.random() * allProducts.length);
  //without --> return num;
  var num = Math.floor(Math.random() * allProducts.length);
  return num;
}

function renderProducts() {
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();

  //////////////////////////////////////////////////////////
  //created a 3rd array to hold indexes
  uniquePicsArray[2] = makeRandom();
  //////////////////////////////////////////////////////////

  while (uniquePicsArray[0] === uniquePicsArray[1]) {
    // console.log('Duplicate found, Re-rolling');
    uniquePicsArray[1] = makeRandom();
  }

  // add views here
  allProducts[uniquePicsArray[0]].views++;

  //get a random index
  //display a product whose index is the random number
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;

  //add views here
  allProducts[uniquePicsArray[1]].views++;

  rightImageEl.src = allProducts[uniquePicsArray[1]].path;
  rightImageEl.name = allProducts[uniquePicsArray[1]].name;
  rightImageEl.title = allProducts[uniquePicsArray[1]].name;

  //////////////////////////////////////////////////////////
  //add views here & 3rd picture
  allProducts[uniquePicsArray[2]].views++;

  centerImageEl.src = allProducts[uniquePicsArray[2]].path;
  centerImageEl.name = allProducts[uniquePicsArray[2]].name;
  centerImageEl.title = allProducts[uniquePicsArray[2]].name;
  //////////////////////////////////////////////////////////
}

// renderProducts();


new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');


function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  renderProducts();
}

containerEl.addEventListener('click', handleClick);

renderProducts();
