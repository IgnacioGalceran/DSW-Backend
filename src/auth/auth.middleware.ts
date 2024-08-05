import { NextFunction, Request, Response } from "express";
import { firebaseApp } from "../../firebaseConfig.js";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.headers.authorization || req.headers.Authorization)
    ?.toString()
    .replace(/^Bearer\s/, "");

  if (!token) {
    return res.status(400).json({
      message: "Proporcione un Token",
      data: undefined,
      error: true,
    });
  }

  try {
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    console.log(decodedToken);
    req.headers.firebaseUid = decodedToken.uid;
    next();
  } catch (error: any) {
    next(error);
  }
}

export default verifyToken;
