require('dotenv').config();

const app = require("./app");
const connectDb = require("./db/connect");

const port = process.env.PORT ? process.env.PORT : 8000;

const listener = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Listening on Port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};
listener();