import sequelize from "../config/dbConfig";
import { DataTypes } from "sequelize";

const TodoList = sequelize.define(
  "Todo-List",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

TodoList.sync();
export default TodoList;
