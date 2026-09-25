// controllers/paymentController.js
import { createCheckoutSession } from "../services/stripeService.js";
import { PRODUCTS } from "../config/products.js";

export async function createSession(req, res) {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "products array is required" });
        }

        const lineItems = [];

        for (const productId of products) {
            const item = PRODUCTS[productId];

            if (!item) {
                return res.status(400).json({ error: `invalid product: ${productId}` });
            }

            lineItems.push({
                price: item.priceId,
                quantity: 1,
            });
        }

        const session = await createCheckoutSession(lineItems);

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "payment session failed" });
    }
}
