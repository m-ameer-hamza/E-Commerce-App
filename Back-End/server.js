const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//path to config-file
dotenv.config({ path: "./config.env" });

//connecting to local data-base

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((con) => {
    //shows connection details
    //console.log(con.connections);
    console.log("MongoDB is Running!!");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

//starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is started!! on port ${port}...`);
});
