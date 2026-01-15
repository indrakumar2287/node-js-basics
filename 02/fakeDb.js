// fakeDb.js

const users = [
    {
        id: 1,
        name: "Indra",
        email: "indra@test.com",
        password: "1234",
        balance: 5000,
        role: "admin"
    },
    {
        id: 2,
        name: "Ravi",
        email: "ravi@test.com",
        password: "abcd",
        balance: 2000,
        role: "user"
    },
    {
        id: 3,
        name: "Neha",
        email: "neha@test.com",
        password: "9999",
        balance: 8000,
        role: "user"
    }
];

module.exports = {
    users
};