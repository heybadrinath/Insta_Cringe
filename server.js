const express = require("express");
const app = express();
const port = "3000";
const { startDB, dbStatus } = require("./database");
const routes = require("./routes/routes");

app.use(express.json());

app.use("/", routes);

app.get("/", (req, res) => {
  res.json({ status: dbStatus ? "connected" : "disconnected" });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

if (require.main === module) {
  app.listen(port, async () => {
    await startDB();
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
