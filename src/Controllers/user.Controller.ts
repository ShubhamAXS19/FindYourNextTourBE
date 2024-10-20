// import UserModel from "../Models/user.Model";
// import catchAsync from "../Utils/catchAsync";
// // import AppError from "../Utils/appError";
// import { Request, Response, NextFunction } from "express";
// import { getAll, getOne, updateOne, deleteOne } from "./handlerFactory";

// // // Define a generic function to filter object fields
// // const filterObj = <T extends object>(
// //   obj: T,
// //   ...allowedFields: (keyof T)[]
// // ): Partial<T> => {
// //   const newObj: Partial<T> = {}; // Initialize a new object

// //   // Iterate over the keys of the original object
// //   Object.keys(obj).forEach((el) => {
// //     if (allowedFields.includes(el as keyof T)) {
// //       newObj[el as keyof T] = obj[el as keyof T]; // Add allowed fields to newObj
// //     }
// //   });

// //   return newObj; // Return the filtered object
// // };

// export const getMe = (req: Request, res: Response, next: NextFunction) => {
//   //   req.params.id = req.user?.id;
//   //   next();
// };

// export const updateMe = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     //     // 1) Create error if user POSTs password data
//     //     if (req.body.password || req.body.passwordConfirm) {
//     //       return next(
//     //         new AppError(
//     //           "This route is not for password updates. Please use /updateMyPassword.",
//     //           400
//     //         )
//     //       );
//     //     }
//     //     // 2) Filtered out unwanted fields names that are not allowed to be updated
//     //     const filteredBody = filterObj(req.body, "name", "email");
//     //     if (req.file) filteredBody.photo = req.file.filename;
//     //     // 3) Update user document
//     //     const updatedUser = await UserModel.findByIdAndUpdate(
//     //       req.user.id,
//     //       filteredBody,
//     //       {
//     //         new: true,
//     //         runValidators: true,
//     //       }
//     //     );
//     //     res.status(200).json({
//     //       status: "success",
//     //       data: {
//     //         user: updatedUser,
//     //       },
//     //     });
//   }
// );

// export const deleteMe = catchAsync(async (req: Request, res: Response) => {
//   // await UserModel.findByIdAndUpdate(req.user.id, { active: false });
//   // res.status(204).json({
//   //   status: "success",
//   //   data: null,
//   // });
// });

// export const createUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: "error",
//     message: "This route is not defined! Please use /signup instead",
//   });
// };

// export const getAllUsers = getAll(UserModel);
// export const getUser = getOne(UserModel, undefined);
// export const updateUser = updateOne(UserModel);
// export const deleteUser = deleteOne(UserModel);
// export const uploadUserPhoto = () => {};
// export const resizeUserPhoto = () => {};
