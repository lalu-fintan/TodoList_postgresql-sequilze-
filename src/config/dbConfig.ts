import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo-list", "laluprasath", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been establised successfully");
  })
  .catch((err) => {
    console.log("Unable to connect the database ", err);
  });

export default sequelize;
