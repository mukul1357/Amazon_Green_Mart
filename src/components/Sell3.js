import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Sell.css';

export default function Sell3(props) {
    const [energy1, setEnergy1] = useState("No Certification");
    const [energy2, setEnergy2] = useState("No Certification");
    const [consumption, setConsumption] = useState(0.0);
    const [star, setStar] = useState(1.0);
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     setEnergy1(e.target.value);
    // }

    // const handleChange1 = (e) => {
    //     setEnergy2(e.target.value);
    // }

    const buttonClick = (e) => {
        const cons = parseFloat(document.getElementById('consumption').value);
        const star = parseFloat(document.getElementById('star').value);
        const cert1 = document.getElementById('cert1').value;
        const cert2 = document.getElementById('cert2').value;
        

        //Label Encoding...
        const label_encode = { "tv": [3595, 4189], "dishwasher": [1, 484], "laptop": [485, 1074], "incandescent bulb": [3088, 3593], "microwave": [5797], "refrigerator": [8027, 8537], "washer": [4190, 5391], "chainsaw": [1075, 1480] };

        var subcat = (props.subcategory).toLowerCase();
        var array = label_encode[subcat];

        const id = Math.floor(Math.random() * (array[1] - array[0]) + array[0]);

        //Send Data to Backend....

        //Image...
        var selectedFile;
        try {
            var fileInput = document.getElementById('file_input');
            selectedFile = (((fileInput.files[0]).name).split("."))[0]
            props.setImage(selectedFile.toLowerCase());
        } catch {
            selectedFile = null;
            props.setImage("tv");
        }

        //Price....
        props.setPrice(parseFloat(document.getElementById('price').value));
        
        // if (price === "" || price === null)
        //     props.setPrice(0);
        // else {
        //     props.setPrice(parseFloat(price));
        // }

        props.setProdAdded(true);
        navigate('/', {replace: true});

    }

    return (
        <div className="px-72 mt-6">
            <h1 style={{ fontSize: "x-large", fontWeight: "600" }}>Add Product</h1>
            <p style={{ fontSize: "0.7rem" }}>Adding a product helps consumers to select a suitable product from among varying options and a suitable and eco-friendly product would help sellers to gain trust of consumers, thus increase own profit.<a href="#" class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">See if your product exists already on Amazon</a></p>

            <div className='flex mb-1 text-sm pt-5' style={{ justifyContent: "space-between" }}><label for="cert1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Energy Certificate I</label>
                <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Check Significance</a>
            </div>
            <select id="cert1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option selected>Select a Certificate</option>
                <option value="Cradle to Cradle Certified">Cradle to Cradle Certified</option>
                <option value="ENERGY STAR Certified">ENERGY STAR Certified</option>
                <option value="RoHS Certification">RoHS Certification</option>
                <option value="Ecologo Certified">Ecologo Certified</option>
                <option value="Green Seal Certified">Green Seal Certified</option>
                <option value="EPEAT Certified">EPEAT Certified</option>
                <option value="No Certification">No Certification</option>
            </select>

            <div className='flex mb-1 text-sm pt-5' style={{ justifyContent: "space-between" }}><label for="cert2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Energy Certificate II</label>
                <a href="#" class="block mb-1 text-sm font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Why 1 more?</a>
            </div>
            <select id="cert2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option selected>Select a Certificate</option>
                <option value="Cradle to Cradle Certified">Cradle to Cradle Certified</option>
                <option value="ENERGY STAR Certified">ENERGY STAR Certified</option>
                <option value="RoHS Certification">RoHS Certification</option>
                <option value="Ecologo Certified">Ecologo Certified</option>
                <option value="Green Seal Certified">Green Seal Certified</option>
                <option value="EPEAT Certified">EPEAT Certified</option>
                <option value="No Certification">No Certification</option>
            </select>

            <div class="grid gap-6 mb-5 md:grid-cols-2">
                <div>
                    <label for="consumption" class="block mb-2 pt-5 text-sm font-medium text-gray-900 dark:text-white">Energy Consumption</label>
                    <input type="text" id="consumption" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="In KWh..." required />
                </div>
                <div>
                    <label for="star" class="block mb-2 pt-5 text-sm font-medium text-gray-900 dark:text-white">Energy Star</label>
                    <input type="text" id="star" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Star Rating" required />
                </div>
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
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required/>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or JPEG.</p>
                </div></div>

            <button type="button" onClick={buttonClick} class="text-black font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 nextButton" style={{ backgroundColor: "rgb(243, 206, 18)", fontWeight: "600" }}>Add Product</button>
        </div>
    )
}
