// services/stripeService.js
import stripe from "../config/stripe.js";

export async function createCheckoutSession(priceId) {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],

        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    return session;
}
