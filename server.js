const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5643;

app.use(express.static('/Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());