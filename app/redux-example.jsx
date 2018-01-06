var redux = require('redux');

// pure function
function add(a, b) {
    return a + b;
}

// non-pure function (external dependency)
var a = 3;
function add2 (b) {
    return a + b;
}

var result;

// side effects
function add3 (a, b) {
    result = a + b;
    return result;
}

// relies on changing/temporal data, so is not pure
function add4(a, b) {
    return a + b + new Date().getSeconds();
}

function changeProp(obj) {
    return {
        ...obj,
        name: 'fart'
    };
}

var startingValue = {
    name: 'mike', 
    age: 26
};

var res = changeProp(startingValue);

console.log(startingValue);
console.log(res);