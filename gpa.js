document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gpaCalculator');
    const resultDiv = document.getElementById('result');
    const coursesContainer = document.getElementById('coursesContainer');
    const addCourseBtn = document.getElementById('addCourse');
    const gradeSystemSelect = document.getElementById('gradeSystem');
    let courseCount = 0;

    // Grade point values for different systems
    const gradePoints = {
        '4.0': {
            'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0
        },
        '4.3': {
            'A+': 4.3, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        }
    };

    // Initialize with first course
    addCourse();

    // Add course entry when button is clicked
    addCourseBtn.addEventListener('click', addCourse);

    // Update grade input options when grade system changes
    gradeSystemSelect.addEventListener('change', () => {
        updateAllGradeInputs();
        updateScaleReference();
    });

    function addCourse() {
        courseCount++;
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-entry');
        courseDiv.innerHTML = `
            <div class="form-group">
                <label for="course${courseCount}">Course ${courseCount}:</label>
                <input type="text" id="course${courseCount}" placeholder="Course name (optional)">
            </div>
            <div class="form-group">
                <label for="grade${courseCount}">Grade:</label>
                ${createGradeInput(courseCount)}
            </div>
            <div class="form-group">
                <label for="credits${courseCount}">Credits:</label>
                <input type="number" id="credits${courseCount}" required min="0.5" step="0.5" value="3">
            </div>
            ${courseCount > 1 ? '<button type="button" class="remove-course">Remove</button>' : ''}
        `;

        coursesContainer.appendChild(courseDiv);

        // Add remove button functionality
        const removeBtn = courseDiv.querySelector('.remove-course');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                courseDiv.remove();
            });
        }
    }

    function createGradeInput(courseNum) {
        const system = gradeSystemSelect.value;
        if (system === '100') {
            return `<input type="number" id="grade${courseNum}" required min="0" max="100" step="0.1">`;
        } else {
            const grades = Object.keys(gradePoints[system]);
            return `<select id="grade${courseNum}" required>
                ${grades.map(grade => `<option value="${grade}">${grade}</option>`).join('')}
            </select>`;
        }
    }

    function updateAllGradeInputs() {
        const courseEntries = coursesContainer.getElementsByClassName('course-entry');
        Array.from(courseEntries).forEach((entry, index) => {
            const gradeGroup = entry.querySelector(`[id^="grade"]`).parentNode;
            const currentValue = entry.querySelector(`[id^="grade"]`).value;
            gradeGroup.innerHTML = `<label for="grade${index + 1}">Grade:</label>${createGradeInput(index + 1)}`;
            const newInput = entry.querySelector(`[id^="grade"]`);
            if (newInput.tagName === 'SELECT' && gradePoints[gradeSystemSelect.value][currentValue]) {
                newInput.value = currentValue;
            }
        });
    }

    function updateScaleReference() {
        const scaleRef = document.getElementById('scaleReference');
        const system = gradeSystemSelect.value;
        
        if (system === '100') {
            scaleRef.innerHTML = `
                <div class="scale-item"><span>A</span><small>90-100</small></div>
                <div class="scale-item"><span>B</span><small>80-89</small></div>
                <div class="scale-item"><span>C</span><small>70-79</small></div>
                <div class="scale-item"><span>D</span><small>60-69</small></div>
                <div class="scale-item"><span>F</span><small>0-59</small></div>
            `;
        } else {
            scaleRef.innerHTML = Object.entries(gradePoints[system])
                .map(([grade, points]) => `
                    <div class="scale-item">
                        <span>${grade}</span>
                        <small>${points.toFixed(1)}</small>
                    </div>
                `).join('');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let totalPoints = 0;
        let totalCredits = 0;
        const system = gradeSystemSelect.value;

        const courseEntries = coursesContainer.getElementsByClassName('course-entry');
        Array.from(courseEntries).forEach(entry => {
            const gradeInput = entry.querySelector('[id^="grade"]');
            const creditsInput = entry.querySelector('[id^="credits"]');
            const credits = parseFloat(creditsInput.value);
            
            let points;
            if (system === '100') {
                const percentage = parseFloat(gradeInput.value);
                // Convert percentage to 4.0 scale
                if (percentage >= 90) points = 4.0;
                else if (percentage >= 80) points = 3.0;
                else if (percentage >= 70) points = 2.0;
                else if (percentage >= 60) points = 1.0;
                else points = 0.0;
            } else {
                points = gradePoints[system][gradeInput.value];
            }

            totalPoints += points * credits;
            totalCredits += credits;
        });

        const gpa = totalPoints / totalCredits;
        
        document.getElementById('gpaValue').textContent = gpa.toFixed(2);
        document.getElementById('totalCredits').textContent = totalCredits.toFixed(1);
        
        updateScaleReference();
        resultDiv.style.display = 'block';

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    });
});