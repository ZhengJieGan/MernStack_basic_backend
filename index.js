import app from "./server.js";
import mongdb from "mongodb";
import dotenv from "dotenv";
import RestaurantDAO from "./dao/restaurantsDAO.js";
import ReviewDAO from "./dao/reviewsDAO.js";

dotenv.config();
const MongoClient = mongdb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantDAO.injectDB(client);
    await ReviewDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
