// api.js
const { default: mongoose } = require("mongoose");
const { localUsers } = require("./fakeDb");
const Users = require("./models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function register(name, email, password, role) {
    await delay(400);

    if (!name || !email || !password || !role) {
        throw "Please provide all the details";
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        throw "Account already exists. Please login!";
    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await Users.create({
        name,
        email,
        password: hashedPassword,
        balance: 500,
        role
    });

    // remove password safely
    const { password: _pw, ...safeUser } = user.toObject();

    return safeUser;
}




async function login(email, password) {
    await delay(400);

    const user = await Users.findOne({ email: email }
    );

    if (!user) {
        throw "No User Found. Please register";
    }

    const isMatchPass = await bcrypt.compare(password, user.password)

    if (!isMatchPass) {
        throw "Invalid password";
    }

    const token = jwt.sign({
        userId: user._id,
        role: user.role
    }, "my_super_secret_key_123", { expiresIn: "1d" })

    // remove password safely
    const { password: _pw, ...safeUser } = user.toObject();
    return { user: safeUser, token };
}

async function getUsersList() {
    await delay(400);
    const userList = await Users.find({}, { password: 0 });

    return userList;
}

async function getProfile(userId) {
    await delay(400);

    if (!mongoose.isValidObjectId(userId)) {
        throw "Invalid user id";
    }

    const user = await Users.findById(userId);

    if (!user) {
        throw "User not found";
    }

    const { password: _pw, ...safeUser } = user.toObject();
    return safeUser;
}


async function transferMoney(senderUserId, receiverId, amount) {
    await delay(400);

    if (amount <= 0) throw "Invalid amount";

    const sender = await Users.findById(senderUserId);
    if (!sender) throw "Sender not found";

    if (sender.balance < amount) {
        throw "Insufficient balance";
    }

    // atomic update
    await Users.updateOne(
        { _id: senderUserId },
        { $inc: { balance: -amount } }
    );

    await Users.updateOne(
        { _id: receiverId },
        { $inc: { balance: amount } }
    );

    return {
        status: 200,
        message: "Transfer successful",
        data: { amount, sender }
    };
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



module.exports = {
    login, getProfile, transferMoney, register, getUsersList
}