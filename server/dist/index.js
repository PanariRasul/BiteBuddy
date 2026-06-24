"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "../public"));

    // All pricing details converted from Dollars to Indian Rupees (₹)
    const foodData = [
        {
            name: "Boiled Egg",
            price: 40,
            text: "A classic breakfast staple, packed with protein and flavor.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "Ramen",
            price: 180,
            text: "A delicious bowl of noodles, rich in umami and comfort.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "Grilled Chicken",
            price: 320,
            text: "Juicy and tender, perfectly seasoned for a satisfying dinner.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "Cake",
            price: 120,
            text: "Sweet and fluffy, a perfect treat for any time of day.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "Burger",
            price: 140,
            text: "A hearty burger stacked with fresh toppings and flavor.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "Pancake",
            price: 160,
            text: "Fluffy and golden, topped with syrup and berries for a sweet delight.",
            image: "/images/pancake.png",
            type: "dinner",
        },
        {
            name: "Oatmeal",
            price: 90,
            text: "Warm and wholesome, a perfect start to your day.",
            image: "/images/oatmeal.png",
            type: "breakfast",
        },
        {
            name: "Sushi",
            price: 450,
            text: "Fresh and flavorful, a delightful combination of rice and fish.",
            image: "/images/sushi.png",
            type: "lunch",
        },
        {
            name: "Steak",
            price: 850,
            text: "Rich and succulent, grilled to perfection for a hearty dinner.",
            image: "/images/steak.png",
            type: "dinner",
        },
        {
            name: "Fruit Salad",
            price: 110,
            text: "A refreshing mix of seasonal fruits, perfect for breakfast.",
            image: "/images/fruitsalad.png",
            type: "breakfast",
        },
        {
            name: "Taco",
            price: 130,
            text: "Spicy and savory, loaded with fillings for a satisfying lunch.",
            image: "/images/taco.png",
            type: "lunch",
        },
        {
            name: "Pasta Primavera",
            price: 260,
            text: "A colorful medley of vegetables and pasta, perfect for dinner.",
            image: "/images/pasta.png",
            type: "dinner",
        },
        {
            name: "Croissant",
            price: 70,
            text: "Buttery and flaky, the perfect pastry for breakfast.",
            image: "/images/croissant.png",
            type: "breakfast",
        },
        {
            name: "Quiche",
            price: 190,
            text: "Savory and rich, filled with eggs and cheese for a delightful lunch.",
            image: "/images/quiche.png",
            type: "lunch",
        },
        {
            name: "Seafood Paella",
            price: 650,
            text: "A vibrant dish packed with seafood and rice, perfect for dinner.",
            image: "/images/paella.png",
            type: "dinner",
        },
        {
            name: "Yogurt Parfait",
            price: 95,
            text: "Creamy yogurt layered with fruits and granola, a nutritious breakfast.",
            image: "/images/yogurt.png",
            type: "breakfast",
        },
        {
            name: "Grilled Cheese",
            price: 110,
            text: "A melty classic, perfect for a cozy lunch.",
            image: "/images/grilledcheese.png",
            type: "lunch",
        },
        {
            name: "Baked Salmon",
            price: 580,
            text: "Tender and flaky, seasoned to perfection for a delightful dinner.",
            image: "/images/salmon.png",
            type: "dinner",
        },
        {
            name: "Smoothie Bowl",
            price: 120,
            text: "A refreshing blend of fruits and greens, perfect for breakfast.",
            image: "/images/smoothiebowl.png",
            type: "breakfast",
        },
        {
            name: "Pulled Pork Sandwich",
            price: 240,
            text: "Savory pulled pork piled high on a bun for a satisfying lunch.",
            image: "/images/pulledpork.png",
            type: "lunch",
        },
        {
            name: "Vegetable Stir-fry",
            price: 180,
            text: "A colorful mix of vegetables, quick and healthy for dinner.",
            image: "/images/stirfry.png",
            type: "dinner",
        },
        {
            name: "Bagel with Cream Cheese",
            price: 85,
            text: "A classic breakfast choice, perfect with a hot cup of coffee.",
            image: "/images/bagel.png",
            type: "breakfast",
        },
        {
            name: "Chicken Caesar Salad",
            price: 210,
            text: "Crisp romaine topped with grilled chicken and Caesar dressing for lunch.",
            image: "/images/salad.png",
            type: "lunch",
        },
        {
            name: "Mushroom Risotto",
            price: 290,
            text: "Creamy risotto with earthy mushrooms, a comforting dinner option.",
            image: "/images/risotto.png",
            type: "dinner",
        },
        {
            name: "French Toast",
            price: 130,
            text: "Sweet and eggy, topped with syrup for a delightful breakfast.",
            image: "/images/frenchtoast.png",
            type: "breakfast",
        },
        {
            name: "Clam Chowder",
            price: 170,
            text: "Rich and creamy soup, a comforting choice for lunch.",
            image: "/images/chowder.png",
            type: "lunch",
        },
        {
            name: "Stuffed Bell Peppers",
            price: 220,
            text: "Colorful peppers filled with rice and meat, perfect for dinner.",
            image: "/images/stuffedpeppers.png",
            type: "dinner",
        },
        {
            name: "Chia Pudding",
            price: 95,
            text: "Nutritious and creamy, a perfect breakfast treat.",
            image: "/images/chia.png",
            type: "breakfast",
        },
        {
            name: "Philly Cheesesteak",
            price: 260,
            text: "Savory steak and melted cheese in a soft roll, a lunch favorite.",
            image: "/images/cheesesteak.png",
            type: "lunch",
        },
        {
            name: "Eggplant Parmesan",
            price: 240,
            text: "Layers of eggplant and cheese, a hearty vegetarian dinner.",
            image: "/images/eggplant.png",
            type: "dinner",
        },
        {
            name: "Breakfast Burrito",
            price: 140,
            text: "Packed with eggs and veggies, a satisfying start to your day.",
            image: "/images/burrito.png",
            type: "breakfast",
        },
        {
            name: "Caprese Salad",
            price: 160,
            text: "Fresh tomatoes and mozzarella drizzled with balsamic for lunch.",
            image: "/images/caprese.png",
            type: "lunch",
        },
        {
            name: "Lamb Chops",
            price: 790,
            text: "Tender lamb chops, grilled to perfection for an elegant dinner.",
            image: "/images/lamb.png",
            type: "dinner",
        },
        {
            name: "Overnight Oats",
            price: 90,
            text: "A quick and healthy breakfast option, ready when you are.",
            image: "/images/overnightoats.png",
            type: "breakfast",
        },
        {
            name: "Banh Mi",
            price: 150,
            text: "A Vietnamese sandwich with savory ingredients, a delicious lunch.",
            image: "/images/banhmi.png",
            type: "lunch",
        },
        {
            name: "Curry Chicken",
            price: 340,
            text: "A flavorful dish bursting with spices, perfect for dinner.",
            image: "/images/curry.png",
            type: "dinner",
        },
        {
            name: "Scones",
            price: 95,
            text: "Fluffy and buttery, ideal with tea for breakfast.",
            image: "/images/scones.png",
            type: "breakfast",
        },
        {
            name: "Fried Rice",
            price: 160,
            text: "A savory mix of rice and vegetables, a great lunch option.",
            image: "/images/friedrice.png",
            type: "lunch",
        },
        {
            name: "Vegetable Lasagna",
            price: 280,
            text: "Layers of pasta and vegetables, baked to cheesy perfection.",
            image: "/images/lasagna.png",
            type: "dinner",
        },
        {
            name: "Avocado Toast",
            price: 130,
            text: "Creamy avocado spread on toasted bread, a trendy breakfast choice.",
            image: "/images/avocado.png",
            type: "breakfast",
        },
        {
            name: "Nicoise Salad",
            price: 230,
            text: "A French salad with tuna and olives, perfect for a light lunch.",
            image: "/images/nicoise.png",
            type: "lunch",
        },
        {
            name: "BBQ Ribs",
            price: 690,
            text: "Tender and smoky, these ribs are a dinner highlight.",
            image: "/images/ribs.png",
            type: "dinner",
        },
        {
            name: "Granola Bars",
            price: 60,
            text: "Nutty and chewy, a healthy breakfast on the go.",
            image: "/images/granolabar.png",
            type: "breakfast",
        },
        {
            name: "Chicken Tenders",
            price: 170,
            text: "Crispy and tender, perfect for dipping at lunch.",
            image: "/images/tenders.png",
            type: "lunch",
        },
        {
            name: "Fish Tacos",
            price: 220,
            text: "Light and fresh, filled with grilled fish and veggies.",
            image: "/images/fishtaco.png",
            type: "dinner",
        }
    ];
    res.json(foodData);
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
//# sourceMappingURL=index.js.map