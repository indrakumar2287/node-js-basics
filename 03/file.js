const fs = require('fs');


// // Syncronous File Write
// fs.writeFileSync("text.txt", "Hello from NodeJS File System Module 222 ")

// console.log("File Write Initiated 11");

// fs.writeFile("text-async.txt", "Hello from NodeJS File System Module - Async ", (err) => {
//     if (err) {
//         console.log("Error in async file write ", err);
//     } else {
//         console.log("Async File Write Completed ");
//     }
// });

// console.log("File Write Initiated 22");


// case 1 : File Read Syncronous
// const result = fs.readFileSync('./contacts.txt', 'utf-8',);
// console.log("Result : ", result);


//case 2 : File Read Asyncronous
// const result = fs.readFile('./contacts.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log("Error in async file read ", err);
//     } else {
//         console.log("Async File Read Completed ", data);
//     }
// });
// console.log("Result : ", result);

// fs.appendFile('contacts.txt', '\nNew Contact Added 5555', (err) => {
//     if (err) {
//         console.log("Error in appending file ", err);
//     } else {
//         console.log("File Appended Successfully ");

//     }
// });

// fs.appendFileSync('./contacts.txt', `\nNew Date Added ${Date.now()}`);

// fs.cpSync('./contacts.txt', './contacts-backup.txt');
// fs.unlinkSync('./contacts-backup.txt');


// console.log("File Write Initiated 00");
// let result = fs.statSync('./contacts.txt', (err, sta) => {
//     if (err) {
//         console.log("Error in file stat ", err);
//     } else {
//         console.log("File Stats : ", sta);
//     }
// });

// console.log("File Stats : ", result);

fs.mkdirSync('newDir2/new/', {
    recursive: true
})

fs.rmdir('newDir2', (result) => {
    console.log("Status ", result)
})