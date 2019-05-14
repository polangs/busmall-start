'use strict';

//Global Variables
var imageContainer= document.getElementById('image-container');
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var allProductsArray = [];
var previouslyViewed = [];


//constructor
function Product(name){
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProductsArray.push(this);
}


//Instances
new Product ('bag');
new Product ('banana');
new Product ('bathroom');
new Product ('boots');
new Product ('breakfast');
new Product ('bubblegum');
new Product ('chair');
new Product ('cthulhu');
new Product ('dog-duck');
new Product ('dragon');
new Product ('pen');
new Product ('pet-sweep');
new Product ('scissors');
new Product ('shark');
new Product ('sweep');
new Product ('tauntaun');
new Product ('unicorn');
new Product ('usb');
new Product ('water-can');
new Product ('wine-glass');



//generate random picture
function getRandomIndex(){
  return Math.floor(Math.random() * allProductsArray.length);
}

function productSelector(){
  var firstImage = getRandomIndex();
  while (previouslyViewed.includes(firstImage)){
    firstImage = getRandomIndex();
  }
  previouslyViewed.push(firstImage);
  //do this for 2nd and 3rd image
}

function renderProduct(){
  productSelector();
  imageOne.src = allProductsArray[previouslyViewed[0]].filepath;
}
// do this for images 2 and 3 [1] [2]

//event handler
function handleClick(event){
  renderProduct();
}

//event listener
imageContainer.addEventListener('click', handleClick);
//show first set of pictures on click

renderProduct();
