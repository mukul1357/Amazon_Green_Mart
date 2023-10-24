import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LineChartComponent from './LineChart'
import Data from './Data';

export default function Inventory() {
    const box = React.createRef();
    const box1 = React.createRef();
    const box2 = React.createRef();
    const cur_date = new Date().toJSON().slice(0,10);
    var current_date = cur_date.split("-").reverse()
    current_date = current_date[1] + "/" + current_date[0] + "/" + current_date[2];
    const [calOpen, setCalOpen] = useState(false);
    const [value, setValue] = useState(current_date);
    const [stdValue, setStdValue] = useState(new Date());
    const label_encode = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 }
    const [input, setInput] = useState(false);

    const dataInputHandle = () => {
        setInput(!input);
        if(!input) {
            let ele = document.getElementById("mainContainer");
            ele.style.filter = "blur(2px)";
        }
        else {
            let ele = document.getElementById("mainContainer");
            ele.style.filter = "";
        }
    }

    const handleChange = (newValue) => {
        // var ele = document.getElementById(":r1:").value;
        const arr = (newValue["$d"]).toString().split(" ");
        setValue(label_encode[arr[1]]+"/"+arr[2]+"/"+arr[3]);
        setStdValue(newValue["$d"]);
        openCalendar();
    }
    
    const openCalendar = () => {
        setCalOpen(!calOpen);
        if(!calOpen) {
            let ele = document.getElementById("dateRangeDropdown");
            ele.className = "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600"
        }
        else {
            let ele = document.getElementById("dateRangeDropdown");
            ele.className = "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600"
        }
    }

    const onMouseEnter = (e) => {
        let ele = document.getElementById("chart-info");
        // ele.className = "absolute z-10 visible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
      };
    
      const onMouseLeave = (e) => {
        var ele = document.getElementById("chart-info");
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

      const onMouseEnter1 = (e) => {
        let ele = document.getElementById("chart-info1");
        // ele.className = "absolute z-10 visible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
      };
    
      const onMouseLeave1 = (e) => {
        var ele = document.getElementById("chart-info1");
        // let ele1 = document.getElementById("box");
        var eleBounds = box1.current.getBoundingClientRect();
        // console.log(e.clientX, eleBounds.left-20, eleBounds.right);
        if (e.clientX >= eleBounds.left - 20 && e.clientX <= eleBounds.right) {
            ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
            //   ele.className = "visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        } else {
            ele.className = "absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400";
        //   ele.className = "invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        }
      };

      const onMouseEnter2 = (e) => {
        let ele = document.getElementById("chart-info2");
        // ele.className = "absolute z-10 visible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
        ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
      };
    
      const onMouseLeave2 = (e) => {
        var ele = document.getElementById("chart-info2");
        // let ele1 = document.getElementById("box");
        var eleBounds = box2.current.getBoundingClientRect();
        // console.log(e.clientX, eleBounds.left-20, eleBounds.right);
        if (e.clientX >= eleBounds.left - 20 && e.clientX <= eleBounds.right) {
            ele.className = "absolute z-10 visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400";
            //   ele.className = "visible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        } else {
            ele.className = "absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400";
        //   ele.className = "invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400 popover"
        }
      };

  return (
    <>
    {input && <Data setInput={setInput}/>}
    <div className='flex flex-col' id='mainContainer'>
        
<div className='flex justify-evenly' style={{height: "35rem"}}>
<div class="max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-10">

  <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">Any Day Prediction</h5>
            <button data-popover-target="chart-info" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter(e)} onMouseLeave={e => onMouseLeave(e)} className="buttonInfo">
            <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            </button>
            <div data-popover id="chart-info" data-popper-placement="bottom" role="tooltip" class="absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400" style={{position: 'absolute', margin: "0px", transform: "translate(12.84rem, 0rem)"}}>
                <div class="p-3 space-y-2">
                    <div id="box" ref={box}>
                    <h3 class="font-semibold text-white">Data-based Demand Projection</h3>
                    <p>You can provide any date in the calendar such that the model predicts the demand for that day's product and the demands of the last 10 days preceding that day.</p></div>
                </div>
            </div>
        </div>
        <button id="dateRangeButton" data-dropdown-toggle="dateRangeDropdown" data-dropdown-ignore-click-outside-class="datepicker" type="button" onClick={openCalendar} class="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline">{value} <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>

        <div id="dateRangeDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600">
          <div class="p-3 w-56" aria-labelledby="dateRangeButton">
            <div date-rangepicker datepicker-autohide class="flex items-center">
<div class="relative max-w-sm ">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker onChange={(newValue) => handleChange(newValue)} />
    </LocalizationProvider>
</div>
</div></div></div>
    </div>

    <div class="flex justify-end items-center">
      <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" type="button"  class="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg class="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg><span class="sr-only">Open dropdown</span>
      </button>
      <div id="widgetDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                </svg>Edit widget
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>Download data
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
                </svg>Add to repository
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                </svg>Delete widget
              </a>
            </li>
          </ul>
    </div>
  </div>
  </div>

  <LineChartComponent />
</div>


<div class="max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-10">

  <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">Next Day Prediction</h5>
            <button data-popover-target="chart-info1" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter1(e)} onMouseLeave={e => onMouseLeave1(e)} className="buttonInfo">
            <svg data-popover-target="chart-info1" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            </button>
            <div data-popover id="chart-info1" data-popper-placement="bottom" role="tooltip" class="absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400" style={{position: 'absolute', margin: "0px", transform: "translate(13.2rem, 0rem)"}}>
                <div class="p-3 space-y-2">
                    <div id="box1" ref={box1}>
                    <h3 class="font-semibold text-white">Anticipate Future Needs</h3>
                    <p>With access to the previous 10 days' worth of data, this feature provides a reliable forecast for the demand for your product on the upcoming day, helping you make informed decisions.</p></div>
                </div>
            </div>
        </div>
        <button id="customerData" type="button" onClick={dataInputHandle} class="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline">Enter Data<svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
    </div>
      
    <div class="flex justify-end items-center">
      <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" type="button"  class="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg class="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg><span class="sr-only">Open dropdown</span>
      </button>
      <div id="widgetDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                </svg>Edit widget
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>Download data
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
                </svg>Add to repository
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                </svg>Delete widget
              </a>
            </li>
          </ul>
    </div>
  </div>
  </div>

  <LineChartComponent />    
</div>



</div>

<div class="max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-10 mb-6" style={{maxWidth: "86%", marginLeft: "6.5rem", marginRight: "6.5rem", height: "36rem"}}>

  <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">Annual Data Analysis</h5>
            <button data-popover-target="chart-info2" data-popover-placement="bottom-end" type="button" onMouseEnter={e => onMouseEnter2(e)} onMouseLeave={e => onMouseLeave2(e)} className="buttonInfo">
            <svg data-popover-target="chart-info2" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            </button>
            <div data-popover id="chart-info2" data-popper-placement="bottom" role="tooltip" class="absolute z-10 invisible inline-block text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 w-72 bg-gray-800 border-gray-600 text-gray-400" style={{position: 'absolute', margin: "0px", transform: "translate(14.15rem, 0rem)"}}>
                <div class="p-3 space-y-2">
                    <div id="box2" ref={box2}>
                    <h3 class="font-semibold text-white">Seasonal Demand Visualization</h3>
                    <p>This feature presents a demand graph depicting product demand fluctuations over the course of a year. Warehouse managers can identify and prepare for seasonal trends by visualising how demand varies across different months.</p></div>
                </div>
            </div>
        </div>
        {/* <button id="dateRangeButton" data-dropdown-toggle="dateRangeDropdown" data-dropdown-ignore-click-outside-class="datepicker" type="button" onClick={openCalendar} class="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline">{value} <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>

        <div id="dateRangeDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600">
          <div class="p-3 w-56" aria-labelledby="dateRangeButton">
            <div date-rangepicker datepicker-autohide class="flex items-center">
<div class="relative max-w-sm ">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker onChange={(newValue) => handleChange(newValue)} />
    </LocalizationProvider>
</div>
</div></div></div> */}
    </div>

    <div class="flex justify-end items-center">
      <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" type="button"  class="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg class="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg><span class="sr-only">Open dropdown</span>
      </button>
      <div id="widgetDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                </svg>Edit widget
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>Download data
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
                </svg>Add to repository
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                </svg>Delete widget
              </a>
            </li>
          </ul>
    </div>
  </div>
  </div>
  <LineChartComponent/>
  </div>
  
</div>
</>

  )
}
