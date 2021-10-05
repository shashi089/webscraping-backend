const { MongoClient } = require("mongodb");

let MONGODB_URL =
  "mongodb+srv://Shashidhar_5:Shashi@123@cluster0.kms6f.mongodb.net/OnlineShopping?retryWrites=true&w=majority";
let MONGODB_NAME = "OnlineShopping";

let client = new MongoClient(MONGODB_URL);
let mongo = {
  db: null,
  products: null,
  async connect() {
    try {
      await client.connect();
      this.db = client.db(MONGODB_NAME);
      this.products = this.db.collection("products");
      console.log("Selected Database:-", MONGODB_NAME);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = mongo;
