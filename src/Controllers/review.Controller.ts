// import ReviewModel from "../Models/review.Model";
// import {
//   getAll,
//   getOne,
//   createOne,
//   updateOne,
//   deleteOne,
// } from "./handlerFactory";

// import { Request, Response, NextFunction } from "express";

// // Extend the Request interface
// interface CustomRequest extends Request {
//   user?: {
//     id: string;
//     role?: string;
//   };
//   params: {
//     tourId: string;
//   };
//   body: {
//     tour?: string;
//     user?: string;
//   };
// }

// export const setTourUserIds = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Allow nested routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user?.id; // Safely access req.user
//   next();
// };

// export const getAllReviews = getAll(ReviewModel);
// export const getReview = getOne(ReviewModel, undefined);
// export const createReview = createOne(ReviewModel);
// export const updateReview = updateOne(ReviewModel);
// export const deleteReview = deleteOne(ReviewModel);
