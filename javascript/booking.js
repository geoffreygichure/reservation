// Parse query parameters
const urlParams = new URLSearchParams(window.location.search);
const destination = urlParams.get('destination');
const origin = urlParams.get('origin');
const price = urlParams.get('cost');

// Update HTML with the extracted data and save to localStorage
let destin = document.getElementById('destination').textContent = destination;
let origination = document.getElementById('origin').textContent = origin;
const totalMoney = document.getElementById('total-cost');
console.log(destination, origin, price);

const money = parseFloat(price);
totalMoney.innerText = '0000';

// Save data to localStorage
const travelInfo = {
    destination: destination || '',
    origin: origin || '',
    price: money || 0
};
localStorage.setItem('travelInfo', JSON.stringify(travelInfo));

// Load previously stored data (if available)
const savedData = JSON.parse(localStorage.getItem('travelInfo'));
if (savedData) {
    document.getElementById('destination').textContent = savedData.destination;
    document.getElementById('origin').textContent = savedData.origin;
    document.getElementById('total-cost').textContent = savedData.price || '0000';
}

// Radio button elements
const oneway = document.getElementById('oneway');
const bothways = document.getElementById('to-back');

// Event listener for "One Way" option
oneway.addEventListener('change', () => {
    if (oneway.checked) {
        totalMoney.textContent = money;
        console.log('One way is checked');

        // Update localStorage
        const updatedInfo = { ...savedData, price: money };
        localStorage.setItem('travelInfo', JSON.stringify(updatedInfo));
    }
});

// Event listener for "Both Ways" option
bothways.addEventListener('change', () => {
    if (bothways.checked) {
        const calculation = (money * 180) / 100;
        totalMoney.textContent = calculation.toFixed(3);
        console.log('Both ways is checked');

        // Update localStorage
        const updatedInfo = { ...savedData, price: calculation.toFixed(3) };
        localStorage.setItem('travelInfo', JSON.stringify(updatedInfo));
    }
});

// Cancel button functionality
const cancell = document.getElementById('booking-button');
console.log(cancell);
cancell.addEventListener('click', event => {
    const userConfirmed = confirm("Are you sure you want to cancel your booking?");
    if (userConfirmed) {
        console.log("Booking canceled.");

        // Clear localStorage and reset UI
        localStorage.removeItem('travelInfo');
        document.getElementById('destination').textContent = '';
        document.getElementById('origin').textContent = '';
        document.getElementById('total-cost').textContent = '0000';
        alert("You have successfully canceled your travel.");

        // Update button style
        cancell.innerText = 'Travel Canceled';
        cancell.style.background = "red";
        cancell.style.color = "white";
        localStorage.removeItem("destination");
        localStorage.removeItem("origin");
        localStorage.removeItem("price");

    } else {
        console.log("Cancellation aborted.");
        alert("Cancellation has been aborted.");
    }
});
