// const totalItemInDb = [
//   { id: 1, productName: 'Apple', category: 'Fruit', available: true },
//   { id: 2, productName: 'Banana', category: 'Fruit', available: true },
//   { id: 3, productName: 'Carrot', category: 'Vegetable', available: true },
//   { id: 4, productName: 'Broccoli', category: 'Vegetable', available: false },
//   { id: 5, productName: 'Orange', category: 'Fruit', available: false },
//   { id: 6, productName: 'Grapes', category: 'Fruit', available: true },
//   { id: 7, productName: 'Cabbage', category: 'Vegetable', available: true },
//   { id: 8, productName: 'Strawberry', category: 'Fruit', available: true },
//   { id: 9, productName: 'Spinach', category: 'Vegetable', available: false },
//   { id: 10, productName: 'Pear', category: 'Fruit', available: true },
//   { id: 11, productName: 'Tomato', category: 'Vegetable', available: true },
//   { id: 12, productName: 'Watermelon', category: 'Fruit', available: true },
//   { id: 13, productName: 'Potato', category: 'Vegetable', available: false },
//   { id: 14, productName: 'Pineapple', category: 'Fruit', available: true },
//   { id: 15, productName: 'Cauliflower', category: 'Vegetable', available: true },
//   { id: 16, productName: 'Mango', category: 'Fruit', available: false },
//   { id: 17, productName: 'Lettuce', category: 'Vegetable', available: true },
//   { id: 18, productName: 'Kiwi', category: 'Fruit', available: true },
//   { id: 19, productName: 'Cucumber', category: 'Vegetable', available: false },
//   { id: 20, productName: 'Cherry', category: 'Fruit', available: true },
// ];


import apple from './images/apple.jpeg';
import mango from './images/mango.jpeg';
import pineApple from './images/pineapple.jpeg';
import Pomegranate from './images/pomegranate.jpeg';
import capscicumGreen from './images/capscicum-green.jpeg';
import litchi from './images/litchi.jpeg';
import banana from './images/Banana.svg';
import orange from './images/orange.jpeg';
import grapes from './images/grapes.jpeg';
import strawberry from './images/strawberry.jpeg';
import Watermelon from './images/watermelon.jpeg';
import carrot from './images/carrot.jpeg';
import broccoli from './images/broccoli.jpeg';
import tomato from './images/tomato.jpeg';
import cucumber from './images/cucumber.avif';
import peach from './images/peach.jpeg';
import spinach from './images/spinach.jpeg';
import potato from './images/potato.jpeg';
import cauliflower from './images/cauliflower.jpeg';
import pumpkin from './images/pumpkin.jpeg';
import cherry from './images/cherry.jpeg';
import kiwi from './images/kiwi.jpeg';
import pepper from './images/pepper.jpeg';
import lettuce from './images/lettuce.jpeg';


