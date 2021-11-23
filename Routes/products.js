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
//to get products based on search
route.get("/:id", async (req, res) => {
  try {
    //regular exp to query based on the first letters
    let search = new RegExp(`^` + req.params.id, `i`);

    const data = await db.products.find({ title: search }).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = route;
