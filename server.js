const express = require("express");
const app = express();
const port = "3000";
const { startDB, dbStatus } = require("./database");
const routes = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.get("/", (req, res) => {
  res.json({ status: dbStatus ? "connected" : "disconnected" });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(cookieParser());
app.post("/login", (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      throw new Error("Username is required");
    }
    res.cookie("userName", userName);
    res.send("Login successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("userName");
    res.send("Logout successful");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

if (require.main === module) {
  app.listen(port, async () => {
    await startDB();
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
