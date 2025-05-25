require("dotenv").config();
const app = require("./app");
const dbConnect = require("./utils/dbConnect");

const port = process.env.PORT || 3000;

dbConnect().then((res) => {
  if (res.connection) {
    console.log("DB Server at PORT:", res.connection.host);
    app.listen(port, () => {
      console.log(`Server started at PORT: ${port}`);
    });
  }
});
