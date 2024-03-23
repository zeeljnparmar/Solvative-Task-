const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//? mongo Db connection function
const connectMongo = async () => {
  try {
    console.log(`reached`);
    const connection = await mongoose
      .connect(process.env.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("database connected");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {}
};

module.exports = { connectMongo };
