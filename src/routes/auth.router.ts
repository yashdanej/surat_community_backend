import express from "express";
import { APIResponse } from "../middleware/APIResponse.js";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  return res.status(200).json(new APIResponse(true, "Health"));
});

export default authRouter;
