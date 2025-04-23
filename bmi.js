document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bmiCalculator');
    const resultDiv = document.getElementById('result');
    const heightUnit = document.getElementById('heightUnit');
    const weightUnit = document.getElementById('weightUnit');
    const unitInputs = document.getElementsByName('unit');

    // Update units when unit system changes
    unitInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const isMetric = e.target.value === 'metric';
            heightUnit.textContent = isMetric ? 'cm' : 'in';
            weightUnit.textContent = isMetric ? 'kg' : 'lb';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const isMetric = document.querySelector('input[name="unit"]:checked').value === 'metric';

        const bmi = calculateBMI(weight, height, isMetric);
        const category = getBMICategory(bmi);
        
        displayResult(bmi, category);
    });

    function calculateBMI(weight, height, isMetric) {
        if (isMetric) {
            // Convert cm to meters for calculation
            const heightInMeters = height / 100;
            return weight / (heightInMeters * heightInMeters);
        } else {
            // Imperial formula: (weight in pounds × 703) / (height in inches)²
            return (weight * 703) / (height * height);
        }
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return { name: 'Underweight', color: '#3b82f6' };
        if (bmi < 25) return { name: 'Normal', color: '#22c55e' };
        if (bmi < 30) return { name: 'Overweight', color: '#f59e0b' };
        return { name: 'Obese', color: '#ef4444' };
    }

    function displayResult(bmi, category) {
        document.getElementById('bmiValue').textContent = bmi.toFixed(1);
        const categoryDiv = document.getElementById('bmiCategory');
        categoryDiv.textContent = category.name;
        categoryDiv.style.backgroundColor = category.color;
        resultDiv.style.display = 'block';

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});