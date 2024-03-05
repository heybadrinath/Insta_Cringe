    const express = require("express");
const app = express();
const port = "3000";
const { startDB, dbStatus } = require("./database");
const routes = require("./routes/routes");
const cors = require("cors")
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors())
app.use("/", routes);

app.get("/", (req, res) => {
  res.json({ status: dbStatus ? "connected" : "disconnected" });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use(cookieParser());
app.post('/login', (req, res) => {
    const { userName } = req.body;
    res.cookie('userName', userName);
    res.send('Login successful');
});

app.get('/logout', (req, res) => {
    res.clearCookie('userName');
    res.send('Logout successful');
});


if (require.main === module) {
  app.listen(port, async () => {
    await startDB();
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;