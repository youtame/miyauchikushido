import stripe from "../config/stripe.js";

export async function stripeWebhook(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
    } catch (err) {
        console.log("Webhook error:", err.message);
        return res.sendStatus(400);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;

            console.log("payment success", session.id);

            break;
    }

    res.json({ received: true });
}
