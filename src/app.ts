import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
