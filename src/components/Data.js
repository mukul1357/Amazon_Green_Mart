import React from "react";

export default function Data(props) {
    const handleSubmit = () => {
        var d1 = document.getElementById("d1").value;
        var d2 = document.getElementById("d2").value;
        var d3 = document.getElementById("d3").value;
        var d4 = document.getElementById("d4").value;
        var d5 = document.getElementById("d5").value;
        var d6 = document.getElementById("d6").value;
        var d7 = document.getElementById("d7").value;
        var d8 = document.getElementById("d8").value;
        var d9 = document.getElementById("d9").value;
        var d10 = document.getElementById("d10").value;
        var data = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10];
        console.log(data);
        // fetch('http://localhost:5000/predict', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         data: data
        //     })
        // }).then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     alert("Prediction: " + data.prediction);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        let ele = document.getElementById("mainContainer");
        ele.style.filter = "";
        props.setInput(false);
    }

  return (
    <div class="absolute z-10 max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mt-10" style={{marginLeft: "27.5rem", marginRight: "27.5rem", paddingLeft: "6.5rem"}}>
      <div class="flex justify-between items-start">
        <form>
          <div class="grid gap-8 mb-6 md:grid-cols-2">
            <div>
              <label
                for="d1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 1
              </label>
              <input
                type="text"
                id="d1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="d2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 2
              </label>
              <input
                type="text"
                id="d2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 3
              </label>
              <input
                type="text"
                id="d3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d4"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 4
              </label>
              <input
                type="text"
                id="d4"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d5"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 5
              </label>
              <input
                type="text"
                id="d5"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d6"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 6
              </label>
              <input
                type="text"
                id="d6"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d7"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 7
              </label>
              <input
                type="text"
                id="d7"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d8"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 8
              </label>
              <input
                type="text"
                id="d8"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d9"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 9
              </label>
              <input
                type="text"
                id="d9"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
            <div>
              <label
                for="d10"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Day 10
              </label>
              <input
                type="text"
                id="d10"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
              />
            </div>
          </div>
          <button style={{marginLeft: "9rem"}} onClick={handleSubmit} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit</button>
        </form>
      </div>
    </div>
  );
}
