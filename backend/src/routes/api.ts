import express from "express";
import {
  getProducts,
  premiumCalculation,
} from "../controllers/fwd/fwd.controller";

const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/premiumCalculation", premiumCalculation);

export default router;
