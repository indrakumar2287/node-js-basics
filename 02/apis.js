// api.js
const { localUsers } = require("./fakeDb");
const User = require("./models/user_model")

async function register(name, email, password, role) {
    await delay(400);

    if (!name || !email || !password || !role) {
        throw "Please provide all the details";
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw "Account already exists. Please login!";
    }

    const user = User.create({
        name,
        email,
        password,
        balance: 500,
        role
    });


    // remove password before sending response
    const { password: pws, ...safeUser } = user.toObject();


    return safeUser;
}



async function login(email, password) {
    await delay(400);

    const user = localUsers.find(
        u => u.email == email && u.password == password
    );

    if (!user) {
        throw "Invalid email or password";
    }
    // remove password safely
    // const { password, ...safeUser } = user;

    return user;
}


async function getProfile(userId) {
    await delay(400);

    const user = localUsers.find(u => u.id === userId);
    if (!user) {
        throw "User not found";
    }

    // remove password safely
    const { password, ...safeUser } = user;

    return safeUser;
}

async function transferMoney(senderUserId, receiverId, amount) {
    await delay(400);

    const sender = localUsers.find(u => u.id === senderUserId);
    const receiver = localUsers.find(u => u.id === receiverId);

    if (!sender) throw "Sender not found";
    if (!receiver) throw "Receiver not found";
    if (amount <= 0) throw "Invalid amount";

    if (sender.balance < amount) {
        throw "Insufficient balance";
    }

    sender.balance -= amount;
    receiver.balance += amount;

    return {
        status: 200,
        message: "Transfer successful",
        data: {
            from: sender,
            to: receiver,
            amount
        }
    };
}



// async function transferMoney(senderUserId, receiverId, amount) {
//     await delay(400);
//     const sender = localUsers.find(u => u.id === senderUserId)
//     const receiver = localUsers.find(u => u.id === receiverId)
//     if (!sender) {
//         throw "Sender not Available"
//     }
//     if (!receiver) {
//         throw "Receiver not Available"
//     }
//     if (amount < 1) {
//         throw "Please tranfer a valid amount"
//     }
//     if (amount > sender.balance) {
//         throw "Not enough amount available to transfer"
//     }

//     sender.balance = sender.balance - amount;
//     receiver.balance = receiver.balance + amount;

//     return { status: 200, data: {}, message: "Amount Successfully Transffered" }


// }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



module.exports = {
    login, getProfile, transferMoney, register
}