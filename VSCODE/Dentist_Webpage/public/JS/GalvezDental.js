function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById("liveDateTime").textContent = now.toLocaleDateString("en-US", options);
}
updateDateTime();
setInterval(updateDateTime, 60000);

function showModal() {
    document.getElementById("contactModal").style.display = "flex";
}
document.querySelector(".footer-info button").addEventListener("click", function() {
    document.getElementById("contactModal").style.display = "flex";
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const message = document.getElementById("message").value;
    console.log("Sending message:", message);
    document.getElementById("contactModal").style.display = "none";
});

function addCoffeeImage(image){
    const img = document.createElement("img");
    img.src = image;
    img.alt = "Coffee Bean";
    img.classList.add("coffee-bean");
    document.getElementById("coffee-beans-container").appendChild(img);
}
function updateCoffeeBean(){
    const consumptionLevel = document.getElementById("coffee-consumption").value;
    const beanContainer = document.getElementById("coffee-beans-container");

    beanContainer.innerHTML = "";

    if (consumptionLevel >= 0 && consumptionLevel <= 4){
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
    } else if (consumptionLevel >= 5 && consumptionLevel <= 8){
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
    }else if (consumptionLevel >= 9 || consumptionLevel <= 10){
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
        addCoffeeImage("https://png.pngitem.com/pimgs/s/188-1880850_coffee-beans-outline-coffee-bean-outline-png-transparent.png");
    }

}

function validateInput(inputElement) {
    var validity = inputElement.validity;
    var errorElementId = 'error-' + inputElement.id;
    var errorElement = document.getElementById(errorElementId);
    let valid = true;
    let errorMessage = '';

    if (inputElement.id === 'password2') {
        const password1 = document.getElementById('password1').value;
        if (inputElement.value !== password1) {
            errorMessage = 'Passwords do not match.';
            valid = false;
        }
    }

    if (validity.valueMissing) {
        errorMessage = 'This field is required.';
        valid = false;
    } else if (validity.patternMismatch) {
        errorMessage = 'Please enter a valid value.';
        valid = false;
    } else if (validity.tooShort) {
        errorMessage = 'The value is too short.';
        valid = false;
    } else if (validity.tooLong) {
        errorMessage = 'The value is too long.';
        valid = false;
    } else if (validity.typeMismatch) {
        errorMessage = 'Please enter a value that matches the required format.';
        valid = false;
    }

    inputElement.setCustomValidity(errorMessage);
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
    return valid;
}



function validateData() {
    const formElements = document.querySelectorAll(".input-pair");
    let valid = true;

    for (let inputPair of formElements) {
        const inputElement = inputPair.querySelector("input, select, textarea");
        if (!inputElement) continue;

        if (!validateInput(inputElement)) {
            valid = false;
        }
    }
    return valid;
}



function validateAndDisplay() {
    if (validateData()) {
        const confirmationTable = document.getElementById("confirmationTable");
        let tableHTML = "<div class='modal'><table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>";

        const fields = ['first-name', 'middle-initial', 'last-name', 'DOB', 'SSN', 'address1', 'address2', 'city', 'state', 'zip', 'email', 'phone', 'medical-background', 'insured', 'coffee-consumption', 'userID', 'password1'];

        for (let field of fields) {
            const inputElement = document.getElementById(field);
            let value = inputElement.value;
            
            if (inputElement.type === 'checkbox') {
                value = inputElement.checked ? 'Yes' : 'No';
            } else if (inputElement.type === 'password') {
                value = '********';
            } else if (inputElement.type === 'select-one') {
                value = inputElement.options[inputElement.selectedIndex].text;
            }

            tableHTML += `<tr><td>${field.replace("-", " ")}</td><td>${value}</td></tr>`;
        }

        const ageGroup = document.querySelector("input[name='age-group']:checked");
        tableHTML += `<tr><td>Age Group</td><td>${ageGroup ? ageGroup.value : ''}</td></tr>`;

        tableHTML += "</tbody></table>";
        tableHTML += '<button onclick="submitForm()">Confirm and Submit</button>';
        tableHTML += '<button onclick="closePopup()">Go Back and Edit</button></div>';

        
        confirmationTable.innerHTML = tableHTML;
        confirmationTable.style.display = "block";
    } else {
        alert("Please fix the input errors!");
    }
}




function closePopup() {
    document.getElementById("confirmationTable").style.display = "none";
}

function submitForm() {
    window.location.href = "2072093-thankyou.html";
}


