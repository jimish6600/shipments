const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRouter = require("./router/auth.router");
const teacherRouter = require("./router/teacher.router");
const classroomRrouter = require("./router/classroom.router");
const studentRouter = require("./router/student.router");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("jimish backend is working");
});

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/classrooms", classroomRrouter);
app.use('/api/students', studentRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is runing ${PORT}`);
});
