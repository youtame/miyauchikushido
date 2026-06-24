import express from "express";
import { createSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", createSession);

export default router;
