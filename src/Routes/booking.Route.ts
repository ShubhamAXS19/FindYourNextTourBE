// import express from "express";

// import {
//   getCheckoutSession,
//   getAllBookings,
//   createBooking,
//   getBooking,
//   updateBooking,
//   deleteBooking,
// } from "../Controllers/booking.Controller";
// import { protect, restrictTo } from "../Controllers/auth.Controller";

// const router = express.Router();

// router.use(protect);
// router.get("/checkout-session/:tourId", getCheckoutSession);

// router.use(restrictTo("admin", "lead-guide"));

// router.route("/").get(getAllBookings).post(createBooking);

// router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);
// export default router;
