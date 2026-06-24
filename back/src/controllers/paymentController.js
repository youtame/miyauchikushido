// controllers/paymentController.js
import { createCheckoutSession } from "../services/stripeService.js";
import { PRODUCTS } from "../config/products.js";

export async function createSession(req, res) {
    try {
        const { product } = req.body;

        const item = PRODUCTS[product];

        if (!item) {
            return res.status(400).json({ error: "invalid product" });
        }

        const session = await createCheckoutSession(item.priceId);

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "payment session failed" });
    }
}
