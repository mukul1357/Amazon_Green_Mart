import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Sell.css';

export default function Sell3(props) {
    // const [energy1, setEnergy1] = useState("No Certification");
    // const [energy2, setEnergy2] = useState("No Certification");
    // const [consumption, setConsumption] = useState(0.0);
    // const [star, setStar] = useState(1.0);
    const navigate = useNavigate();
    const box = React.createRef();

    // const handleChange = (e) => {
    //     setEnergy1(e.target.value);
    // }

    // const handleChange1 = (e) => {
    //     setEnergy2(e.target.value);
    // }

    const onMouseEnter = (e) => {
        let ele = document.getElementById("gs-info");
        // ele.className = "absolute z-10 visible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
      };
    
      const onMouseLeave = (e) => {
        var ele = document.getElementById("gs-info");
        // let ele1 = document.getElementById("box");
        var eleBounds = box.current.getBoundingClientRect();
        // console.log(e.clientX, eleBounds.left-20, eleBounds.right);
        if (e.clientX >= eleBounds.left - 20 && e.clientX <= eleBounds.right) {
            ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
            //   ele.className = "visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        } else {
            ele.className = "absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400";
        //   ele.className = "invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        }
      };

    async function buttonClick() {
        const arr = [];
        arr.push(parseFloat(document.getElementById('consumption').value)+0.00001);
        arr.push(parseFloat(document.getElementById('star').value)+0.00001);
        arr.push(document.getElementById('cert1').value);
        arr.push(document.getElementById('cert2').value);
        

        //Label Encoding...
        const label_encode = { "tv": [3595, 4189], "dishwasher": [1, 484], "laptop": [485, 1074], "incandescent bulb": [3088, 3593], "microwave": [5797], "refrigerator": [8027, 8537], "washer": [4190, 5391], "chainsaw": [1075, 1480] };

        var subcat = (props.subcategory).toLowerCase();
        var array = label_encode[subcat];
        var id;
        if(subcat === "microwave")
            id = array[0];
        else
            id = Math.floor(Math.random() * (array[1] - array[0]) + array[0]);

        const certificate1 = { "Cradle to Cradle Certified": 0.00001, "ENERGY STAR Certified": 1.00001, "EPEAT Certified": 2.00001, "Ecologo Certified": 3.00001, "Green Seal Certified": 5.00001, "RoHS Certification": 7.00001, "No Certification": 6.00001 };
        const certificate2 = { "ENERGY STAR Certified": 2.00001, "Ecologo Certified": 1.00001, "Green Seal Certified": 3.00001, "No Certification": 4.00001, "Ecolabel Certified": 0.00001 };

        //Send Data to Backend....
        const url = `http://127.0.0.1:5000/amazon/prediction2/${id}/${arr[1]}/${arr[0]}/${certificate1[arr[2]]}/${certificate2[arr[3]]}`;
        const response = await fetch(url);
        const data = await response.json();
        props.setPrediction(parseInt(data["Prediction"]));

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

        try {
            const checked = document.getElementById("YesButton_GS").checked;
            if(checked) {
              props.setGreenScheme(true);
              const discount = document.getElementById("discount").value;
              props.setDiscount(parseFloat(discount));
              var price = parseFloat(document.getElementById('price').value)
      if(price >= 1000 && price < 5000)
        props.setSlab(200)
      else if(price >= 5000 && price < 10000)
        props.setSlab(400)
      else if(price >= 10000 && price < 30000)
        props.setSlab(650)
      else if(price >= 30000 && price < 50000)
        props.setSlab(850)
      else if(price >= 50000 && price < 100000)
        props.setSlab(1200)
      else if(price >= 100000)
        props.setSlab(1600)
    
              const gs = JSON.parse(localStorage.getItem("greenScheme"));
              if(gs === null) {
                var array1 = [];
                var add = {
                  seller_id: props.seller_id,
                  seller_name: props.seller_name,
                  amount: 0,
                  vgp: 0
                }
                array1.push(add);
                localStorage.setItem("greenScheme", JSON.stringify(arr));
              }
              else {
                var array2 = [], add1;
                var flag = false;
                for(let i=0;i<gs.length;i++) {
                  if(gs[i].seller_id != props.seller_id)
                    array2.push(gs[i]);
                  else {
                    flag = true;
                    // add1 = gs[i];
                  }
                }
                
                if(!flag) {
                  add1 = {
                    seller_id: props.seller_id,
                    seller_name: props.seller_name,
                    amount: 0,
                    vgp: 0                 
                  }
                  array2.push(add1);
                }
                
                localStorage.setItem("greenScheme", JSON.stringify(array2));
              }
            }
            else {
              props.setGreenScheme(false);
            }
          }catch {
            ;
          }

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
                <option value="ENERGY STAR Certified">ENERGY STAR Certified</option>
                {/* <option value="RoHS Certification">RoHS Certification</option> */}
                <option value="Ecologo Certified">Ecologo Certified</option>
                <option value="Green Seal Certified">Green Seal Certified</option>
                <option value="Ecolabel Certified">Ecolabel Certified</option>
                {/* <option value="EPEAT Certified">EPEAT Certified</option> */}
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

                <div class="flex mt-3">
      <div class="flex items-center mb-1 mr-8">
        <h4 class="mb-2 mr-2 text-gray-900 dark:text-white" style={{ paddingTop: "0.5rem", fontWeight: "400", fontSize: "0.9rem" }}>Enroll to Green Scheme?</h4>
            {/* <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">Any Day Prediction</h5> */}
            <button data-popover-target="gs-info" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter(e)} onMouseLeave={e => onMouseLeave(e)} className="buttonInfo" style={{marginBottom: "2.5px"}}>
            <svg data-popover-target="gs-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            </button>
            <div data-popover id="gs-info" data-popper-placement="bottom" role="tooltip" class="absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400" style={{position: 'absolute', margin: "0px", transform: "translate(11.70rem, 0rem)", height: "11rem", overflow: "scroll"}}>
                <div class="p-3 space-y-2">
                    <div id="box" ref={box}>
                    <h3 class="font-semibold text-white" style={{marginLeft: "5rem"}}>Green Scheme</h3>
                    <ul>
                      <li className='li_payment'><b>Benefit for Sellers: </b>Our Green Scheme offers sellers significant advantages, including enhanced customer retention and accelerated product delivery using cutting-edge ML forecasting.</li>
                      <li className='li_payment'><b>Incentives to Customers: </b>When customers purchase eco-friendly products from a seller, they earn 80% of green points to spend exclusively with that seller, fostering loyalty. The remaining 20% can be used as a common pool, boosting products from other sellers.</li>
                      <li className='li_payment'><b>Discount Requirements: </b>To join the scheme, sellers commit to providing a minimum 5% discount on their products. This discount is facilitated by the assured customer retention, making it a win-win for both sellers and buyers.</li>
                      <li className='li_payment'><b>Eco-Friendly Badge: </b>Vendors not participating in the scheme can still earn an eco-friendly badge for their products, but they won't receive the same benefits as scheme members.</li>
                      <li className='li_payment'><b>Differential Point Values: </b>The discount derived from vendor green points is typically more attractive, encouraging customers to continue purchasing from the same vendor, ultimately benefiting both sellers and buyers.</li>
                    </ul>
                    </div>
                    {/* <p>You can provide any date in the calendar such that the model predicts the demand for that day's product and the demands of the last 10 days preceding that day.</p></div> */}
                </div>
            </div>
        </div>

        <div class="flex items-center mr-4" style={{position: "relative", bottom: "1.5px"}}>
          <input
            id="YesButton_GS"
            type="radio"
            value=""
            name="inline-radio-group2"
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="YesButton_GS"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Yes
          </label>
        </div>
        <div class="flex items-center mr-4" style={{position: "relative", bottom: "1.5px"}}>
          <input
            id="NoButton_GS"
            type="radio"
            value=""
            name="inline-radio-group2"
            class="w-4 h-4 text-blue-600 bg-gray-200 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="NoButton_GS"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            No
          </label>
        </div>
      </div>

      <div>
          <label for="discount" class="block mb-2 pt-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
          <div class="flex">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
              </svg>
            </span>
            <input type="text" id="discount" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="200.00" required />
          </div>
        </div>

            <button type="button" onClick={buttonClick} class="text-black font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 nextButton" style={{ backgroundColor: "rgb(243, 206, 18)", fontWeight: "600" }}>Add Product</button>
        </div>
    )
}
