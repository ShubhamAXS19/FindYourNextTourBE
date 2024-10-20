// import express from "express";
// import { protect, restrictTo } from "./../Controllers/auth.Controller";
// import {
//   getAllReviews,
//   setTourUserIds,
//   createReview,
//   getReview,
//   updateReview,
//   deleteReview,
// } from "./../Controllers/review.Controller";

// const router = express.Router({ mergeParams: true });

// router.use(protect);

// router
//   .route("/")
//   .get(getAllReviews)
//   .post(restrictTo("user"), setTourUserIds, createReview);

// router
//   .route("/:id")
//   .get(getReview)
//   .patch(restrictTo("user", "admin"), updateReview)
//   .delete(restrictTo("user", "admin"), deleteReview);

// export default router;
