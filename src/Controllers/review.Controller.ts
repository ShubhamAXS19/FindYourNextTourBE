import { NextFunction } from "express";
import ReviewModel from "../Models/review.Model";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory";

export const setTourUserIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = getAll(ReviewModel);
export const getReview = getOne(ReviewModel);
export const createReview = createOne(ReviewModel);
export const updateReview = updateOne(ReviewModel);
export const deleteReview = deleteOne(ReviewModel);
