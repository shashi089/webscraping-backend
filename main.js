const express = require("express");
const mongo = require("./mongo");
const getdata = require("./scraping");
const productRut = require("./Routes/products");
const PORT = 3001;

const app = express();

server = async () => {
  try {
    await mongo.connect();

    await mongo.products.deleteMany({});
    await getdata();

    app.use(express.json());

    app.use((req, res, next) => {
      console.log("call middleware");
      next();
    });

    app.use("/products", productRut);
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
server();
