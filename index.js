const form = document.getElementById("form");

function formCreation(event) {
  event.preventDefault();

  const expenseAmount = document.getElementById("expense-amount");

  const expenseDescription = document.getElementById("description");
  const expenseCategory = document.getElementById("category");

  const expenseDetails = {
    expenseAmount: expenseAmount.value,
    expenseDescription: expenseDescription.value,
    expenseCategory: expenseCategory.value,
  };

  saveExpenseToLocalStorage(expenseDetails);

  expenseAmount.value = "";
  expenseDescription.value = "";

  showUserONScreeen();
}

function saveExpenseToLocalStorage(expenseDetails) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.push(expenseDetails);

  localStorage.setItem("expenses", JSON.stringify(expenses));
}
function showUserONScreeen() {
  const expenseDetails = JSON.parse(localStorage.getItem("expenses"));

  const parentList = document.getElementById("listItem");
  parentList.innerHTML = "";

  expenseDetails.forEach((expense, index) => {
    const listItem = document.createElement("li");

    listItem.textContent = `${expense.expenseAmount},${expense.expenseDescription},${expense.expenseCategory}`;
    parentList.appendChild(listItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    deleteBtn.addEventListener("click", () => {
      deleteExpense(index);
    });

    editBtn.addEventListener("click", () => {
      editExpense(expense, index);
    });

    listItem.appendChild(deleteBtn);
    listItem.appendChild(editBtn);
    parentList.appendChild(listItem);
  });
}

function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  showUserONScreeen();
}

function editExpense(expenseDetails, index) {
  const expenseAmount = document.getElementById("expense-amount");
  const expenseDescription = document.getElementById("description");
  const expenseCategory = document.getElementById("category");

  expenseAmount.value = expenseDetails.expenseAmount;
  expenseDescription.value = expenseDetails.expenseDescription;
  expenseCategory.value = expenseDetails.expenseCategory;
  deleteExpense(index);

  formCreation();
}
form.addEventListener("submit", formCreation);
showUserONScreeen();
