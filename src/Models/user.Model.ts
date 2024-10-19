import {
  prop,
  getModelForClass,
  pre,
  modelOptions,
  index,
} from "@typegoose/typegoose";
// import { IsEmail, MinLength } from "class-validator"; // Optional: for validation
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { nanoid } from "nanoid";

// Hash the password before saving
@pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // Remove confirm password field
  next();
})
// Set passwordChangedAt field when password is changed
@pre<User>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
})
@modelOptions({ schemaOptions: { timestamps: true } })
@index({ email: 1 }, { unique: true }) // Unique index for email
export class User {
  @prop({ required: [true, "User must have a name"] })
  public name!: string;

  @prop({
    required: [true, "User must have an email"],
    lowercase: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Basic email validation
      message: "Please provide a valid email",
    },
  })
  //   @IsEmail() // Optional: for validation
  public email!: string;

  @prop({ default: "default.jpg" })
  public photo?: string;

  @prop({ enum: ["user", "guide", "lead-guide", "admin"], default: "user" })
  public role?: string;

  @prop({ required: [true, "User must have a password"], select: false })
  //   @MinLength(8) // Optional: for validation
  public password!: string;

  @prop({
    required: [true, "User must confirm their password"],
    select: false,
    validate: {
      validator: function (this: User, value: string) {
        return value === this.password; // Custom validation to ensure passwords match
      },
      message: "Passwords are not the same!",
    },
  })
  public passwordConfirm!: string;

  @prop()
  public passwordChangedAt?: Date;

  @prop()
  public passwordResetToken?: string;

  @prop()
  public passwordResetExpires?: Date;

  @prop({ default: () => nanoid() })
  public verificationCode?: string;

  @prop({ default: false })
  public verified?: boolean;

  @prop({ default: true, select: false })
  public active?: boolean;

  // Methods
  public async correctPassword(candidatePassword: string): Promise<boolean> {
    if (!candidatePassword || !this.password) {
      return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  }

  public changedPasswordAfter(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = Math.floor(
        this.passwordChangedAt.getTime() / 1000
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false; // False means NOT changed
  }

  public createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes
    return resetToken;
  }
}

// Create UserModel
const UserModel = getModelForClass(User);
export default UserModel;
