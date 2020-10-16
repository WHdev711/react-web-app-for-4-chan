const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
require("dotenv").config();
const mongo = require("mongoose");
const cors = require("cors");
const app = express();
const Chan = require("./mongo-models/chan");
const Chanchild = require("./mongo-models/chanchild");
const fs = require("fs");

let db;
// Connect to MongoDB
if (process.env.NODE_ENV.trim() === "production") {
  console.log("production log is here");
  // DB Config
  db = require("./config/keys").mongoURIProd;
} else if (process.env.NODE_ENV.trim() === "development") {
  // DB Config
  db = require("./config/keys").mongoURIDev;
}

mongo
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use("/graphql", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  "/graphiql",
  cors(),
  graphqlHTTP({ schema: require("./schema.js"), graphiql: true })
);
// DB inserting part
const chansFromJson = JSON.parse(
  fs.readFileSync(__dirname + "/2020_10_15_8_19_14_log.json", "utf-8")
);

var tmpchans = new Array();
var tmpchanchilds = new Array();
chanlen = Object.keys(chansFromJson).length

for (let i = 0; i < chanlen; i++) {

  data = {
    chanId: chansFromJson[i].chanId,
    link: chansFromJson[i].link,
    img: chansFromJson[i].img,
    replies: chansFromJson[i].replies,
    imgReplies: chansFromJson[i].imgReplies,
    title: chansFromJson[i].title,
    op: chansFromJson[i].op,
    unique_ips: chansFromJson[i].thread[0].unique_ips
  } 
  var threadlen = Object.keys(chansFromJson[i].thread).length
  // "no", "now", "name", "com", "time", "resto", "trip"
  if (threadlen>1) {
    for (let j = 1; j < threadlen; j++)
      {
        threaddata = {
          no: chansFromJson[i].thread[j].no,
          now: chansFromJson[i].thread[j].now,
          name: chansFromJson[i].thread[j].name,
          com: chansFromJson[i].thread[j].com,
          time: chansFromJson[i].thread[j].time,
          resto: chansFromJson[i].thread[j].resto,
          trip: chansFromJson[i].thread[j].trip
        }
        tmpchanchilds.push(threaddata)
      }
  }
  tmpchans.push(data);
  
}


async function loadChans() {
  try {
    await Chan.insertMany(tmpchans);
    console.log("Json to DB chan Inserting Done!");
  } catch (e) {
    console.log("json parsing and save into db error", e);
    process.exit();
  }
}

async function loadChanchilds() {
  try {
    await Chanchild.insertMany(tmpchanchilds);
    console.log("Json to DB chanchild Inserting Done!");
  } catch (e) {
    console.log("json parsing and save into db error", e);
    process.exit();
  }
}

loadChans();

loadChanchilds();

if (process.env.NODE_ENV.trim() === "production") {
  // Serve any static files
  app.use(express.static(require("path").join(__dirname, "frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(
      require("path").join(__dirname, "frontend/build", "index.html")
    );
  });
}
const port = process.env.PORT || 8080; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => {
  console.log(`Server running succefully...${port}`);
});
