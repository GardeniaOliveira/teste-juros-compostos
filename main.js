const form = document.getElementById('form');
const inputName = document.getElementById('input-name');
const inputMonthlyPayment = document.getElementById('monthly-payment');
const tax = document.getElementById('tax');
const time = document.getElementById('time');
const btn = document.getElementById('btn-subscribe');
const btnAgain = document.getElementById('btn-subscribe-again');
const msg = document.getElementById('msg');
const boxMsg = document.querySelector('.box-msg');
const error = document.querySelectorAll('.error');
let expr;
let formCompleteName = false;
let formErrorName = true;
let formCompletePayment = false;
let formErrorPayment = true;
let nameMsg = document.querySelector('.name');
let paymentMsg = document.querySelector('.payment');
let resultMsg = document.querySelector('.result');
let timeMsg = document.querySelector('.time');
let taxMsg = document.querySelector('.tax');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    validadeForm()
    if(formCompleteName === true && formCompletePayment === true && formErrorName === false && formErrorPayment === false) {
        calculate()
    }  
   
})

function validadeForm()  {
    const regexName =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    
    if(inputName.value !== "" && inputName.value.match(regexName) ){
      console.log('passou aquis')
        formCompleteName = true;
        formErrorName = false;
        error[0].innerText =" ";
        inputName.style.border = "1px solid green";
       
    } 
    
    else{
            error[0].innerText ="Por favor, digite seu nome";
            inputName.style.border = "1px solid red";
            formCompleteName = false;
            formErrorName = true;
            
        }
    if(inputMonthlyPayment.value != ""){
        formCompletePayment = true;
        formErrorPayment = false;
        error[1].innerText =" ";
        inputMonthlyPayment.style.border = "1px solid green";
       

    } else{
        formCompletePayment = false;
        formErrorPayment = true;
        error[1].innerText ="Por favor, digite um valor";
        inputMonthlyPayment.style.border = "1px solid red";
    }
}

function calculate() {
    console.log(`${inputMonthlyPayment.value} * (((1 + ${tax.value}) ^ (${time.value} * 12) - 1) / ${tax.value})`)
    fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "expr": `${inputMonthlyPayment.value} * (((1 + ${tax.value}) ^ (${time.value} * 12) - 1) / ${tax.value}).toFixed(2)`
            
        })
       
    })
        .then(response => {
           
            return response.json()
        })
        .then(data => {
          
            console.log(data.result)
            expr = data.result;
            form.classList.add('hidden');
            boxMsg.classList.remove('hidden');
            showMsg()
        }) .catch(error => console.error(error));


}


function showMsg() {
    nameMsg.innerText = inputName.value;
    paymentMsg.innerText = `R$ ${inputMonthlyPayment.value}` ;
     resultMsg.innerText = `R$ ${expr}` ;
     if(time.value === '1'){
        timeMsg.innerText = `${time.value} ano` ;
     } else{
        timeMsg.innerText = `${time.value} anos`;
     }
   
     taxMsg.innerText = `${tax.value} %` ;

}

