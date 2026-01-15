

//way 1 
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

// module.exports = add ;
// module.exports = subtract ;
// It override Values 


module.exports = {
 add, subtractFn: subtract
};

//Way 2 
// exports.add = (a,b) => a + b ;
// exports.subtractFn = (a,b) => a - b ;