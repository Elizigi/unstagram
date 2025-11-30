import { Request, Response } from "express";

async function logOut(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Error Logging Out", error);
    res
      .status(500)
      .json({ success: false, message: "error logging out", error });
  }
}

export default logOut;
