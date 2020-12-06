import {searchFilter} from "./searchFilter";

let array = [
    {
        address: {streetAddress: "5361 At Ave", city: "Chicago", state: "OK", zip: "43512"},
        description: "magna sum elit tortor quis molestie aenean pulvinar id nec aliquam elementum",
        email: "CRochester@sollicitudin.net",
        firstName: "Augustine",
        id: 319,
        keyId: "Py53UXlNsCA3r7eX657oM",
        lastName: "Knight",
        phone: "(412)370-9518",
    },
    {
        address: {streetAddress: "751 Eget Dr", city: "Mineral Bluff", state: "TX", zip: "87107"},
        description: "magna cat eget porta malesuada egestas tempor placerat porta eros aliquam",
        email: "LOlson@pulvinar.com",
        firstName: "Noor",
        id: 427,
        keyId: "8W2qWdwVLaFGK7QJGbA7F",
        lastName: "Ray",
        phone: "(911)602-6353",
    },
    {
        address: {streetAddress: "9918 Orci Dr", city: "Wasington Dc", state: "VA", zip: "64673"},
        description: "v soluam facilisis quis pulvinar magna porta dui eros sit rutrum id rutrum sapien",
        email: "MCummings@sit.org",
        firstName: "Rachmat",
        id: 389,
        keyId: "C4vOw4LLjnALaiP0AtSZV",
        lastName: "Barowsky",
        phone: "(366)189-7346"
    },
    {
        address: {streetAddress: "1511 Consequat Ct", city: "Stony Point", state: "WA", zip: "10130"},
        description: "vitae placerat pendisse vitae dolor molestie mi lacus orci sollicitudin quis odio",
        email: "ETuttle@non.org",
        firstName: "Joanne",
        id: 11,
        keyId: "Xz23p5Lqy0cxzRq2EMmhx",
        lastName: "Doll",
        phone: "(273)942-6417",
    }
];

let filterArray1 = [
    {
        address: {streetAddress: "5361 At Ave", city: "Chicago", state: "OK", zip: "43512"},
        description: "magna sum elit tortor quis molestie aenean pulvinar id nec aliquam elementum",
        email: "CRochester@sollicitudin.net",
        firstName: "Augustine",
        id: 319,
        keyId: "Py53UXlNsCA3r7eX657oM",
        lastName: "Knight",
        phone: "(412)370-9518",
    }
];

let filterArray2 = [
    {
        address: {streetAddress: "751 Eget Dr", city: "Mineral Bluff", state: "TX", zip: "87107"},
        description: "magna cat eget porta malesuada egestas tempor placerat porta eros aliquam",
        email: "LOlson@pulvinar.com",
        firstName: "Noor",
        id: 427,
        keyId: "8W2qWdwVLaFGK7QJGbA7F",
        lastName: "Ray",
        phone: "(911)602-6353",
    },
    {
        address: {streetAddress: "1511 Consequat Ct", city: "Stony Point", state: "WA", zip: "10130"},
        description: "vitae placerat pendisse vitae dolor molestie mi lacus orci sollicitudin quis odio",
        email: "ETuttle@non.org",
        firstName: "Joanne",
        id: 11,
        keyId: "Xz23p5Lqy0cxzRq2EMmhx",
        lastName: "Doll",
        phone: "(273)942-6417",
    }
];

test('search "" in []', () => {
    expect(searchFilter([], '' )).toEqual([]);
});

test('search "319" in array', () => {
    expect(searchFilter(array, '319' )).toEqual(filterArray1);
});

test('search "vit" in array', () => {
    expect(searchFilter(array, 'no' )).toEqual(filterArray2);
});

