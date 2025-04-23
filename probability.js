// Probability Calculator

// Simple Probability Calculation
function calculateProbability() {
    const favorable = parseInt(document.getElementById('favorable').value);
    const total = parseInt(document.getElementById('total').value);

    if (isNaN(favorable) || isNaN(total) || total <= 0 || favorable < 0 || favorable > total) {
        document.getElementById('probability-result').textContent = 'Invalid input';
        return;
    }

    const probability = (favorable / total).toFixed(4);
    document.getElementById('probability-result').textContent = `Probability: ${probability}`;
}

// Combination Calculation (nCr)
function calculateCombination() {
    const n = parseInt(document.getElementById('n').value);
    const r = parseInt(document.getElementById('r').value);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
        document.getElementById('combination-result').textContent = 'Invalid input';
        return;
    }

    const combination = factorial(n) / (factorial(r) * factorial(n - r));
    document.getElementById('combination-result').textContent = `Combination: ${combination}`;
}

// Permutation Calculation (nPr)
function calculatePermutation() {
    const n = parseInt(document.getElementById('n-perm').value);
    const r = parseInt(document.getElementById('r-perm').value);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
        document.getElementById('permutation-result').textContent = 'Invalid input';
        return;
    }

    const permutation = factorial(n) / factorial(n - r);
    document.getElementById('permutation-result').textContent = `Permutation: ${permutation}`;
}

// Factorial Helper Function
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}