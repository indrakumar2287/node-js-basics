

async function getUser() {
    await delay(1000);
    console.log("IN Api getUser")
    return "Indra";
}

async function getOrders(user) {
    return ["Order1", "Order2"];
}

async function main() {
    await getUser();
    // const orders = await getOrders(user);
    // console.log(user, orders);
    console.log("User 1")

    getUser().then((data, error) => {
        console.log(`Get User called > ${data} >> ${error} `)
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


main();



// console.log("Hello from hello2.js");

// async function test2() {
//     console.log("Test 2 Function ");
//     return "Return Function 2 ";
// }

// function test1() {
//     console.log("Test 1 Function ");
// }


// main();




// async function main() {
//     let result = await test2();
//     console.log("Result from test2 > ", result);
//     test1();

// }