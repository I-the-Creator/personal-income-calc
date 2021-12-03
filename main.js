// Income inputs
const incomeSalary = document.getElementById('income-salary'),
      incomeFreelance = document.getElementById('income-freelance'),
      incomeExtra1 = document.getElementById('income-extra-1'),
      incomeExtra2 = document.getElementById('income-extra-2');

// Costs inputs
const costFlat = document.getElementById('costs-flat'),
      costHouseServices = document.getElementById('costs-house-services'),
      costTransport = document.getElementById('costs-transport'),
      costCredit = document.getElementById('costs-credit');

//Total inputs
const totalMonthInput = document.getElementById('total-month'),
      totalDayInput = document.getElementById('total-day'),
      totalYearInput = document.getElementById('total-year');

let totalMonth, totalDay, totalYear;

//Money box
const moneyBoxRange = document.getElementById('money-box-range'),
      accumulationInput = document.getElementById('accumulation'),
      spend = document.getElementById('spend');

let accumulation = 0;  // savings by default
let totalPercents = 0;  // by default

const inputs = document.querySelectorAll('.input');   // get node list of elements with 'input' class - pseudo array
for(input of inputs) {
    input.addEventListener('input', () => {
        countingAvailableMony(); // call function each time then changing inputs
        calculatePercents(); // call function each time then changing inputs
    });
}

const strToNum = str => str.value ? parseInt(str.value) : 0; // if str.value exist then execute parseInt, overwise return 0

const countingAvailableMony = () => {
    const totalPerMonth = strToNum(incomeSalary) + strToNum(incomeFreelance) + strToNum(incomeExtra1) + strToNum(incomeExtra2);
    const totalCosts= strToNum(costFlat) + strToNum(costHouseServices) + strToNum(costTransport) + strToNum(costCredit);
    
    totalMonth = totalPerMonth - totalCosts;  // undefined if nothing in inputs
    totalMonthInput.value = totalMonth;
}

moneyBoxRange.addEventListener('input', event => {  // money box input lestener
    // console.log(event.target);
    const totalPercentEl = document.getElementById('total-percents');
    totalPercents = event.target.value;
    totalPercentEl.innerHTML = totalPercents;
    calculatePercents();
});

const calculatePercents = () => {
    accumulation = ((totalMonth * totalPercents) / 100).toFixed();  // % of savings
    totalMonth ? accumulationInput.value = accumulation : totalMonth = 0;   // check if inputs not empty
    spend.value = totalMonth - accumulation;

    totalDay = (spend.value / 30).toFixed();
    totalDayInput.value = totalDay;

    totalYear = accumulation * 12;
    totalYearInput.value = totalYear;
}