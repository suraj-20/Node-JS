const express = require("express");
const app = express();
const port = 4400;

app.get("/", (req, res) => {
    res.send("Ram Ram Sare Bhaiya ne.. aj hai mera express js ka phla din..(:");
})

app.listen(port, () => {
    console.log(`Express is listening to port ${port}`);
})