const route = require("express").Router();

const db = require("../mongo");

route.get("/", async (req, res) => {
  try {
    const data = await db.products.find().toArray();
    res.send(data);
  } catch (err) {
    res.status(400).send("server error");
  }
});

module.exports = route;
