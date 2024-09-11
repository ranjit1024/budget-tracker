const date = new Date();
const sourceData = document.querySelector(".add");
const listIncomAndExpense = document.querySelector(".income-list  li");
const incomList = document.querySelector(".income-list");
const expreseList = document.querySelector(".expense-list");

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
  addTranstion(sourceData.source.value.trim(), sourceData.amount.value.trim());
  sourceData.reset();
});
//
