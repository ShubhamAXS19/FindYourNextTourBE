import { NextFunction } from "express";
import ReviewModel from "../Models/review.Model";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory";

exports.setTourUserIds = (req: Request, res: Response, next: NextFunction) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = getAll(ReviewModel);
exports.getReview = getOne(ReviewModel);
exports.createReview = createOne(ReviewModel);
exports.updateReview = updateOne(ReviewModel);
exports.deleteReview = deleteOne(ReviewModel);
