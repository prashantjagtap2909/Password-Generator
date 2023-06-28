const passWord = document.getElementById("passWord");
const charLength = document.getElementById("charLength");
// Inpts
const upperCase = document.getElementById("upperCase");
const lowerCase = document.getElementById("lowerCase");
const number = document.getElementById("numbers");
const symbol = document.getElementById("symbols");
const checkBoxes = document.querySelectorAll(".selc");
// Submit
const generateBtn = document.querySelector(".generateBtn");
const copyBtn = document.querySelector(".copy");
/* Range */
const range = document.getElementById("range");
range.addEventListener("input", () => {
    // Functional Slider
    let rangeSlider = ((range.value - range.min) * 100) / (range.max - range.min) + '% 100%';
    range.style.backgroundSize = rangeSlider;
    charLength.innerHTML = range.value;
});
// Inpts random selection
function uppercase() {
    let randomUpperCaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    return randomUpperCaseLetter;
}
function lowercase() {
    let randomlowerCaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    return randomlowerCaseLetter;
}
function numbers() {
    let randomNumber = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    return randomNumber;
}
function symbols() {
    let randomSymbol = String.fromCharCode(Math.floor(Math.random() * 15) + 33);
    return randomSymbol;
}
// Check which box is selected & give the results based on those checked boxes
function checkBox() {
    let random = [];
    for (let i = 0; i < range.value; i++) {
        for (let i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked === true) {
                // names and functions has the same name
                const regex = /[a-z]/g;
                const matches = checkBoxes[i].name.match(regex);
                const func =  matches.join('') + '()';
                // Use eval to change a string to a function
                random.push(eval(func));
            }
        }   
    }
    const req = random.slice(-range.value);
    // Use sort to mix the result 
    const mixed = req.sort(() => 0.5 - Math.random());
    if (mixed != 0) {
        copyBtn.removeAttribute("disabled");
        copyBtn.classList.add("enabled");
        passWord.innerHTML = mixed.join('');
    } else {
        copyBtn.setAttribute("disabled", '');
        copyBtn.classList.remove("enabled");
        passWord.innerHTML = 'Check the boxes below to generate'
    }
}
// Srength
const strengthBox = document.querySelectorAll(".strengthSpan");
function strongPswChecker() {
    let random = [];
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            random.push('true');
        }
    }
    const checkedBoxes = random.length;
    strengthBox.forEach(box => {
        box.classList.remove("weak");
        box.classList.remove("weaker");
        box.classList.remove("meduim");
        box.classList.remove("strong");
    });
    for (let i = 0; i < checkedBoxes; i++) {
        if (range.value < 6) {
            strengthBox[0].classList.add("weaker");
        } else if (checkedBoxes <= 1) {
            strengthBox[i].classList.add("weaker");
        } else if (checkedBoxes <= 2) {
            strengthBox[i].classList.add("weak");
        } else if (checkedBoxes <= 3) {
            strengthBox[i].classList.add("meduim");
        } else {
            strengthBox[i].classList.add("strong");
        }
    }
}
// Copy the password
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passWord.innerText);
    copyBtn.classList.add("active");
    setTimeout(copied, 800);
});
// Remove the copy text
function copied() {
    copyBtn.classList.remove("active");
}

// Submit generate button
generateBtn.addEventListener("click", () => {
    checkBox();
    strongPswChecker();
});
// Toggle Theme
const toggle = document.getElementById("theme");
toggle.addEventListener("click", () => {
    if (toggle.checked) {
        document.body.ariaLabel = "Light Mode";
        document.documentElement.style.setProperty('--BackGroundBody', "#CFF5E7");
        document.documentElement.style.setProperty('--BackGroundApp', "#00E7FF");
        document.documentElement.style.setProperty('--PrimaryBtn', "#0014FF");
        document.documentElement.style.setProperty('--PrimaryText', "#2a2a2a");
        document.documentElement.style.setProperty('--SecondaryText', "#444444");
    } else {
        document.body.ariaLabel = "Dark Mode";
        document.documentElement.style.setProperty('--BackGroundBody', "#2D033B");
        document.documentElement.style.setProperty('--BackGroundApp', "#810CA8");
        document.documentElement.style.setProperty('--PrimaryBtn', "#AE00FB");
        document.documentElement.style.setProperty('--PrimaryText', "#e6e6e6");
        document.documentElement.style.setProperty('--SecondaryText', "#e6e6e6a4");
    }
});