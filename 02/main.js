const { login, getProfile, transferMoney } = require("./api")


async function main() {
    try {
        const user = await login("indra@test.com", "1234");
        console.log("Logged in:", user);

        // const profile = await getProfile(user.id);
        // console.log("Profile:", profile);

        var result = await transferMoney(1, 2, 199);
        console.log("Tranfer result > ", result)

        const indra = await getProfile(1);
        console.log("Sender Remaining Amount :", indra.balance);
        const ravi = await getProfile(2);
        console.log("Ravi after transfer:", ravi);
    } catch (e) {
        console.log("API Error:", e);
    }
}

main();
