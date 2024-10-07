import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Location {
  @prop({ required: true, default: "Point" })
  type!: string;

  @prop({ type: () => [Number], required: true })
  coordinates!: number[];

  @prop()
  address?: string;

  @prop()
  description?: string;

  @prop()
  day?: number;
}

export class Tour {
  @prop({ required: true, unique: true, trim: true })
  name!: string;

  @prop()
  slug?: string;

  @prop({ required: true })
  duration!: number;

  @prop({ required: true })
  maxGroupSize!: number;

  @prop({
    required: true,
    enum: ["easy", "medium", "difficult"],
    message: "Difficulty is either: easy, medium, difficult",
  })
  difficulty!: string;

  @prop({ default: 4.5, min: 1, max: 5 })
  ratingsAverage!: number;

  @prop({ default: 0 })
  ratingsQuantity!: number;

  @prop({ required: true })
  price!: number;

  @prop({
    validate: {
      validator: function (this: Tour, val: number) {
        return val < this.price;
      },
      message: "Discount price should be below regular price",
    },
  })
  priceDiscount?: number;

  @prop({ trim: true, required: true })
  summary!: string;

  @prop({ trim: true })
  description?: string;

  @prop({ required: true })
  imageCover!: string;

  @prop({ type: () => [String] })
  images?: string[];

  @prop({ default: Date.now(), select: false })
  createdAt!: Date;

  @prop({ type: () => [Date] })
  startDates?: Date[];

  @prop({ default: false })
  secretTour?: boolean;

  @prop({ _id: false })
  startLocation?: Location;

  @prop({ type: () => [Location], _id: false })
  locations?: Location[];

  @prop({ ref: () => User })
  guides!: Ref<User>[];

  // Define virtuals without conflicting with _id
  get durationWeeks(): number {
    return this.duration / 7;
  }
}

const TourModel = getModelForClass(Tour);

export default TourModel;
