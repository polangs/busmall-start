'use strict';

//Global Variables
var imageContainer= document.getElementById('image-container');
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var allProductsArray = [];
var previouslyViewed = [];
var votesRemaining = 25;
// var productsChart;



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
  imageOne.src = allProductsArray[previouslyViewed[0]].filepath;
  imageTwo.src = allProductsArray[previouslyViewed[1]].filepath;
  imageThree.src = allProductsArray[previouslyViewed[2]].filepath;
}
// //aaray that holds data
// var votes = [];
// var views = [];

// function updateChartArray(){
//   for (var i = 0; i < allProductsArray.length; i++){
//     votes[i] = allProductsArray[i].votes;
//     clicks[i] = allProductsArray[i].clicks;
//   }
// function showAllProductsList(){
//   var allProductsArray
// }




// }
// var productsData = {
//   labels: allProductsArray,
//    datasets:[{
//     votes,
//     backgroundColor: [
//       'bisque',
//       'darkgray',
//       'white',
//       'lightblue',
//       'blue',
//     ],
//     hoverBackgroundColor:[
//       'yellow',
//       'yellow',
//       'yellow',
//       'yellow',
//       'yellow',
//     ]
//   }]
// };

// function drawChart({
//   var ctx = document.getElementById('productsChart');
//   productsChart = new prodChart(productsChart,{
//     type:'polarArea',
//     data: votesRemaining,
//     options: {
//       responsive: false,
//       animation: {
//         duration: 2000,
//         easing: 'easeOutBounce'
//       }
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           max: 10,
//           min: 0,
//           stepSize: 1.0
//         }
//       }]
//     }
//   })
// });
// chartDrawn = true;



//event listener
imageContainer.addEventListener('click', handleClick);
//event handler
function handleClick(event){
  renderProduct();
  votesRemaining--;
  if (votesRemaining === 0){
    imageContainer.removeEventListener('click', handleClick);
  } 
}

renderProduct();






