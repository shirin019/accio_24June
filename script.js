// Fetch data from the CoinGecko API
let responseFromApi = []
let filteredData = []
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
        responseFromApi = data
        filteredData = data
        displayData(filteredData)
    })
.catch(error => console.error('Error:', error));

// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//         responseFromApi = data
//         filteredData = data
//         displayData(filteredData)
//     })
// .catch(error => console.error('Error:', error));


function displayData(arr){
    const tableBody = document.querySelector('#crypto-table tbody');
    tableBody.innerHTML = ""
    // const newTable = document.createElement('table')
    arr.forEach(item => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.style.cssText = 'display:flex;'
            // nameCell.textContent = item.name;
            // const imageCell = document.createElement('td');
            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.name;
            // imageCell.appendChild(image);
            const imageDiv = document.createElement('div')
            imageDiv.appendChild(image)
            const nameDiv = document.createElement('div')
            nameDiv.textContent = item.name
            nameDiv.style.cssText = 'margin-left:15px;'
            nameCell.append(imageDiv)
            nameCell.append(nameDiv)
            const symbolCell = document.createElement('td');
            symbolCell.textContent = item.symbol.toUpperCase();
            const priceCell = document.createElement('td');
            priceCell.textContent = item.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const price_change_percentage_24hCell = document.createElement('td');
            price_change_percentage_24hCell.textContent = `${item.price_change_percentage_24h.toFixed(2)}%`;
            const volumeCell = document.createElement('td');
            volumeCell.textContent = `Mkt Cap : ${item.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;


            // row.appendChild(imageCell);
            row.appendChild(nameCell);
            row.appendChild(symbolCell);
            row.appendChild(priceCell);
            row.appendChild(price_change_percentage_24hCell);
            row.appendChild(volumeCell);
            
            tableBody.appendChild(row);
        });

}

function filterResponse(event){
    const searchKeyword = event.target.value
    console.log(searchKeyword)
    const filtereResponseData = responseFromApi.filter(ele=> (ele.name.toLowerCase().includes(searchKeyword.toLowerCase()) || ele.symbol.toLowerCase().includes(searchKeyword.toLowerCase())));
    filteredData = filtereResponseData
    console.log(filteredData)
    displayData(filteredData)
}

function filterMidCapResponse(event){
   responseFromApi.sort((a,b)=> (a.market_cap > b.market_cap)? 1: -1);
   displayData(responseFromApi);
}

function filterPercentResponse(event){
    responseFromApi.sort((a,b)=> (a.price_change_percentage_24h > b.price_change_percentage_24h)? 1: -1);
    displayData(responseFromApi);
}

 document.getElementById('search-input').addEventListener('change',filterResponse);

 document.getElementById('mkt-cap').addEventListener('click',filterMidCapResponse);

 document.getElementById('percentage').addEventListener('click',filterPercentResponse);
