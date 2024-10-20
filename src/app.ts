import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tourRouter from "./Routes/tour.Route";
// import userRouter from "./Routes/user.Route";
// import reviewRouter from "./Routes/review.Route";
// import bookingRouter from "./Routes/booking.Route";
// import viewRouter from "./Routes/view.Route";
// import AWSrouter from "./Routes/testAWS";

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
async function connectToDb() {
  const dbUri = process.env.DB_URI as string;

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}
connectToDb();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);
app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Find Your Hike!!!!");
  console.log("Hello World!");
});
// app.use("/", viewRouter);
// app.use("/", AWSrouter);
app.use("/api/v1/tours", tourRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/bookings", bookingRouter);

// Global error handling for uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
//   console.error(err.name, err.message);
//   process.exit(1);
// });

// Start the server
const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App running on port ${port}...`);
});

// Global error handling for unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("UNHANDLED REJECTION! 💥 Shutting down...");
//   console.error(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// Graceful shutdown on SIGTERM
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM RECEIVED. Shutting down gracefully...");
//   server.close(() => {
//     console.log("💥 Process terminated!");
//   });
// });
