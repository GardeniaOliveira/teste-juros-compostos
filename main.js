const form = document.getElementById('form');
const inputName = document.getElementById('input-name');
const inputMonthlyPayment = document.getElementById('monthly-payment');
const tax = document.getElementById('tax');
const time = document.getElementById('time');
const btn = document.getElementById('btn-subscribe');
const btnAgain = document.getElementById('btn-subscribe-again');
const msg = document.getElementById('msg');
const boxMsg = document.querySelector('.box-msg');
let expr;

btn.addEventListener('click', (e) => {
    e.preventDefault();
    calculate()
   
   
})
function calculate() {

    fetch('http://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "expr": `${inputMonthlyPayment.value} * (((1 + ${tax.value}) ^ ${time.value} - 1) / ${tax.value})`
        })
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.result)
            expr = Math.round(data.result);
            form.classList.add('hidden');
            boxMsg.classList.remove('hidden');
            showMsg()
        }) .catch(error => console.error(error));


}


function showMsg() {
    msg.innerText = `Olá ${inputName.value}, investindo R$${inputMonthlyPayment.value} todo mês, você terá R$${expr} em ${time.value} anos sob uma taxa de juros de ${tax.value}% ao mês.`
}