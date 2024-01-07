const fs = require('fs');
const os = require('os');

// console.log(os.cpus().length);

// Sync..
// fs.writeFileSync("./text.txt", "Jai shree Ram");

// Async..
// fs.writeFile("./text.txt", "Jai Shree Radha Rani", (err) => {});

// fs.appendFileSync("./text.txt", `Radhe Radhe\n`);

// Sync..
// const result = fs.readFileSync("./contect.txt", "utf-8");

// console.log(result);

// Async..
// fs.readFile("./contect.txt", "utf-8", (err, res) => {
//     if(err) {
//         console.log("error", err);
//     } else {
//         console.log(res);
//     }
// })

// fs.copyFileSync("./contect.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// Syncronized task..
console.log("1");

// const result = fs.readFileSync("./contect.txt", "utf-8");
// console.log(result);

console.log("2");

// Asyncronized..
// fs.readFile("./contect.txt", "utf-8", (err, res) => {
//     console.log(res);
// })

// console.log("3");
// console.log("4");
// console.log("5");