require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const db = require("./app/models");
const generateSlugNames = require("./app/utils/generateSlugName");

app.use(cors());
//read file json

const filePath = path.join(__dirname, "/app/data/initialData.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    //fget all products
    db.products.find({}).then((products) => {
      if (products.length === 0) {
        const newData = generateSlugNames(data);
        db.products.create(newData);
      }
      console.log("Products found: ", products.length);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/items.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
