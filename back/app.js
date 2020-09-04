require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("./config/mongoose.config");
app.use(bodyParser.json());
app.use(express.static("public"));

// configuracion middleware CORS
const whitelist = ["http://localhost:5000", "http://localhost:3000"];
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted);
  },
  credentials: true,
};
app.use(cors(corsOptions));

const eventRoutes = require("./routes/events/index");
// console.log("EventRoutes", eventRoutes);
app.use("/events", eventRoutes);

app.get("/test", async (req, res) => {
  res.json({ message: "pass!" });
});

app.listen(process.env.PORT, () => {
  console.log("process.env", process.env.ENV);
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

module.exports = app;
