const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb"));

//use routes
app.use("/api/items", require("./Routes/api/Items"));
app.use("/api/users", require("./Routes/api/Users"));
app.use("/api/auth", require("./Routes/api/Auth"));

//heroku
//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
