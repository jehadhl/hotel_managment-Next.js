import { createBooking } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type SessionType = {
  metadata: any;
};

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhooksecret = process.env.STIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhooksecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhooksecret);
  } catch (err: any) {
    console.log(err);
    return new NextResponse(`WebHook Error : ${err.message}`, { status: 500 });
  }

  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      console.log(session , "hellooo")
      const {
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        },
      } = session as SessionType;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
