const express = require("express");
const mongo = require("./mongo");
const getdata = require("./scraping");
const productRut = require("./Routes/products");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;

const app = express();

server = async () => {
  try {
    await mongo.connect();
    await mongo.products.deleteMany({});
    await getdata();
    console.log("data inserted");
    //reset data base for every 12 hrs
    setInterval(async () => {
      await mongo.products.deleteMany({});
      await getdata();
      console.log("data reseted sucessfully");
    }, 43200 * 1000);

    app.use(cors());
    app.use(express.json());

    app.use((req, res, next) => {
      console.log("call middleware");
      next();
    });

    app.use("/products", productRut);
    app.listen(port, () => {
      console.log(`server is running at ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
server();
