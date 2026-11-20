
function showPage(pageId) {

    const homeSections = [
        document.querySelector(".hero"),
        document.querySelector(".quote-section"),
        document.querySelector(".learn-section"),
        document.querySelector(".about-section"),
        document.querySelector(".references-section")
    ];

    const calculatorPages = [
        "age-page",
        "measurements-page",
        "results-page"
    ];

    // Hide all homepage sections
    homeSections.forEach(section => {
        if (section) {
            section.classList.add("hidden");
        }
    });

    // Hide all calculator pages
    calculatorPages.forEach(id => {
        const page = document.getElementById(id);

        if (page) {
            page.classList.add("hidden");
        }
    });

    // Show the requested page
    if (pageId === "home") {

        homeSections.forEach(section => {
            if (section) {
                section.classList.remove("hidden");
            }
        });

    } else {

        const selectedPage = document.getElementById(pageId);

        if (selectedPage) {
            selectedPage.classList.remove("hidden");
        } else {
            console.error("Page not found:", pageId);
            return;
        }
    }

    window.scrollTo(0, 0);
}


function goToMeasurements() {

    const age = Number(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;

    if (!Number.isInteger(age) || age < 1 || age > 120 || !sex) {
        alert("Please enter a valid age and select your sex.");
        return;
    }

    showPage("measurements-page");
}


function calculateBMI() {

    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);

    const age = Number(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;

    if (!Number.isFinite(height) || height <= 0 ||
        !Number.isFinite(weight) || weight <= 0) {
        alert("Please enter a valid height and weight.");
        return;
    }

    if (!sex) {
        alert("Please select your sex first.");
        showPage("age-page");
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    document.getElementById("bmi-value").textContent = bmi.toFixed(1);

    const category = document.getElementById("bmi-category");
    const message = document.getElementById("bmi-message");

    if (age < 18) {

        category.textContent = "Age-specific assessment needed";

        message.textContent =
            "For individuals under 18, BMI must be interpreted using " +
            "BMI-for-age percentiles based on exact age and sex. " +
            "A validated growth reference is needed for classification.";

    } else {

        let result = "";
        let explanation = "";

        if (bmi < 18.5) {
            result = "Underweight";
            explanation = "Your BMI is below the standard adult healthy-weight range.";
        }
        else if (bmi < 25) {
            result = "Normal Weight";
            explanation = "Your BMI is within the standard adult healthy-weight range.";
        }
        else if (bmi < 30) {
            result = "Overweight";
            explanation = "Your BMI falls within the adult overweight range.";
        }
        else if (bmi < 35) {
            result = "Obesity Class I";
            explanation = "Your BMI falls within adult obesity class I.";
        }
        else if (bmi < 40) {
            result = "Obesity Class II";
            explanation = "Your BMI falls within adult obesity class II.";
        }
        else {
            result = "Obesity Class III";
            explanation = "Your BMI falls within adult obesity class III.";
        }

        category.textContent = result;
        message.textContent = explanation;
    }

    showPage("results-page");
}


function resetCalculator() {

    document.getElementById("age").value = "";
    document.getElementById("sex").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";

    showPage("home");
}


console.log("Obesity Awareness JavaScript loaded successfully.");
