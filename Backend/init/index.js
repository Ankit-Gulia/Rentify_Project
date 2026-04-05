const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://ankitgulia67_db_user:%40ankitgulia67_db_user@airbnbclonecluster.46pvkei.mongodb.net/airbnb?appName=AirbnbCloneCluster";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data.map(async(item) => {
    item.owner = {_id : "69c7791783357226413d5e16"};
    let newListing = new Listing(item);
    await newListing.save();
  })
  
  console.log("data was initialized");
};

initDB();