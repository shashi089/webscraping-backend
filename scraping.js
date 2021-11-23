const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./mongo");

const getData = async () => {
  let amazonData = [];
  try {
    const response = await axios.get(
      `https://www.amazon.in/s?k=mobiles&rh=n%3A26850977031&ref=nb_sb_noss`
    );
    const $ = cheerio.load(response.data);

    $(".s-asin").each((index, ele) => {
      if (index < 10) {
        let image = $(ele).find(".aok-relative").children().attr("src");
        let title = $(ele).find("span.a-text-normal").text();
        let rating = $(ele).find(".a-icon-star-small").children().text();
        let price = $(ele)
          .find("span.a-text-price")
          .children("span.a-offscreen")
          .text();
        let offerprice = $(ele).find("span.a-price-whole").text();
        amazonData[index] = { image, title, rating, price, offerprice };
      }
    });
    console.log(amazonData);
    db.products.insertMany(amazonData);
  } catch (err) {
    console.log(err);
  }

  let flipcartData = [];
  try {
    const response = await axios.get(
      `https://www.flipkart.com/search?q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`
    );
    const $ = cheerio.load(response.data);
    let count = 0;
    $("._1AtVbE").each((index, ele) => {
      if (count < 10) {
        let image = $(ele).find("._396cs4").children().attr("src");
        let title = $(ele).find("._4rR01T").text();
        let rating = $(ele).find("span._1lRcqv").children().text();
        let price = $(ele).find("._3I9_wc").text();
        let offerprice = $(ele).find("._30jeq3").text();
        if (price !== "" || title !== "") {
          flipcartData[count] = { image, title, rating, price, offerprice };
          count++;
        }
      }
    });
    console.log(flipcartData);
    db.products.insertMany(flipcartData);
  } catch (err) {
    console.log(err);
  }

  let snapdealData = [];
  try {
    const response = await axios.get(
      `https://www.snapdeal.com/search?keyword=mobiles&santizedKeyword=&catId=&categoryId=0&suggested=false&vertical=&noOfResults=20&searchState=&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy`
    );
    const $ = cheerio.load(response.data);
    let count = 0;
    $(".favDp").each((index, ele) => {
      if (count < 10) {
        let image = $(ele)
          .find(".product-tuple-image")
          .children("a")
          .attr("href");
        let title = $(ele).find(".product-title").text();
        let rating = "";
        let price = $(ele).find("span.product-desc-price").text();
        let offerprice = $(ele).find("span.product-price").text();
        if (price !== "" || title !== "") {
          snapdealData[count] = { image, title, rating, price, offerprice };
          count++;
        }
      }
    });
    console.log(snapdealData);
    db.products.insertMany(snapdealData);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getData;
