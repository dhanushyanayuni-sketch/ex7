const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});

const Student = mongoose.model("Student", StudentSchema);

app.post("/register", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send({ message: "Student Registered Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});