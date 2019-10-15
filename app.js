'use strict';

var leftImageEl = document.getElementById('left');
var rightImageEl = document.getElementById('right');
var centerImageEl = document.getElementById('center');
var containerEl = document.getElementById('image_container');

var totalClicks = 0;
// var amtOfTries = 25;

// leftImageEl.src = 'images/bag.jpg';
// leftImageEl.name = 'bag.jpg';
// leftImageEl.title = 'bag.jpg'

// rightImageEl.src = 'images/boots.jpg';
// rightImageEl.name = 'boots.jpg';
// rightImageEl.title = 'boots.jpg';

var allProducts = [];

Product.uniquePicsArray = [];

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
  // var uniquePicsArray = [];
  Product.uniquePicsArray[0] = makeRandom();
  Product.uniquePicsArray[1] = makeRandom();

  //////////////////////////////////////////////////////////
  //created a 3rd array to hold indexes
  Product.uniquePicsArray[2] = makeRandom();
  //////////////////////////////////////////////////////////

  while (Product.uniquePicsArray[0] === Product.uniquePicsArray[1]) {
    // console.log('Duplicate found, Re-rolling');
    Product.uniquePicsArray[1] = makeRandom();
  }

  // add views here
  allProducts[Product.uniquePicsArray[0]].views++;

  //get a random index
  //display a product whose index is the random number
  leftImageEl.src = allProducts[Product.uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[Product.uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[Product.uniquePicsArray[0]].name;

  //add views here
  allProducts[Product.uniquePicsArray[1]].views++;

  rightImageEl.src = allProducts[Product.uniquePicsArray[1]].path;
  rightImageEl.name = allProducts[Product.uniquePicsArray[1]].name;
  rightImageEl.title = allProducts[Product.uniquePicsArray[1]].name;

  //////////////////////////////////////////////////////////
  //add views here & 3rd picture
  allProducts[Product.uniquePicsArray[2]].views++;

  centerImageEl.src = allProducts[Product.uniquePicsArray[2]].path;
  centerImageEl.name = allProducts[Product.uniquePicsArray[2]].name;
  centerImageEl.title = allProducts[Product.uniquePicsArray[2]].name;
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
  if (totalClicks === 25) {
    containerEl.removeEventListener('click', handleClick);

    for (var i = 0; i < allProducts.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = allProducts[i].name + ' had ' + allProducts[i].views + ' Views ' + ' and ' + allProducts[i].votes + ' Votes';
      list.appendChild(listItem);
    }
  }

  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
      allProducts[i].views++;
    }
  }

  totalClicks++;
  renderProducts();
  console.log('TOTAL CLICKS: ', totalClicks);

  // if (totalClicks === amtOfTries){
  //   containerEl.remove();
  // }
}
renderProducts();

// allProducts[i].name + ' has ' + allProducts.name;
containerEl.addEventListener('click', handleClick);

var list = document.getElementById('tally');




