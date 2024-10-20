import express from "express";
import {
  aliasTopTours,
  getAllTours,
  getTourStats,
  getToursWithin,
  getDistances,
  // createTour,
  getTourByName,
  // updateTour,
  // deleteTour,
} from "../Controllers/tour.Controller";
// import {
//   protect,
//   restrictTo,
//   uploadTourImages,
//   resizeTourImages,
// } from "../Controllers/auth.Controller";
// import reviewRouter from "./review.Route";

const router = express.Router();

// router.param("id", checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

// router.use("/:tourId/reviews", reviewRouter);

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year");
// .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route("/distances/:latlng/unit/:unit").get(getDistances);

router.route("/").get(getAllTours); //tested
// .post(protect, restrictTo("admin", "lead-guide"), createTour);

router.route("/:id").get(getTourByName); // tested
// .patch(
//   protect,
//   restrictTo("admin", "lead-guide"),
//   uploadTourImages,
//   resizeTourImages,
//   updateTour
// )
// .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

export default router;
