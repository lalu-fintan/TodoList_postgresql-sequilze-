import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";

// interface UserAttributes {
//   id: string;
//   userName: string;
//   Email: string;
//   password: string;
//   role: string;
// }

// interface userInstance extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },

      // want to store the username toUppercase in database use this...
      //   get() {
      //     const rawValue = this.getDataValue("userName");
      //     return rawValue ? rawValue.toUpperCase() : null;
      //   },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false,
      defaultValue: "User",
    },
  },
  { timestamps: true }
);

User.sync();

export default User;
