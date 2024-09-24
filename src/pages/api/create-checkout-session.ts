import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { items } = req.body;

      // Validate items array
      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid or empty items array");
      }

      // Check that each item has valid fields
      items.forEach((item: any, index: number) => {
        console.log(
          `Validating item ${index + 1}:`,
          JSON.stringify(item, null, 2)
        );

        if (!item.price || !item.name || !item.quantity || !item.image) {
          throw new Error(`Invalid item structure: ${JSON.stringify(item)}`);
        }

        // Convert price to integer cents and check validity
        const priceInCents = Math.round(item.price * 100);
        if (isNaN(priceInCents) || priceInCents <= 0) {
          throw new Error(`Invalid price for item: ${item.name}`);
        }

        // Check that quantity is a positive integer
        if (typeof item.quantity !== "number" || item.quantity <= 0) {
          throw new Error(`Invalid quantity for item: ${item.name}`);
        }

        // Ensure the image is a valid URL string (you can customize this check)
        if (typeof item.image !== "string") {
          throw new Error(`Invalid image URL for item: ${item.name}`);
        }

        console.log(`Item ${index + 1} validated successfully`);
      });

      console.log("All cart items validated successfully");

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any, index: number) => {
          console.log(
            `Creating line item ${index + 1}:`,
            JSON.stringify(item, null, 2)
          );
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      console.log("Stripe session created:", session.id);
      res.status(200).json({ id: session.id });
    } catch (err: any) {
      console.error("Error in create-checkout-session:", err.message);
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
