// const totalItemInDb = [
//   { id: 1, name: 'Apple', category: 'Fruit', available: true },
//   { id: 2, name: 'Banana', category: 'Fruit', available: true },
//   { id: 3, name: 'Carrot', category: 'Vegetable', available: true },
//   { id: 4, name: 'Broccoli', category: 'Vegetable', available: false },
//   { id: 5, name: 'Orange', category: 'Fruit', available: false },
//   { id: 6, name: 'Grapes', category: 'Fruit', available: true },
//   { id: 7, name: 'Cabbage', category: 'Vegetable', available: true },
//   { id: 8, name: 'Strawberry', category: 'Fruit', available: true },
//   { id: 9, name: 'Spinach', category: 'Vegetable', available: false },
//   { id: 10, name: 'Pear', category: 'Fruit', available: true },
//   { id: 11, name: 'Tomato', category: 'Vegetable', available: true },
//   { id: 12, name: 'Watermelon', category: 'Fruit', available: true },
//   { id: 13, name: 'Potato', category: 'Vegetable', available: false },
//   { id: 14, name: 'Pineapple', category: 'Fruit', available: true },
//   { id: 15, name: 'Cauliflower', category: 'Vegetable', available: true },
//   { id: 16, name: 'Mango', category: 'Fruit', available: false },
//   { id: 17, name: 'Lettuce', category: 'Vegetable', available: true },
//   { id: 18, name: 'Kiwi', category: 'Fruit', available: true },
//   { id: 19, name: 'Cucumber', category: 'Vegetable', available: false },
//   { id: 20, name: 'Cherry', category: 'Fruit', available: true },
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
  { id: 1, name: 'Apple', category: 'Fruit', probability: 45, available: true, imgSrc: apple,price: 25 },
  { id: 2, name: 'Banana', category: 'Fruit', probability: 55, available: true, imgSrc: banana,price: 10 },
  { id: 3, name: 'Carrot', category: 'Vegetable', probability: 65, available: true, imgSrc: carrot,price: 14},
  { id: 4, name: 'Broccoli', category: 'Vegetable', probability: 75, available: false ,imgSrc: broccoli,price: 20},
  { id: 5, name: 'Orange', category: 'Fruit', probability: 85, available: false, imgSrc: orange,price: 37 },
  { id: 6, name: 'Grapes', category: 'Fruit', probability: 60, available: true, imgSrc: grapes,price: 34 },
  { id: 7, name: 'Tomato', category: 'Vegetable', probability: 70, available: true,imgSrc: tomato,price: 27 },
  { id: 8, name: 'Cucumber', category: 'Vegetable', probability: 80, available: true,imgSrc: cucumber,price: 26 },
  { id: 9, name: 'Peach', category: 'Fruit', probability: 50, available: true,imgSrc: peach,price: 30 },
  { id: 10, name: 'Spinach', category: 'Vegetable', probability: 90, available: false, imgSrc: spinach,price: 23 },
  { id: 11, name: 'Mango', category: 'Fruit', probability: 40, available: true, imgSrc: mango,price: 50 },
  { id: 12, name: 'Potato', category: 'Vegetable', probability: 70, available: true, imgSrc: potato,price: 17 },
  { id: 13, name: 'Strawberry', category: 'Fruit', probability: 75, available: true, imgSrc: strawberry,price: 10 },
  { id: 14, name: 'Cauliflower', category: 'Vegetable', probability: 55, available: false, imgSrc: cauliflower,price: 10 },
  { id: 15, name: 'Watermelon', category: 'Fruit', probability: 80, available: true, imgSrc: Watermelon,price: 13 },
  { id: 16, name: 'Pumpkin', category: 'Vegetable', probability: 65, available: true, imgSrc: pumpkin,price: 44 },
  { id: 17, name: 'Cherry', category: 'Fruit', probability: 50, available: true,imgSrc: cherry,price: 31 },
  { id: 18, name: 'Lettuce', category: 'Vegetable', probability: 75, available: true,imgSrc: lettuce,price: 15 },
  { id: 19, name: 'Kiwi', category: 'Fruit', probability: 90, available: false,imgSrc: kiwi,price: 12 },
  { id: 20, name: 'Pepper', category: 'Vegetable', probability: 45, available: true, imgSrc: pepper,price: 20},
  { id: 21, name: 'Litchi', category: 'Fruit',price: 32, imgSrc: litchi, probability: 46,available: true},
  { id: 22, name: 'Pineapple', category: 'Fruit', price: 25, imgSrc: pineApple, probability: 84, available: true },
  { id: 23, name: 'Pomegranate', category: 'Fruit', price: 39, imgSrc: Pomegranate, probability: 67,available:true },
  { id: 24, name: 'Capscicum-green', category: 'Vegetable', price: 21, imgSrc: capscicumGreen, probability: 40, available: true },
];



export default totalItemInDb;

export const apiLocalPath='https://facd-183-83-219-106.ngrok-free.app';
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