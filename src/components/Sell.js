import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Sell.css';

export default function Sell(props) {
    const navigate = useNavigate();

    const handleChange = (e) => {
        props.setCategory(e.target.value);
    }

    const handleChange1 = (e) => {
        props.setSubCategory(e.target.value);
    }

    const buttonClick = (e) => {
        let ele = document.getElementById("name");
        let id = document.getElementById("id");
        props.setID(id.value);
        props.setName(ele.value);
        if (props.category !== "Select a Category" && props.subcategory !== "Select a Sub-Category" && ele.value) {
            if (props.category === "CT")
                navigate('/sellCloth');
            else
                navigate('/sellAppliance')
        }
    }

    return (
        <div className="px-72 mt-6">
            <h1 style={{ fontSize: "x-large", fontWeight: "600" }}>Add Product</h1>
            <p style={{ fontSize: "0.7rem" }}>Adding a product helps consumers to select a suitable product from among varying options and a suitable and eco-friendly product would help sellers to gain trust of consumers, thus increase own profit.<a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">See if your product exists already on Amazon</a></p>
            <div className='flex mb-1 text-sm pt-5' style={{ justifyContent: "space-between" }}><label for="products" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain</label>
                <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">What is a Product Type?</a>
            </div>
            <select id="products" value={props.category} onChange={(e) => handleChange(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select a Category</option>
                <option value="CT">Clothing</option>
                <option value="AP">Appliances</option>
            </select>

            <div className='flex mb-1 text-sm pt-5' style={{ justifyContent: "space-between" }}><label for="subproducts" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub-Domain</label>
                {/* <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">What is a Product Type?</a> */}
            </div>
            <select id="subproducts" disabled={props.category !== "Select a Category" ? false : true} value={props.subcategory} onChange={(e) => handleChange1(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto" required>
                <option selected>Select a Sub-Category</option>
                {props.category === "CT" ?
                    <>
                        <option value="Jeans">Jeans</option>
                        <option value="Skirt">Skirt</option>
                        <option value="Trouser">Trouser</option>
                        <option value="Dress">Dress</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Sweater">Sweater</option>
                        <option value="Shorts">Shorts</option>
                        <option value="T-Shirt">T-Shirt</option></> :
                    <><option value="TV">TV</option>
                        <option value="Dishwasher">Dishwasher</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Incandescent Bulb">Incandescent Bulb</option>
                        <option value="Microwave">Microwave</option>
                        <option value="Refrigerator">Refrigerator</option>
                        <option value="Chainsaw">Chainsaw</option>
                        <option value="Washer">Washer</option></>
                }
            </select>

            <div class="grid gap-6 mb-5 mt-6 md:grid-cols-2">
                <div>
                    <div className='flex text-sm' style={{ justifyContent: "space-between" }}>
                        <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
                        <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">ID?</a>
                    </div>
                    <input type="text" id="id" placeholder='Enter Product ID' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" id="name" placeholder='Enter Product Name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
            <button type="button" onClick={buttonClick} class="text-black font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 nextButton" style={{ backgroundColor: "rgb(243, 206, 18)", fontWeight: "600" }}>Next</button>
        </div>
    )
}
