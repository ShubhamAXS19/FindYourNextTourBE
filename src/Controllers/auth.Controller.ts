// import { Request, Response, NextFunction } from "express";
// import catchAsync from "../Utils/catchAsync";
// import AppError from "../Utils/appError";
// import jwt from "jsonwebtoken";
// import { IUser } from "../Types/User";
// import UserModel from "../Models/user.Model";
// import { sendEmailSES } from "../Utils/mailer";
// import crypto from "crypto";

// export const protect = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     //   // 1) Getting token and check of it's there
//     // let token;
//     // if (
//     //   req.headers.authorization &&
//     //   req.headers.authorization.startsWith("Bearer")
//     // ) {
//     //   token = req.headers.authorization.split(" ")[1];
//     // } else if (req.cookies.jwt) {
//     //   token = req.cookies.jwt;
//     // }
//     // if (!token) {
//     //   return next(
//     //     new AppError("You are not logged in! Please log in to get access.", 401)
//     //   );
//     // }
//     // // 2) Verification token
//     // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     // // 3) Check if user still exists
//     // const currentUser = await UserModel.findById(decoded.id);
//     // if (!currentUser) {
//     //   return next(
//     //     new AppError(
//     //       "The user belonging to this token does no longer exist.",
//     //       401
//     //     )
//     //   );
//     // }
//     // // 4) Check if user changed password after the token was issued
//     // if (currentUser.changedPasswordAfter(decoded.iat)) {
//     //   return next(
//     //     new AppError(
//     //       "User recently changed password! Please log in again.",
//     //       401
//     //     )
//     //   );
//     // }
//     // // GRANT ACCESS TO PROTECTED ROUTE
//     // req.user = currentUser;
//     // res.locals.user = currentUser;
//     // console.log("User is logged in");
//     // next();
//   }
// );

// const signToken = (id: string) => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined");
//   }
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (
//   user: IUser,
//   statusCode: number,
//   req: Request,
//   res: Response
// ) => {
//   const token = signToken(user._id); // Using user.id instead of _id

//   const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN
//     ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN)
//     : 90; // Default value if not set

//   res.cookie("jwt", token, {
//     expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: req.secure || req.headers["x-forwarded-proto"] === "https",
//   });

//   // Remove password from output
//   const userObject = user.toObject();

//   res.status(statusCode).json({
//     mgs: "User successfully created",
//     token,
//     data: {
//       user: userObject,
//       userId: user._id,
//     },
//   });
// };

// export const restrictTo = () => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // roles ['admin', 'lead-guide']. role='user'
//     // if (!roles.includes(req.user.role)) {
//     //   return next(
//     //     new AppError("You do not have permission to perform this action", 403)
//     //   );
//     // }

//     next();
//   };
// };

// export const signup = catchAsync(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { name, email, password, passwordConfirm, role } = req.body;

//     const newUser = await UserModel.create({
//       name,
//       email,
//       password,
//       passwordConfirm,
//       role: role || "user",
//     });

//     try {
//       await sendEmailSES({
//         to: newUser.email,
//         subject: "Verify your email",
//         text: `Verification code: ${newUser.verificationCode}. ID: ${newUser._id}`,
//         from: {
//           name: "Find Your Next Hike",
//           address: process.env.SES_FROM_EMAIL as string,
//         },
//       });

//       // Call the function to create and send the token without returning it
//       const userObject = newUser.toObject(); // Convert to plain object
//       createSendToken(userObject, 201, req, res);
//     } catch (error: any) {
//       // For other errors, pass to the error handling middleware
//       return next(
//         new AppError("An error occurred during signup. Please try again.", 500)
//       );
//     }
//   }
// );

// export const verifyUser = async (req: Request, res: Response) => {
//   const { userId, verificationCode } = req.params;
//   console.log(req.params);
//   try {
//     // find user by id
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     if (user.verified) {
//       return res.status(400).send("User already verified");
//     }
//     // check if the verification code is correct
//     if (user.verificationCode === verificationCode) {
//       user.verified = true;
//       await user.save();
//       return res.send("User successfully verified");
//     }
//     return res.status(400).json({ msg: "Invalid verification code" });
//   } catch (e: any) {
//     return res.status(400).send(e);
//   }
// };

// export const login = catchAsync(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { email, password } = req.body;

//     // 1) Check if email and password exist
//     if (!email || !password) {
//       return next(new AppError("Please provide email and password!", 400));
//     }
//     // 2) Check if user exists && password is correct
//     const user = await UserModel.findOne({ email }).select("+password");

//     if (!user || !(await user.correctPassword(password))) {
//       return next(new AppError("Incorrect email or password", 401));
//     }

//     if (!user.verified) {
//       return next(
//         new AppError("Please verify your email before logging in", 403)
//       );
//     }

//     // 3) If everything ok, send token to client
//     const userObject = user.toObject(); // Convert to plain object
//     createSendToken(userObject, 201, req, res);
//   }
// );

// export const logout = (req: Request, res: Response) => {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };
// export const forgotPassword = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // // 1) Get user based on POSTed email
//     const user = await UserModel.findOne({ email: req.body.email });
//     if (!user) {
//       return next(new AppError("There is no user with email address.", 404));
//     }
//     // 2) Generate the random reset token
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });
//     // 3) Send it to user's email
//     try {
//       const resetURL = `${req.protocol}://${req.get(
//         "host"
//       )}/api/v1/users/resetPassword/${resetToken}`;
//       // await new Email(user, resetURL).sendPasswordReset();
//       res.status(200).json({
//         status: "success",
//         message: "Token sent to email!",
//       });
//     } catch (err) {
//       user.passwordResetToken = undefined;
//       user.passwordResetExpires = undefined;
//       await user.save({ validateBeforeSave: false });
//       return next(
//         new AppError(
//           "There was an error sending the email. Try again later!",
//           500
//         )
//       );
//     }
//   }
// );

