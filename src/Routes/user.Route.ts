// import express from "express";
// import {
//   signup,
//   login,
//   logout,
//   forgotPassword,
//   resetPassword,
//   protect,
//   updatePassword,
//   restrictTo,
//   verifyUser,
// } from "../Controllers/auth.Controller";
// import {
//   getMe,
//   getUser,
//   uploadUserPhoto,
//   resizeUserPhoto,
//   updateMe,
//   deleteMe,
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "../Controllers/user.Controller";

// const router = express.Router();

// router.post("/signup", signup); //tested
// router.post("/login", login); //tested
// router.get("/logout", logout); //tested
// router.post("/verifyEmail/:userId/:verificationCode", verifyUser); //tested
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:token", resetPassword);

// // Protect all routes after this middleware
// router.use(protect);

// router.patch("/updateMyPassword", updatePassword); //tested
// router.get("/me", getMe, getUser); //tested
// router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
// router.delete("/deleteMe", deleteMe);

// router.use(restrictTo("admin"));

// router.route("/").get(getAllUsers).post(createUser); //tested

// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// export default router;
