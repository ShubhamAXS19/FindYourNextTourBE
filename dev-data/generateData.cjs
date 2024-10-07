"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import faker using ES module syntax
var faker_1 = require("@faker-js/faker");
// Function to generate random coordinates
function randomCoordinates() {
    return [faker_1.faker.location.longitude(), faker_1.faker.location.latitude()];
}
// Function to generate random guide IDs
function generateGuideIds(count) {
    var guides = [];
    for (var i = 0; i < count; i++) {
        guides.push(faker_1.faker.database.mongodbObjectId());
    }
    return guides;
}
// Generate a similar dataset to the provided one
function generateTourData() {
    return {
        startLocation: {
            description: "".concat(faker_1.faker.location.city(), ", ").concat(faker_1.faker.location.country()),
            type: "Point",
            coordinates: randomCoordinates(),
            address: faker_1.faker.location.streetAddress(),
        },
        ratingsAverage: parseFloat(faker_1.faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
        ratingsQuantity: faker_1.faker.number.int({ min: 1, max: 100 }),
        images: [faker_1.faker.image.url(), faker_1.faker.image.url(), faker_1.faker.image.url()],
        startDates: [
            faker_1.faker.date.anytime().toISOString(),
            faker_1.faker.date.anytime().toISOString(),
            faker_1.faker.date.anytime().toISOString(),
        ],
        _id: faker_1.faker.database.mongodbObjectId(),
        name: faker_1.faker.commerce.productName(),
        duration: faker_1.faker.number.int({ min: 1, max: 10 }),
        maxGroupSize: faker_1.faker.number.int({ min: 5, max: 20 }),
        difficulty: faker_1.faker.helpers.arrayElement(["easy", "medium", "difficult"]),
        guides: generateGuideIds(2),
        price: faker_1.faker.number.int({ min: 500, max: 3000 }),
        summary: faker_1.faker.lorem.sentence(),
        description: faker_1.faker.lorem.paragraphs(2),
        imageCover: faker_1.faker.image.url(),
        locations: [
            {
                _id: faker_1.faker.database.mongodbObjectId(),
                description: faker_1.faker.company.name(),
                type: "Point",
                coordinates: randomCoordinates(),
                day: 1,
            },
            {
                _id: faker_1.faker.database.mongodbObjectId(),
                description: faker_1.faker.company.name(),
                type: "Point",
                coordinates: randomCoordinates(),
                day: 3,
            },
            {
                _id: faker_1.faker.database.mongodbObjectId(),
                description: faker_1.faker.company.name(),
                type: "Point",
                coordinates: randomCoordinates(),
                day: 5,
            },
        ],
    };
}
// Generate an array of 20 tours
var tourDataArray = Array.from({ length: 20 }, generateTourData);
// Log the generated tour data
console.log(JSON.stringify(tourDataArray, null, 2));
