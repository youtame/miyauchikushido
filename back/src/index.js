import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.js";
import { stripeWebhook } from "./webhooks/stripeWebhook.js";

dotenv.config();

const app = express();

app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use("/payment", paymentRoutes);

app.listen(3000, "0.0.0.0", () => {
    console.log("server running");
});
