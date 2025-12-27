const balance_element = document.getElementById("balance");
const incomeAmtelement = document.getElementById("income-amount");
const expensesAmtelement = document.getElementById("expenses-amount");
const transactionListelements = document.getElementById("transaction-list");
const transactionFormelement = document.getElementById("transaction-form");
const descriptionElement = document.getElementById("description");
const amountElement = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormelement.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionElement.value.trim();
  const amount = parseFloat(amountElement.value);

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();

  transactionFormelement.reset();
}

function updateTransactionList() {
  transactionListelements.innerHTML = "";
  const sortedList = [...transactions].reverse();

  sortedList.forEach((transaction) => {
    const transactionele = createTransactionEle(transaction);
    transactionListelements.appendChild(transactionele);
  });
}

function createTransactionEle(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expenses");
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick=removeTransaction(${
        transaction.id
      })>x</button>
    </span>
  `;
  return li;
}

function updateSummary() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = balance - income;

  balance_element.textContent = formatCurrency(balance);
  incomeAmtelement.textContent = formatCurrency(income);
  expensesAmtelement.textContent = formatCurrency(expenses);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();
}

updateTransactionList();
updateSummary();
