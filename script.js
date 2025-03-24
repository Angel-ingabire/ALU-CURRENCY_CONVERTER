// API URL for currency conversion (you can replace this with an actual API)
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';  // Example API URL

// Fetch and populate currency dropdowns
async function fetchCurrencies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch currencies. Please try again later.");
        }

        const data = await response.json();
        const currencies = Object.keys(data.rates);

        // Populate the dropdowns
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');
        const currencyList = document.getElementById('currency-list');  // Assuming a <ul> or <ol> with id "currency-list"

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);

            // Add currency to a list for filtering and sorting
            const listItem = document.createElement('li');
            listItem.textContent = currency;
            currencyList.appendChild(listItem);
        });

        // Enable sorting and searching
        enableSorting(currencies);
        enableSearch(currencies);

    } catch (error) {
        console.error('Error fetching currencies:', error);
        alert(error.message);
    }
}

// Convert the currency based on selected options and input amount
async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid amount greater than 0.");
        return;
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch conversion data. Please try again later.");
        }

        const data = await response.json();
        if (!data.rates[toCurrency] || !data.rates[fromCurrency]) {
            throw new Error("Invalid currency selection.");
        }

        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the converted amount
        document.getElementById('converted-amount').textContent = `${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert(error.message);
    }
}

// Enable sorting of currency list
function enableSorting(currencies) {
    const sortButton = document.getElementById('sort-button');  // Assuming there's a button to trigger sorting
    sortButton.addEventListener('click', () => {
        const sortedCurrencies = [...currencies].sort();
        const currencyList = document.getElementById('currency-list');
        currencyList.innerHTML = '';  // Clear existing list

        sortedCurrencies.forEach(currency => {
            const listItem = document.createElement('li');
            listItem.textContent = currency;
            currencyList.appendChild(listItem);
        });
    });
}

// Enable search functionality for currencies
function enableSearch(currencies) {
    const searchInput = document.getElementById('currency-search');  // Assuming there's an input for search
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCurrencies = currencies.filter(currency => currency.toLowerCase().includes(searchTerm));
        const currencyList = document.getElementById('currency-list');
        currencyList.innerHTML = '';  // Clear existing list

        filteredCurrencies.forEach(currency => {
            const listItem = document.createElement('li');
            listItem.textContent = currency;
            currencyList.appendChild(listItem);
        });
    });
}

// Load currencies when the page is ready
fetchCurrencies();
