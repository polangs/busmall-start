'use strict';

//Global Variables
var imageContainer= document.getElementById('image-container');
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var productList = document.getElementById('product-list');
//holds all the index numbers
var allProductsArray = [];
var previouslyViewed = [];
var votesRemaining = 25;



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
// new Product ('sweep');
new Product ('tauntaun');
new Product ('unicorn');
// new Product ('usb');
new Product ('water-can');
new Product ('wine-glass');



//generate random picture//function declaration
function getRandomIndex(){
  return Math.floor(Math.random() * allProductsArray.length);
}

function productSelector(){
  var firstImage = getRandomIndex();
  while (previouslyViewed.includes(firstImage)){
    firstImage = getRandomIndex();
  }
  previouslyViewed.push(firstImage);
  while (previouslyViewed.length > 6){
    previouslyViewed.shift();
  }

  var secondImage = getRandomIndex();
  while (previouslyViewed.includes(secondImage)){
    secondImage = getRandomIndex();
  }
  previouslyViewed.push(secondImage);
  while (previouslyViewed.length > 6){
    previouslyViewed.shift();
  }

  var thirdImage = getRandomIndex();
  while (previouslyViewed.includes(thirdImage)){
    thirdImage = getRandomIndex();
  }
  previouslyViewed.push(thirdImage);
  while (previouslyViewed.length > 6){
    previouslyViewed.shift();
  }
}

//render product
function renderProduct(){
  productSelector();

  //assign src, alt and title
  imageOne.alt = allProductsArray[previouslyViewed[0]].name;
  imageTwo.alt = allProductsArray[previouslyViewed[1]].name;
  imageThree.alt = allProductsArray[previouslyViewed[2]].name;

  imageOne.title = allProductsArray[previouslyViewed[0]].name;
  imageTwo.title = allProductsArray[previouslyViewed[1]].name;
  imageThree.title = allProductsArray[previouslyViewed[2]].name;


  imageOne.src = allProductsArray[previouslyViewed[0]].filepath;
  imageTwo.src = allProductsArray[previouslyViewed[1]].filepath;
  imageThree.src = allProductsArray[previouslyViewed[2]].filepath;


  allProductsArray[previouslyViewed[0]].views++;
  allProductsArray[previouslyViewed[1]].views++;
  allProductsArray[previouslyViewed[2]].views++;

}

function renderList (){
  for ( var i = 0; i < allProductsArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${allProductsArray[i].name} was viewed ${allProductsArray[i].views} times and receieved ${allProductsArray[i].votes} of votes `;
    productList.appendChild(liEl);
  }

}

//array that holds data
var votes = [];
var names = [];
var chartDrawn;
var productsData;


//function that pushes the names and votes to the arrays
function updateChartArray(){
  for (var i = 0; i < allProductsArray.length; i++){
    votes[i] = allProductsArray[i].votes;
    names[i] = allProductsArray[i].name;
  }
}

function drawChart() {
  var data = {
    labels: names,
    datasets:[{
      label: 'Total Votes',
      data: votes,
      backgroundColor: [
        'darkgray',
        'darkgray',
        'darkgray',
        'darkgray',
        'darkgray',
      ],
      hoverBackgroundColor:[
        'white',
        'white',
        'white',
        'white',
        'white',
      ]
    }]
  };

  var ctx = document.getElementById('product-chart').getContext('2d');
  productsData = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}

//creating a variable and storing my stringified data
function createLocalStorage(){
  var stringifiedallProductsArray = JSON.stringify(allProductsArray);
  //passing stringified data into storage and giving it the key to access to my storage
  localStorage.setItem('productsArrayStorage', stringifiedallProductsArray);
}
//function im calling when loading page
function checkingLocalStorage(){
//if local storage has something in it then it's true otherwise it will come as null and cont to else
  if (localStorage.productsArrayStorage){
  //declaring a new var to store my storage in and using my key
    var retrieveProducts = localStorage.getItem('productsArrayStorage');
    //declaring a new var and assigning it to parse my storage data
    var parsedProducts = JSON.parse(retrieveProducts);
    //im combining my all my storage into the variable that will hold my new data
    allProductsArray = parsedProducts;
    renderProduct();
  }else{
    renderProduct();
  }
}

//event listener
imageContainer.addEventListener('click', handleClick);
//event handler
function handleClick(event){

  votesRemaining--;

  for (var i = 0; i < allProductsArray.length; i++){
    if (event.target.alt === allProductsArray[i].name){
      allProductsArray[i].votes++;
    }
  }
  if (votesRemaining === 0){
    imageContainer.removeEventListener('click', handleClick);
    renderList();
    updateChartArray();
    drawChart();
    createLocalStorage();
  }
  renderProduct();

}

// renderProduct();
checkingLocalStorage();
