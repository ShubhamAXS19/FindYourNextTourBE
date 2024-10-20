import { prop, getModelForClass, pre, Ref } from "@typegoose/typegoose";

import { User } from "./user.Model";
import { Tour } from "./tour.Model";

@pre<Booking>("find", function () {
  this.populate("user").populate({
    path: "tour",
    select: "name",
  });
})
export class Booking {
  @prop({
    type: () => Tour,
    required: [true, "Booking must belong to a Tour!"],
  })
  public tour!: Ref<Tour>;

  @prop({
    type: () => User,
    required: [true, "Booking must belong to a User!"],
  })
  public user!: Ref<User>;

  @prop({ required: [true, "Booking must have a price."] })
  public price!: number;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: true })
  public paid?: boolean;
}

const BookingModel = getModelForClass(Booking);
export default BookingModel;
