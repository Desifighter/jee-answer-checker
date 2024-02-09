import express from "express";
import { landingPageController } from "../controllers/landingPageController.js";


const router = express.Router();

//routes
router.post(
  "/home",
  landingPageController
);

export default router;