import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Sell.css';

export default function Sell2(props) {
  const [cotton, setCotton] = useState(false);
  const [silk, setSilk] = useState(false);
  const [polyester, setPolyester] = useState(false);
  const [nylon, setNylon] = useState(false);
  const navigate = useNavigate();

  const buttonClick = (e) => {
    var ele1, ele2, ele3, ele4;
    try {
      ele1 = document.getElementById("cottonInput").value;
    }
    catch {
      ele1 = 0.0;
    }
    try {
      ele2 = document.getElementById("silkInput").value;
    } catch {
      ele2 = 0.0;
    }
    try {
      ele3 = document.getElementById("polyesterInput").value;
    } catch {
      ele3 = 0.0;
    }
    try {
      ele4 = document.getElementById("nylonInput").value;
    } catch {
      ele4 = 0.0;
    }

    var arr = [ele1, ele2, ele3, ele4];

    for (let i = 0; i < 4; i++) {
      if (arr[i] === "")
        arr[i] = 0.0;
      else
        arr[i] = parseFloat(arr[i]/100.0);
    }

    let a = document.getElementById("YesButton").checked;     //Returns boolean (T/F)
    let b = document.getElementById("YesButton1").checked;

    const reuse = a ? 1 : 0;
    const recycle = b ? 1 : 0;

    //Label Encoding...
    const label_encode = { "jeans": [6, 29], "trouser": [340, 366], "blouse": [148, 179], "dress": [180, 211], "jacket": [212, 243], "sweater": [1121, 1136], "skirt": [276, 307], "t-shirt": [308, 339], "shorts": [1044, 1045, 1062, 1063] };

    var subcat = (props.subcategory).toLowerCase();
    var id;
    const array = label_encode[subcat];
    console.log(array)

    if (subcat === "shorts") {
      id = array[Math.floor(Math.random() * array.length)];
    }
    else {
      id = Math.floor(Math.random() * (array[1] - array[0]) + array[0]);
    }

    console.log(id)
    // console.log()

    //Send Data to Backend....

    //Image...
    var selectedFile;
    try {
      var fileInput = document.getElementById('file_input');
      selectedFile = (((fileInput.files[0]).name).split("."))[0]
      props.setImage(selectedFile.toLowerCase());
    } catch {
      selectedFile = null;
      props.setImage("jeans");
    }

    //Price....
    props.setPrice(parseFloat(document.getElementById('price').value));
    // if (price === "" || price === null)
    //   props.setPrice(0);
    // else {
    //   props.setPrice(parseFloat(price));
    // }

    props.setProdAdded(true);
    navigate('/', {replace: true});

  }

  return (
    <div className="px-72 mt-6">
      <h1 style={{ fontSize: "x-large", fontWeight: "600" }}>Add Product</h1>
      <p style={{ fontSize: "0.7rem" }}>Adding a product helps consumers to select a suitable product from among varying options and a suitable and eco-friendly product would help sellers to gain trust of consumers, thus increase own profit.<a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">See if your product exists already on Amazon</a></p>
      <div className='flex mb-1 text-sm pt-5' style={{ justifyContent: "space-between" }}><label for="products" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ fontWeight: "600" }}>Variations</label>
        <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">How to Select?</a>
      </div>
      <div style={{ display: "flex" }}>
        <h4 class="mb-2 mr-4 text-gray-900 dark:text-white" style={{ paddingTop: "0.7rem", fontWeight: "400", fontSize: "0.9rem" }}>Composition:</h4>
        <ul class="ulBox items-center w-full text-sm font-medium mr-1.5 text-gray-900 bg-white border border-blue-500 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full border-b sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="vue-checkbox-list" type="checkbox" value="" onClick={() => { setCotton(!cotton) }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cotton</label>
            </div>
            {cotton && (<div class="flex items-center px-1.5 pb-1">
              <input id="cottonInput" placeholder='% of Cotton' type="text" class="w-28 h-8 text-xs bg-blue-100 border-gray-500 rounded focus:ring-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            </div>)}
          </li>
        </ul>
        <ul class="ulBox items-center w-full text-sm mr-1.5 font-medium text-gray-900 bg-white border border-blue-500 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full border-b sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="react-checkbox-list" type="checkbox" value="" onClick={() => { setSilk(!silk) }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Silk</label>
            </div>
            {silk && (<div class="flex items-center px-1.5 pb-1">
              <input id="silkInput" placeholder='% of Silk' type="text" class="w-28 h-8 text-xs bg-blue-100 border-gray-500 rounded focus:ring-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            </div>)}
          </li></ul>
        <ul class="ulBox items-center w-full text-sm mr-1.5 font-medium text-gray-900 bg-white border border-blue-500 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full border-b sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="angular-checkbox-list" type="checkbox" value="" onClick={() => { setPolyester(!polyester) }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="angular-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Polyester</label>
            </div>
            {polyester && (<div class="flex items-center px-1.5 pb-1">
              <input id="polyesterInput" placeholder='% of Polyester' type="text" class="w-28 h-8 text-xs bg-blue-100 border-gray-500 rounded focus:ring-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            </div>)}
          </li></ul>
        <ul class="ulBox items-center w-full text-sm font-medium mr-1.5 text-gray-900 bg-white border border-blue-500 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="laravel-checkbox-list" type="checkbox" value="" onClick={() => { setNylon(!nylon) }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="laravel-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nylon</label>
            </div>
            {nylon && (<div class="flex items-center px-1.5 pb-1">
              <input id="nylonInput" placeholder='% of Nylon' type="text" class="w-28 h-8 text-xs bg-blue-100 border-gray-500 rounded focus:ring-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            </div>)}
          </li></ul>
      </div>

      <div class="flex mt-3">
        <h4 class="mb-2 mr-9 text-gray-900 dark:text-white" style={{ paddingTop: "0.5rem", fontWeight: "400", fontSize: "0.9rem" }}>Reusable?</h4>
        <div class="flex items-center mr-4">
          <input id="YesButton" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="YesButton" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
        </div>
        <div class="flex items-center mr-4">
          <input id="NoButton" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="NoButton" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
        </div>
      </div>

      <div class="flex mt-3">
        <h4 class="mb-2 mr-7 text-gray-900 dark:text-white" style={{ paddingTop: "0.5rem", fontWeight: "400", fontSize: "0.9rem" }}>Recyclable?</h4>
        <div class="flex items-center mr-4">
          <input id="YesButton1" type="radio" value="" name="inline-radio-group1" class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="YesButton1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
        </div>
        <div class="flex items-center mr-4">
          <input id="NoButton1" type="radio" value="" name="inline-radio-group1" class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="NoButton1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
        </div>
      </div>

      <div class="grid gap-6 mb-5 md:grid-cols-2">
        <div>
          <label for="name" class="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <div class="flex">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
              </svg>
            </span>
            <input type="text" id="price" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000.00" required />
          </div>
        </div>

        <div>
          <label class="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or JPEG.</p>
        </div></div>

      <button type="button" onClick={buttonClick} class="text-black font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 nextButton" style={{ backgroundColor: "rgb(243, 206, 18)", fontWeight: "600" }}>Add Product</button>
    </div>
  )
}
