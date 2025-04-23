document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('unitConverter');
    const resultDiv = document.getElementById('result');
    const conversionType = document.getElementById('conversionType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const swapButton = document.getElementById('swapUnits');

    // Conversion units by type
    const units = {
        length: ['cm', 'inch', 'km', 'mile'],
        weight: ['kg', 'lb'],
        temperature: ['celsius', 'fahrenheit'],
        time: ['minute', 'hour', 'day']
    };

    // Update available units when conversion type changes
    conversionType.addEventListener('change', () => {
        const selectedType = conversionType.value;
        updateUnitSelects(selectedType);
        clearResult();
    });

    // Swap units when swap button is clicked
    swapButton.addEventListener('click', () => {
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        if (document.getElementById('fromValue').value) {
            form.dispatchEvent(new Event('submit'));
        }
    });

    function updateUnitSelects(type) {
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        units[type].forEach(unit => {
            fromUnit.appendChild(new Option(formatUnitLabel(unit), unit));
            toUnit.appendChild(new Option(formatUnitLabel(unit), unit));
        });

        // Set default 'to' unit to second option
        if (toUnit.options.length > 1) {
            toUnit.selectedIndex = 1;
        }
    }

    function formatUnitLabel(unit) {
        switch(unit) {
            case 'celsius': return '°C';
            case 'fahrenheit': return '°F';
            case 'km': return 'Kilometers';
            case 'mile': return 'Miles';
            case 'cm': return 'Centimeters';
            case 'inch': return 'Inches';
            case 'kg': return 'Kilograms';
            case 'lb': return 'Pounds';
            case 'minute': return 'Minutes';
            case 'hour': return 'Hours';
            case 'day': return 'Days';
            default: return unit;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const value = parseFloat(document.getElementById('fromValue').value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (from === to) {
            displayResult(value, value, from, to);
            return;
        }

        const result = convert(value, from, to);
        displayResult(value, result, from, to);
    });

    function convert(value, from, to) {
        // Convert to base unit first, then to target unit
        const type = conversionType.value;
        
        switch(type) {
            case 'length':
                return convertLength(value, from, to);
            case 'weight':
                return convertWeight(value, from, to);
            case 'temperature':
                return convertTemperature(value, from, to);
            case 'time':
                return convertTime(value, from, to);
        }
    }

    function convertLength(value, from, to) {
        // Convert everything to cm first
        let inCm;
        switch(from) {
            case 'cm': inCm = value; break;
            case 'inch': inCm = value * 2.54; break;
            case 'km': inCm = value * 100000; break;
            case 'mile': inCm = value * 160934; break;
        }

        // Convert cm to target unit
        switch(to) {
            case 'cm': return inCm;
            case 'inch': return inCm / 2.54;
            case 'km': return inCm / 100000;
            case 'mile': return inCm / 160934;
        }
    }

    function convertWeight(value, from, to) {
        if (from === 'kg' && to === 'lb') return value * 2.20462;
        if (from === 'lb' && to === 'kg') return value / 2.20462;
        return value;
    }

    function convertTemperature(value, from, to) {
        if (from === 'celsius' && to === 'fahrenheit') return (value * 9/5) + 32;
        if (from === 'fahrenheit' && to === 'celsius') return (value - 32) * 5/9;
        return value;
    }

    function convertTime(value, from, to) {
        // Convert to minutes first
        let inMinutes;
        switch(from) {
            case 'minute': inMinutes = value; break;
            case 'hour': inMinutes = value * 60; break;
            case 'day': inMinutes = value * 1440; break;
        }

        // Convert minutes to target unit
        switch(to) {
            case 'minute': return inMinutes;
            case 'hour': return inMinutes / 60;
            case 'day': return inMinutes / 1440;
        }
    }

    function displayResult(fromValue, toValue, fromUnit, toUnit) {
        const resultText = document.getElementById('resultText');
        const formulaText = document.getElementById('formulaText');
        
        resultText.textContent = `${fromValue} ${formatUnitLabel(fromUnit)} = ${toValue.toFixed(2)} ${formatUnitLabel(toUnit)}`;
        
        // Show conversion formula for temperature
        if (conversionType.value === 'temperature') {
            let formula = '';
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                formula = '°F = (°C × 9/5) + 32';
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                formula = '°C = (°F - 32) × 5/9';
            }
            formulaText.textContent = `Formula: ${formula}`;
        } else {
            formulaText.textContent = '';
        }
        
        resultDiv.style.display = 'block';

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

    function clearResult() {
        document.getElementById('fromValue').value = '';
        document.getElementById('toValue').value = '';
        resultDiv.style.display = 'none';
    }

    // Initialize unit selects with length units
    updateUnitSelects('length');
});