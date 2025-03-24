// API URL for currency conversion (you can replace this with an actual API)
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';  // Example API URL

// Fetch and populate currency dropdowns
async function fetchCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        // Populate the dropdowns
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

// Convert the currency based on selected options and input amount
async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (amount <= 0) return;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the converted amount
        document.getElementById('converted-amount').textContent = `${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

// Load currencies when the page is ready
fetchCurrencies();
