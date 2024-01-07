import express from "express";

const app = express();

// app.use(require('./products'));
app.use(require('./entries'));

module.exports = app;