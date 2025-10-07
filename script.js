class Calculator {
constructor() {
this.display = document.getElementById('display');
this.current = '0';
this.prev = null;
this.op = null;
this.reset = false;

this.init();
}

init() {
document.querySelectorAll('.btn-number').forEach(btn => {
btn.onclick = () => this.inputNumber(btn.dataset.number);
});
document.querySelectorAll('.btn-operation').forEach(btn => {
btn.onclick = () => {
if (btn.dataset.operation) this.setOperation(btn.dataset.operation);
else if (btn.dataset.action === 'equals') this.calculateResult();
};
});
document.querySelectorAll('.btn-function').forEach(btn => {
btn.onclick = () => this.handleFunction(btn.dataset.action);
});

document.querySelector('[data-action="decimal"]').onclick = () => this.addDecimal();
}

inputNumber(num) {
if (this.reset) {
this.current = num;
this.reset = false;
} else {
this.current = this.current === '0' ? num : this.current + num;
}
this.update();
}

addDecimal() {
if (this.reset) {
this.current = '0.';
this.reset = false;
} else if (!this.current.includes('.')) {
this.current += '.';
}
this.update();
}

setOperation(op) {
const curr = parseFloat(this.current);
if (this.prev !== null && this.op) {
this.prev = this.compute(this.prev, curr, this.op);
this.current = this.format(this.prev);
this.update();
} else {
this.prev = curr;
}
this.op = op;
this.reset = true;
}

calculateResult() {
if (!this.op || this.prev === null) return;
const curr = parseFloat(this.current);
const result = this.compute(this.prev, curr, this.op);
this.current = this.format(result);
this.prev = null;
this.op = null;
this.reset = true;
this.update();
}

handleFunction(action) {
const n = parseFloat(this.current);
switch (action) {
case 'clear':
this.current = '0';
this.prev = null;
this.op = null;
break;
case 'toggle-sign':
this.current = this.format(-n);
break;
case 'percent':
this.current = this.format(n / 100);
break;
}
this.update();
}

compute(a, b, op) {
switch (op) {
case '+': return a + b;
case '-': return a - b;
case '×': return a * b;
case '÷': return b ? a / b : 0;
default: return b;
}
}

format(num) {
const s = num.toString();
return s.length > 9 ? num.toExponential(5) : s;
}

update() {
this.display.textContent = this.current;
}
}

const calculator = new Calculator();

