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

// Product.pics = [
//   document.getElementById('left'),
//   document.getElementById('left'),
//   document.getElementById('left'),

// ];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}


function makeRandom() {
  // below was --> return Math.floor(Math.random() * allProducts.length);
  // without --> return num;
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

  while (Product.uniquePicsArray[0] === Product.uniquePicsArray[1] || Product.uniquePicsArray[0] === Product.uniquePicsArray[2] || Product.uniquePicsArray[1] === Product.uniquePicsArray[2]) {
    console.log('Duplicate found, Re-rolling');
    Product.uniquePicsArray[1] = makeRandom();
    Product.uniquePicsArray[2] = makeRandom();

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

  if (leftImageEl === rightImageEl && rightImageEl === centerImageEl && leftImageEl === centerImageEl) {
    renderProducts();
    console.log('Duplicate found, Re-rolling');
  }

}

// renderProducts();


function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  if (totalClicks === 20) {
    //Need to remove this container
    // containerEl.removeEventListener('click', handleClick);
    containerEl.remove();
    makeChart();
    saveInfo();
    // storeInfo();


    // This was a display of view & votes:
    // for (var i = 0; i < allProducts.length; i++) {
    //   var listItem = document.createElement('li');
    //   listItem.textContent = allProducts[i].name + ' had ' + allProducts[i].views + ' Views ' + ' and ' + allProducts[i].votes + ' Votes';
    //   list.appendChild(listItem);
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

  //   containerEl.remove();
  // }
}

function saveInfo() {
  //stringifiy data
  var allProductsStringified = JSON.stringify(allProducts);

  //store data (from allProducts) into local storage
  localStorage.setItem('data', allProductsStringified);
}

function retrieveInfo() {
  //Retrieve data (from allProducts) from local storage
  var storageallProducts = localStorage.getItem('data');

  //parsing storageallProducts.  Turn data back into an jS object
  var parsedallProducts = JSON.parse(storageallProducts);

  for (var i = 0; i < parsedallProducts.length; i++) {
    new Product(parsedallProducts[i].name);
    // newProduct.votes = parsedallProducts[i].votes;
    // newProduct.views = parsedallProducts[i].view;

  }
}


if (localStorage.data) {
  // takes parsed info, instantiate each object into "banana", "dog" ....

  retrieveInfo();
}
else {
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

}

renderProducts();

// allProducts[i].name + ' has ' + allProducts.name;
containerEl.addEventListener('click', handleClick);

var list = document.getElementById('tally');

Product.barNames = [];
Product.barVotes = [];


var createViewData = function () {
  for (var i = 0; i < allProducts.length; i++) {

    Product.barNames.push(allProducts[i].name);
    Product.barVotes.push(allProducts[i].votes);
  }
};

var makeChart = function () {
  createViewData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.barNames,
      datasets: [{
        label: '# of Votes',
        data: Product.barVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgb(255,255,0, 0.5)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};
