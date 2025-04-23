document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dateDiffCalculator');
    const resultDiv = document.getElementById('result');
    
    // Set max date as today
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        
        if (startDate > endDate) {
            alert('Start date must be before end date!');
            return;
        }

        const difference = calculateDateDifference(startDate, endDate);
        const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        displayResult(difference, totalDays);
    });

    function calculateDateDifference(startDate, endDate) {
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get last day of previous month
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    function displayResult(difference, totalDays) {
        document.getElementById('years').textContent = difference.years;
        document.getElementById('months').textContent = difference.months;
        document.getElementById('days').textContent = difference.days;
        document.getElementById('totalDays').textContent = totalDays;
        resultDiv.style.display = 'block';

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});