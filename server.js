const express = require("express");
const app = express();
const port = "3000";

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}
app.get("/", (req, res) => {
  res.send("home");
});
app.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = app;
