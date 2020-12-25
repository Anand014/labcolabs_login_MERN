const path = require("path");
const express = require("express");
const connectDB = require("./confiq/db");
const cors = require("cors");
const dotenv = require("dotenv");
const userroutes = require("./routes/authRoute");
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();

const _dirname = path.resolve();

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(_dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running");
  });
}

app.use("/api/users", userroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`server is running at port ${PORT}`);
});
