// services/stripeService.js
import stripe from "../config/stripe.js";

export async function createCheckoutSession(lineItems) {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: lineItems,

        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    return session;
}
