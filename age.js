let timeInterval;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ageCalculator');
    const resultDiv = document.getElementById('result');
    
    // Set max date as today
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    document.getElementById('birthDate').max = maxDate;
    document.getElementById('calcDate').max = maxDate;

    // Add live update toggle functionality
    const liveUpdateToggle = document.createElement('input');
    liveUpdateToggle.type = 'checkbox';
    liveUpdateToggle.id = 'liveUpdate';
    const liveUpdateLabel = document.createElement('label');
    liveUpdateLabel.htmlFor = 'liveUpdate';
    liveUpdateLabel.textContent = ' Enable live updates';
    form.appendChild(liveUpdateToggle);
    form.appendChild(liveUpdateLabel);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const birthDate = new Date(document.getElementById('birthDate').value);
        let calcDate = document.getElementById('calcDate').value 
            ? new Date(document.getElementById('calcDate').value)
            : new Date(); // Use current date if no date selected
        
        if (birthDate > calcDate) {
            alert('Birth date cannot be in the future!');
            return;
        }

        const age = calculateAge(birthDate, calcDate);
        const totalDays = Math.floor((calcDate - birthDate) / (1000 * 60 * 60 * 24));
        const nextBirthday = calculateNextBirthday(birthDate);
        const zodiacSign = getZodiacSign(birthDate);
        const dayOfBirth = getDayOfBirth(birthDate);
        
        displayResult(age, totalDays, nextBirthday, zodiacSign, dayOfBirth, birthDate);

        // Start live updates if enabled
        if (document.getElementById('liveUpdate').checked) {
            updateLiveCounter(birthDate);
        } else if (timeInterval) {
            clearInterval(timeInterval);
        }
    });

    // Handle live update toggle changes
    liveUpdateToggle.addEventListener('change', function() {
        const birthDateInput = document.getElementById('birthDate');
        if (this.checked && birthDateInput.value) {
            updateLiveCounter(new Date(birthDateInput.value));
        } else if (timeInterval) {
            clearInterval(timeInterval);
        }
    });

    function calculateAge(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get last day of previous month
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    function calculateNextBirthday(birthDate) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        
        if (nextBirthday < today) {
            nextBirthday.setFullYear(currentYear + 1);
        }
        
        const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        return daysUntil;
    }

    function getZodiacSign(birthDate) {
        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
        return "Pisces";
    }

    function getDayOfBirth(birthDate) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[birthDate.getDay()];
    }

    function updateLiveCounter(birthDate) {
        // Clear existing interval if any
        if (timeInterval) {
            clearInterval(timeInterval);
        }

        timeInterval = setInterval(() => {
            const now = new Date();
            const age = calculateAge(birthDate, now);
            const totalDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
            const nextBirthday = calculateNextBirthday(birthDate);
            const zodiacSign = getZodiacSign(birthDate);
            const dayOfBirth = getDayOfBirth(birthDate);
            
            displayResult(age, totalDays, nextBirthday, zodiacSign, dayOfBirth, birthDate);
        }, 1000); // Update every second
    }

    function displayResult(age, totalDays, nextBirthday, zodiacSign, dayOfBirth, birthDate) {
        // Clear any existing interval
        if (timeInterval) {
            clearInterval(timeInterval);
        }

        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        document.getElementById('totalDays').textContent = totalDays.toLocaleString();
        document.getElementById('nextBirthday').textContent = nextBirthday;
        document.getElementById('zodiacSign').textContent = zodiacSign;
        document.getElementById('dayOfBirth').textContent = dayOfBirth;
        
        // Start live counter
        updateLiveCounter(birthDate);
        timeInterval = setInterval(() => updateLiveCounter(birthDate), 1000);
        
        resultDiv.style.display = 'block';

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});