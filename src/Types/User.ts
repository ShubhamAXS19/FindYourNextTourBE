import { DocumentType, BeAnObject } from "@typegoose/typegoose/lib/types";
import { Document } from "mongoose";
import { User } from "../Models/user.Model";

export interface IUser
  extends Document<any, BeAnObject, User>,
    DocumentType<User> {
  _id: any;
  name: string;
  email: string;
  photo?: string;
  role?: "user" | "guide" | "lead-guide" | "admin";
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  verificationCode?: string;
  verified?: boolean;
  active?: boolean;

  // Methods
  correctPassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}