const totalItemInDb = [
  { id: 1, productName: 'Apple', category: 'Fruit', probability: .45, available: true, imgSrc: apple,price: 25,quantity: 1 },
  { id: 2, productName: 'Banana', category: 'Fruit', probability: .55, available: true, imgSrc: banana,price: 10,quantity: 1 },
  { id: 3, productName: 'Carrot', category: 'Vegetable', probability: .65, available: true, imgSrc: carrot,price: 14,quantity: 1},
  { id: 4, productName: 'Broccoli', category: 'Vegetable', probability: .75, available: false ,imgSrc: broccoli,price: 20,quantity: 1},
  { id: 5, productName: 'Orange', category: 'Fruit', probability: .85, available: false, imgSrc: orange,price: 37,quantity: 1 },
  { id: 6, productName: 'Grapes', category: 'Fruit', probability: .60, available: true, imgSrc: grapes,price: 34,quantity: 1 },
  { id: 7, productName: 'Tomato', category: 'Vegetable', probability: .70, available: true,imgSrc: tomato,price: 27,quantity: 1 },
  { id: 8, productName: 'Cucumber', category: 'Vegetable', probability: .80, available: true,imgSrc: cucumber,price: 26,quantity: 1 },
  { id: 9, productName: 'Peach', category: 'Fruit', probability: .50, available: true,imgSrc: peach,price: 30 ,quantity: 1},
  { id: 10, productName: 'Spinach', category: 'Vegetable', probability: .90, available: false, imgSrc: spinach,price: 23,quantity: 1 },
  { id: 11, productName: 'Mango', category: 'Fruit', probability: .40, available: true, imgSrc: mango,price: 50,quantity: 1 },
  { id: 12, productName: 'Potato', category: 'Vegetable', probability: .70, available: true, imgSrc: potato,price: 17,quantity: 1 },
  { id: 13, productName: 'Strawberry', category: 'Fruit', probability: .75, available: true, imgSrc: strawberry,price: 10,quantity: 1 },
  { id: 14, productName: 'Cauliflower', category: 'Vegetable', probability: .55, available: false, imgSrc: cauliflower,price: 10,quantity: 1 },
  { id: 15, productName: 'Watermelon', category: 'Fruit', probability: .80, available: true, imgSrc: Watermelon,price: 13,quantity: 1 },
  { id: 16, productName: 'Pumpkin', category: 'Vegetable', probability: .65, available: true, imgSrc: pumpkin,price: 44 ,quantity: 1},
  { id: 17, productName: 'Cherry', category: 'Fruit', probability: .50, available: true,imgSrc: cherry,price: 31,quantity: 1 },
  { id: 18, productName: 'Lettuce', category: 'Vegetable', probability: .75, available: true,imgSrc: lettuce,price: 15,quantity: 1 },
  { id: 19, productName: 'Kiwi', category: 'Fruit', probability: .90, available: false,imgSrc: kiwi,price: 12,quantity: 1 },
  { id: 20, productName: 'Pepper', category: 'Vegetable', probability: .45, available: true, imgSrc: pepper,price: 20,quantity: 1},
  { id: 21, productName: 'Litchi', category: 'Fruit',price: 32, imgSrc: litchi, probability: .46,available: true,quantity: 1},
  { id: 22, productName: 'Pineapple', category: 'Fruit', price: 25, imgSrc: pineApple, probability: .84, available: true,quantity: 1 },
  { id: 23, productName: 'Pomegranate', category: 'Fruit', price: 39, imgSrc: Pomegranate, probability: .67,available:true,quantity: 1 },
  { id: 24, productName: 'Capscicum-green', category: 'Vegetable', price: 21, imgSrc: capscicumGreen, probability: .40, available: true ,quantity: 1},
];

export const ShowItemToAddManually = [
  {productName:"Gooseberry"},
  {productName:"Grapefruit"},
  {productName:"Orange"},
  {productName:"Banana"},
  {productName:"Coconut"},
  {productName:"Apple"},
  {productName:"Mango"},
  {productName:"Watermelon"},
  {productName:"Pineapple"}
]



export default totalItemInDb;

export const apiLocalPath='https://b7a4-61-246-192-170.ngrok-free.app';
export const objectDetectionProbability = {
  objectName: [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Strawberry",
    "Mango",
    "Watermelon",
    "Pineapple",
    "Cherry",
    "Peach",
    "Pear",
    "Kiwi",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Plum",
    "Lemon",
    "Lime",
    "Coconut",
    "Pomegranate",
    "Cantaloupe",
    "Honeydew",
    "Fig",
    "Avocado",
    "Papaya",
    "Guava",
    "Passion Fruit",
    "Dragon Fruit",
    "Lychee",
    "Apricot",
    "Nectarine",
    "Cranberry",
    "Raspberry",
    "Gooseberry",
    "Pineapple",
    "Mandarin",
    "Clementine",
    "Tangerine",
    "Mulberry",
    "Star Fruit"
  ],
  objectProbability: [
    0.67,
    0.75,
    0.89,
    0.58,
    0.92,
    0.61,
    0.84,
    0.78,
    0.73,
    0.56,
    0.8,
    0.51,
    0.91,
    0.86,
    0.7,
    0.62,
    0.94,
    0.76,
    0.53,
    0.83,
    0.68,
    0.88,
    0.59,
    0.72,
    0.96,
    0.87,
    0.66,
    0.55,
    0.81,
    0.97,
    0.71,
    0.54,
    0.95,
    0.79,
    0.69,
    0.74,
    0.63,
    0.85,
    0.52,
    0.9,
    0.65,
  ]
}