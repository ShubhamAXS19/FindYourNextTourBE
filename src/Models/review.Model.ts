import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

import { User } from "./user.model";
import { Tour } from "./tour.Model";

export class Review {
  @prop({ required: [true, "Review must have a rating."] })
  public review!: string;

  @prop()
  rating: number;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({
    type: () => User,
    required: [true, "Review must belong to a user"],
  })
  public user!: Ref<User>;

  @prop({
    type: () => Tour,
    required: [true, "Review must belong to a tour"],
  })
  public tour!: Ref<Tour>;
}

const ReviewModel = getModelForClass(Review);
export default ReviewModel;
