require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./config/mongoose.config");
app.use(bodyParser.json());

const eventRoutes = require("./routes/events.routes");
// console.log("EventRoutes", eventRoutes);
app.use("/events", eventRoutes);

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
