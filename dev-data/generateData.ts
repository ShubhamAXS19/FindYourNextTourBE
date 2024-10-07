// // Import faker using ES module syntax
// import { faker } from "@faker-js/faker";

// // Define interfaces to enforce type safety
// interface Location {
//   _id: string;
//   description: string;
//   type: string;
//   coordinates: [number, number];
//   day: number;
// }

// interface StartLocation {
//   description: string;
//   type: string;
//   coordinates: [number, number];
//   address: string;
// }

// interface Tour {
//   startLocation: StartLocation;
//   ratingsAverage: number;
//   ratingsQuantity: number;
//   images: string[];
//   startDates: string[];
//   _id: string;
//   name: string;
//   duration: number;
//   maxGroupSize: number;
//   difficulty: "easy" | "medium" | "difficult";
//   guides: string[];
//   price: number;
//   summary: string;
//   description: string;
//   imageCover: string;
//   locations: Location[];
// }

// // Function to generate random coordinates
// function randomCoordinates(): [number, number] {
//   return [faker.location.longitude(), faker.location.latitude()];
// }

// // Function to generate random guide IDs
// function generateGuideIds(count: number): string[] {
//   const guides: string[] = [];
//   for (let i = 0; i < count; i++) {
//     guides.push(faker.database.mongodbObjectId());
//   }
//   return guides;
// }

// // Generate a similar dataset to the provided one
// function generateTourData(): Tour {
//   return {
//     startLocation: {
//       description: `${faker.location.city()}, ${faker.location.country()}`,
//       type: "Point",
//       coordinates: randomCoordinates(),
//       address: faker.location.streetAddress(),
//     },
//     ratingsAverage: parseFloat(
//       faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)
//     ),
//     ratingsQuantity: faker.number.int({ min: 1, max: 100 }),
//     images: [faker.image.url(), faker.image.url(), faker.image.url()],
//     startDates: [
//       faker.date.anytime().toISOString(),
//       faker.date.anytime().toISOString(),
//       faker.date.anytime().toISOString(),
//     ],
//     _id: faker.database.mongodbObjectId(),
//     name: faker.commerce.productName(),
//     duration: faker.number.int({ min: 1, max: 10 }),
//     maxGroupSize: faker.number.int({ min: 5, max: 20 }),
//     difficulty: faker.helpers.arrayElement(["easy", "medium", "difficult"]),
//     guides: generateGuideIds(2),
//     price: faker.number.int({ min: 500, max: 3000 }),
//     summary: faker.lorem.sentence(),
//     description: faker.lorem.paragraphs(2),
//     imageCover: faker.image.url(),
//     locations: [
//       {
//         _id: faker.database.mongodbObjectId(),
//         description: faker.company.name(),
//         type: "Point",
//         coordinates: randomCoordinates(),
//         day: 1,
//       },
//       {
//         _id: faker.database.mongodbObjectId(),
//         description: faker.company.name(),
//         type: "Point",
//         coordinates: randomCoordinates(),
//         day: 3,
//       },
//       {
//         _id: faker.database.mongodbObjectId(),
//         description: faker.company.name(),
//         type: "Point",
//         coordinates: randomCoordinates(),
//         day: 5,
//       },
//     ],
//   };
// }

// // Generate an array of 20 tours
// const tourDataArray: Tour[] = Array.from({ length: 20 }, generateTourData);

// // Log the generated tour data
// console.log(JSON.stringify(tourDataArray, null, 2));
