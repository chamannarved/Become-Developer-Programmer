const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("transactions");
const form = document.getElementById("form");

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions =
    localStorage.getItem("transactions") !== null
        ? localStorageTransactions
        : [];

function addTransationToDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const liItem = document.createElement("li");

    // Add class based on value
    liItem.classList.add(transaction.amount < 0 ? "minus" : "plus");

    liItem.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>`;
    list.appendChild(liItem);
}

function genrateID() {
    return Math.floor(Math.random() * 100000);
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = "";
    transactions.forEach(addTransationToDOM);
    // updateValues();
}

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("please add Text and Amount");
    } else {
        const transaction = {
            id: genrateID(),
            text: text.value,
            amount: amount.value,
        };

        transactions.push(transaction);

        addTransationToDOM(transaction);
        // updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}

init();

form.addEventListener("submit", addTransaction);