// export const resetPassword = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // 1) Get user based on the token
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await UserModel.findOne({
//       passwordResetToken: hashedToken,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     // 2) If token has not expired, and there is user, set the new password
//     if (!user) {
//       return next(new AppError("Token is invalid or has expired", 400));
//     }
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // 3) Update changedPasswordAt property for the user
//     // 4) Log the user in, send JWT
//     createSendToken(user, 200, req, res);
//   }
// );

// export const updatePassword = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // 1) Get user from collection
//     const user = await UserModel.findById(req.user.id).select("+password");

//     // 2) Check if POSTed current password is correct
//     if (!user) {
//       return next(new AppError("User not found.", 404));
//     }

//     console.log("User found:", user); // Log the user to debug

//     // 2) Check if POSTed current password is correct
//     if (!(await user.correctPassword(req.body.passwordCurrent))) {
//       return next(new AppError("Your current password is wrong.", 401));
//     }

//     // 3) If so, update password
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     await user.save();
//     // User.findByIdAndUpdate will NOT work as intended!

//     // 4) Log user in, send JWT
//     createSendToken(user, 200, req, res);
//   }
// );

// export const isLoggedIn = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // if (req.cookies.jwt) {
//   //   try {
//   //     // 1) verify token
//   //     const decoded = await promisify(jwt.verify)(
//   //       req.cookies.jwt,
//   //       process.env.JWT_SECRET
//   //     );

//   //     // 2) Check if user still exists
//   //     const currentUser = await UserModel.findById(decoded.id);
//   //     if (!currentUser) {
//   //       return next();
//   //     }

//   //     // 3) Check if user changed password after the token was issued
//   //     if (currentUser.changedPasswordAfter(decoded.iat)) {
//   //       return next();
//   //     }

//   //     // THERE IS A LOGGED IN USER
//   //     res.locals.user = currentUser;
//   //     return next();
//   //   } catch (err) {
//   //     return next();
//   //   }
//   // }
//   next();
// };

// export const uploadTourImages = () => {};
// export const resizeTourImages = () => {};
