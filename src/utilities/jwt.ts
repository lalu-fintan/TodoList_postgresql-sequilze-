import jwt from "jsonwebtoken";

export const genAccessToken = (id: any) => {
  return jwt.sign({ id }, process.env.ACCESS_KEY as string, {
    expiresIn: "1d",
  });
};

export const genRefreshToken = (id: any) => {
  return jwt.sign({ id }, process.env.ACCESS_KEY as string, {
    expiresIn: "3d",
  });
};
