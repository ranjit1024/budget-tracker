const date = new Date();
const sourceData = document.querySelector(".add");
const listIncomAndExpense = document.querySelector(".income-list  li");
const incomList = document.querySelector(".income-list");
const expreseList = document.querySelector(".expense-list");
const balance = document.querySelector(".balance");
const income = document.querySelector(".income");
const expense = document.querySelector(".expense");

//defing transion list 
let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

//function to gerating temeplate
function generateTemplate(id , source, amount, time){
  return `<li data-id="${id}">
                    <p>
                      <span>${source}</span>
                      <span id="time">${time}</span>
                    </p>
                    $<span>${Math.abs(amount)}</span>
                    <i class="bi bi-trash delete"></i>
                  </li>`
}

//
function getTransactions(){
  const transactions = JSON.parse(localStorage.getItem("transactions"));
  transactions.forEach((element)=>{
    if(element.amount > 0){
      incomList.innerHTML += generateTemplate(element.id, element.source, element.amount, element.time);
    }else{
      expreseList.innerHTML += generateTemplate(element.id, element.source, element.amount, element.time);
    }
  })
}


function addTransitonDOM(id, source, amount, time){
    if(amount > 0){
      incomList.innerHTML += generateTemplate(id,source,amount,time)
    }else{
      expreseList.innerHTML += generateTemplate(id,source,amount,time)
    }
}


//adding tarnsition to the localStorage
function addTranstion(source, amount) {
  let id = Math.random() * 100000;
  id = Math.round(id);

  const transaction = {
    source: source,
    amount: amount,
    time:`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
    id: id,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransitonDOM(id,source,amount,transaction.time)
};
//done

//adding eventListern to the submit
sourceData.addEventListener("submit", (e) => {
  e.preventDefault();
  if(sourceData.source.value.trim() === "" || sourceData.amount.value.trim()===""){
    return alert("Plese Enter Proper Value");
  }
  addTranstion(sourceData.source.value.trim(), Number(sourceData.amount.value.trim()));
  sourceData.reset();
});
//

function deleteTtansactions(id){
  transactions = transactions.filter(transaction =>{
    return transaction.id != id;
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

incomList.addEventListener("click", (e)=>{
  if(e.target.classList.contains("delete")){
    deleteTtansactions(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
  }
})

expreseList.addEventListener("click", (e)=>{
  if(e.target.classList.contains("delete")){
    deleteTtansactions(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
  }
})

function updateStatistics(){
  const updateIncome = transactions
                                  .filter(transaction =>  transaction.amount > 0)
                                  .reduce((total, transaction) => total += Number(transaction.amount), 0)
  
  console.log(updateIncome)
  const updateExpense =  transactions
                                    .filter(transaction => transaction.amount < 0)
                                    .reduce((total, transaction) => total += Math.abs(Number(transaction.amount)) ,0);
  console.log(updateExpense);
  income.textContent = `Income: ${updateIncome}`;
  expense.textContent = `Expense : ${updateExpense}`;
  balance.textContent = `Balnce: ${updateIncome - updateExpense}`
}
updateStatistics();
getTransactions();