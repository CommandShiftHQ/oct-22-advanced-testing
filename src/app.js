const express = require("express");

const app = express();

app.use(express.json());

const healthRouter = require("./routes/health");
app.use("/health", healthRouter);

module.exports = app;
