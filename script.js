const buttons = document.querySelectorAll(".calc-button")
const inputField = document.getElementById("calc_input");
const outputMemoryList = document.querySelector(".output-memory-list")

// document.addEventListener("DOMContentLoaded", () => {
//     clearInput();
// })

buttons.forEach((button) => {
    button.addEventListener("click", handleBtnClick);
})

function handleBtnClick(event) {
    let buttonText = event.target.innerText;
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "%", "/", "*", "-", "+", "."].includes(buttonText)) {
        inputField.value += buttonText;
    } else if (buttonText === "AC") {
        clearInput();
    } else if (buttonText === "=") {
        evaluateExpression();
    }

}

function clearInput() {
    inputField.value = "";
}

function evaluateExpression() {
    let input = inputField.value;
    let isSimplyANumber = false;
    if (input === "") return;
    for (let n of input) {
      if (["%", "/", "*", "-", "+", "."].includes(n)) {
        isSimplyANumber = false;
        break;
      } else {
        isSimplyANumber = true;
      }
    }

    if (isSimplyANumber === true) return;
    let result = 0;
    try {
        result = math.evaluate(input);
        inputField.value = result;
    } catch (e) {
        inputField.value = "Error!";
        return;
    }
    
    addMemoryItem(result, input);
}

function getMemoryItems() {
    let memItems = outputMemoryList.getElementsByTagName("li");
    return memItems;
}

function sortMemoryItems() {
    let memItems = getMemoryItems();

    if (memItems.length === 3) {
        for (let i = 0; i < memItems.length; i++) {
            if (i < 2) {
                if (!memItems[i].classList.contains("previous")) {
                    memItems[i].classList.add("previous");
                }
            } else {
                memItems[i].classList.remove("previous");
            }
        }
    } else if (memItems.length === 2) {
        for (let i = 0; i < memItems.length; i++) {
            if (i < 1) {
                if (!memItems[i].classList.contains("previous")) {
                    memItems[i].classList.add("previous");
                }
            } else {
                memItems[i].classList.remove("previous");
            }
        }
    } else {
        memItems[0].classList.remove("previous")
    }
}

function addMemoryItem(result, input) {
    let memItems = getMemoryItems();
    if (memItems.length > 2) {
        memItems[0].remove();
    }

    let memItem = document.createElement("li");
    memItem.classList.add("output-memory-text", "previous");
    memItem.innerHTML = `${input} = ${result}`;
    outputMemoryList.appendChild(memItem);
    sortMemoryItems();
}