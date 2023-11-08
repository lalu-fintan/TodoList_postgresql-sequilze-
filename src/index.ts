import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/dbConfig";
import mainRouter from "./routers/main.router";
dotenv.config();

const app: Express = express();
const coreOption = {
  origin: process.env.ORIGIN_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const port = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(coreOption));

// app.use("/", (req, res) => {
//   res.send("Hello World!");
// });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("connection has been establised successfully");
  })
  .catch((err) => {
    console.log("Unable to connect the database" + err);
  });

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
