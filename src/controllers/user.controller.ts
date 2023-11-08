import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { genAccessToken, genRefreshToken } from "../utilities/jwt";
import { Op } from "sequelize";

export const signUp = async (req: Request, res: Response) => {
  const { userName, Email, password } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (user) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        userName,
        Email,
        password: hashPassword,
      });
      const userId = newUser.getDataValue("id");
      const refreshToken = genRefreshToken(userId);
      const accessToken = genAccessToken(userId);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({ message: "SignUp successfully", accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { Email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { Email: { [Op.iLike]: Email } },
    });

    if (
      user &&
      (await bcrypt.compare(password, user.dataValues.password as string))
    ) {
      const userId = user.getDataValue("id");

      const refreshToken = genRefreshToken(userId);
      const accessToken = genAccessToken(userId);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({ message: "SignIn successfully", accessToken });
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
