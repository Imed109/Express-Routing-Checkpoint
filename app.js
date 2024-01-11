const express = require("express");

const app = express();

const PORT = 3000;
let nowDate = new Date();

const WorkTimetableHandler = (req, res, next) => {
  if (
    nowDate.getDay() == 0 ||
    nowDate.getDay() == 6 ||
    nowDate.getHours() < 9 ||
    nowDate.getHours() > 17
  ) {
    return res.send(
      "<h1 style='text-decoration: line-through solid red 2px;text-align: center;vertical-align:middle; position: absolute;left:0;right:0;top:30%;' >Out of working hours</h1>"
    );
  }
  next();
};

app.use(WorkTimetableHandler);
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/services", (req, res, next) => {
  res.sendFile(__dirname + "/pages/services.html");
});
app.get("/contact", (req, res, next) => {
  res.sendFile(__dirname + "/pages/contact.html");
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
