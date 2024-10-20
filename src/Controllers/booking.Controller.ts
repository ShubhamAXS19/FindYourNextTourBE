// import TourModel from "../Models/tour.Model";
// import catchAsync from "../Utils/catchAsync";
// import BookingModel from "../Models/booking.Model";
// import { Request, Response, NextFunction } from "express";
// import {
//   createOne,
//   getAll,
//   getOne,
//   updateOne,
//   deleteOne,
// } from "./handlerFactory";

// export const getCheckoutSession = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // 1) Get the currently booked tour
//     const tour = await TourModel.findById(req.params.tourId);
//     // console.log(tour);

//     // 2) Create checkout session
//     // const session = await stripe.checkout.sessions.create({
//     //   payment_method_types: ['card'],
//     //   // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
//     //   //   req.params.tourId
//     //   // }&user=${req.user.id}&price=${tour.price}`,
//     //   success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
//     //   cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     //   customer_email: req.user.email,
//     //   client_reference_id: req.params.tourId,
//     //   line_items: [
//     //     {
//     //       name: `${tour.name} Tour`,
//     //       description: tour.summary,
//     //       images: [
//     //         `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
//     //       ],
//     //       amount: tour.price * 100,
//     //       currency: 'usd',
//     //       quantity: 1
//     //     }
//     //   ]
//     // });

//     // 3) Create session as response
//     // res.status(200).json({
//     //   status: 'success',
//     //   session
//     // });
//   }
// );

// export const createBookingCheckout = async () => {
//   // const tour = session.client_reference_id;
//   // const user = (await UserModel.findOne({ email: session.customer_email })).id;
//   // const price = session.display_items[0].amount / 100;
//   // await BookingModel.create({ tour, user, price });
// };

// export const webhookCheckout = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // const signature = req.headers['stripe-signature'];
//   // let event;
//   // try {
//   //   event = stripe.webhooks.constructEvent(
//   //     req.body,
//   //     signature,
//   //     process.env.STRIPE_WEBHOOK_SECRET
//   //   );
//   // } catch (err) {
//   //   return res.status(400).send(`Webhook error: ${err.message}`);
//   // }
//   // if (event.type === 'checkout.session.completed')
//   //   createBookingCheckout(event.data.object);
//   // res.status(200).json({ received: true });
// };

// export const createBooking = createOne(BookingModel);
// export const getBooking = getOne(BookingModel, undefined);
// export const getAllBookings = getAll(BookingModel);
// export const updateBooking = updateOne(BookingModel);
// export const deleteBooking = deleteOne(BookingModel);
