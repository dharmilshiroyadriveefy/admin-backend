const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const app = express(); // creates a server object

app.use(cors());
app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));
// Middleware to set the base URL
app.use((req, res, next) => {
    req.BASE_URL = `${req.protocol}://${req.get('host')}`;
    next();
});
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started on port: ${ServerConfig.PORT}`);
});
