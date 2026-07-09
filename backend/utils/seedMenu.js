const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const MenuItem = require("../models/MenuItem");

// Load env vars from backend/.env
dotenv.config({ path: path.join(__dirname, "../.env") });

const dishes = [
  // THE BEGINNING
  {
    name: "Charcoal Grilled Broccoli",
    category: "The Beginning",
    description: "Smoked broccoli florets marinated in cardamom cream, cheese, and mace.",
    price: 280,
    spiceLevel: 1,
    image: "/images/menu/the beggening/charcoal grilled brocoli.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Crispy Truffle Samosa",
    category: "The Beginning",
    description: "Handmade pastry stuffed with spiced potato mash and premium black truffle oil.",
    price: 220,
    spiceLevel: 2,
    image: "/images/menu/the beggening/crispy truffule samosa.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Saffron Tomato Shorba",
    category: "The Beginning",
    description: "A rich roasted tomato soup infused with organic saffron strands and fresh mint.",
    price: 180,
    spiceLevel: 1,
    image: "/images/menu/the beggening/saffron tomatp shorba.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },

  // FROM THE SUBCONTINENT
  {
    name: "Avadh Jackfruit Biryani",
    category: "From the Subcontinent",
    description: "Fragrant basmati rice dum-cooked with layered spices and tender jackfruit.",
    price: 420,
    spiceLevel: 2,
    image: "/images/menu/from the subcontinent/avadh jackfruit biryani.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Dal Bukhara",
    category: "From the Subcontinent",
    description: "Our legendary black lentils, slow-cooked for 24 hours with butter and cream.",
    price: 320,
    spiceLevel: 2,
    image: "/images/menu/from the subcontinent/dal bukhara.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Royal Paneer Makhani",
    category: "From the Subcontinent",
    description: "Soft cottage cheese cubes cooked in a rich, velvety cashew nut and tomato gravy.",
    price: 380,
    spiceLevel: 2,
    image: "/images/menu/from the subcontinent/royal paneer makhani.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },

  // THE ITALIAN TABLE
  {
    name: "Heirloom Tomato Gnocchi",
    category: "The Italian Table",
    description: "Delicate hand-rolled potato dumplings in fresh basil and crushed tomato reduction.",
    price: 420,
    spiceLevel: 0,
    image: "/images/menu/the italian table/heirloom tomato gnocchi.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Pesto Wood Fired Pasta",
    category: "The Italian Table",
    description: "House pesto sauce, fresh buffalo mozzarella, cherry tomatoes, toasted pine nuts.",
    price: 380,
    spiceLevel: 0,
    image: "/images/menu/the italian table/pesto-wood-fired-pasta.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Wild Mushroom Penne",
    category: "The Italian Table",
    description: "Sauteed cremini and oyster mushrooms in a rich parmesan truffle cream sauce.",
    price: 360,
    spiceLevel: 0,
    image: "/images/menu/the italian table/wild mashroom penne.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },

  // GARDEN & GREENS
  {
    name: "Avocado Garden Crunch",
    category: "Garden & Greens",
    description: "Hand-mashed Hass avocado, green apple slices, sunflower seeds, lime leaf dressing.",
    price: 320,
    spiceLevel: 0,
    image: "/images/menu/garden and greens/avocardo garden crunch.png",
    badge: "New",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Burrata Fig Salad",
    category: "Garden & Greens",
    description: "Creamy burrata cheese served with fresh seasonal figs, wild rocket, and balsamic glaze.",
    price: 380,
    spiceLevel: 0,
    image: "/images/menu/garden and greens/burrata fig salad.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Saffron Quinoa Bowl",
    category: "Garden & Greens",
    description: "Toasted white quinoa, organic cucumbers, red radish, roasted chickpeas, tahini.",
    price: 300,
    spiceLevel: 1,
    image: "/images/menu/garden and greens/saffron quinoa bowl.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },

  // THE BREAD BASKET
  {
    name: "Garlic Coriander Roti",
    category: "The Bread Basket",
    description: "Whole wheat tandoori flatbread topped with toasted garlic flakes and fresh cilantro.",
    price: 80,
    spiceLevel: 0,
    image: "/images/menu/the bread basket/garlic coriander roti.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Saffron Pulao",
    category: "The Bread Basket",
    description: "Aromatic basmati rice steamed with saffron threads, roasted almonds, and raisins.",
    price: 220,
    spiceLevel: 1,
    image: "/images/menu/the bread basket/saffron pulao.png",
    badge: "Seasonal",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Truffle Butter Naan",
    category: "The Bread Basket",
    description: "Fresh clay-oven leavened flatbread brushed generously with black truffle butter.",
    price: 120,
    spiceLevel: 0,
    image: "/images/menu/the bread basket/truffle butter naan.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: false,
  },

  // SOMETHING SWEET
  {
    name: "Deconstructed Rasmalai",
    category: "Something Sweet",
    description: "Cottage cheese sponge disks soaked in saffron-infused milk, pistachio dust.",
    price: 280,
    spiceLevel: 0,
    image: "/images/menu/something sweet/deconstructed rasmalai.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Rose Petal Kulfi",
    category: "Something Sweet",
    description: "Traditional slow-churned Indian ice cream infused with organic rose petals.",
    price: 220,
    spiceLevel: 0,
    image: "/images/menu/something sweet/rose petal kulfi.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Warm Chocolate Fondant",
    category: "Something Sweet",
    description: "Molten center dark chocolate cake served with single-origin cardamom ice cream.",
    price: 320,
    spiceLevel: 0,
    image: "/images/menu/something sweet/warm chocolate foundant.png",
    badge: "New",
    isAvailable: true,
    isFeatured: false,
  },

  // THE GLASS
  {
    name: "Hibiscus Mint Mocktail",
    category: "The Glass",
    description: "Cold-pressed hibiscus infusion, fresh lime juice, mint leaves, sparkling soda.",
    price: 180,
    spiceLevel: 0,
    image: "/images/menu/the glass/hibiscus mint mocktail.png",
    badge: "Bestseller",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Kashmiri Khawa Tea",
    category: "The Glass",
    description: "Green tea leaves brewed with cinnamon, green cardamom, saffron, sliced almonds.",
    price: 120,
    spiceLevel: 1,
    image: "/images/menu/the glass/kashmiri khawa tea.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Saffron Cardamom Lassi",
    category: "The Glass",
    description: "Creamy sweet yogurt drink blended with saffron strands and green cardamom.",
    price: 150,
    spiceLevel: 0,
    image: "/images/menu/the glass/saffron cardamom lassi.png",
    badge: null,
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Truffle Mushroom Risotto",
    category: "Chef's Table",
    description: "A slow-cooked premium arborio rice with hand-picked wild forest mushrooms, finished with aged parmesan cheese shavings and white truffle oil drizzle.",
    price: 950,
    spiceLevel: 0,
    image: "/images/menu/the italian table/wild mashroom penne.png",
    badge: "Seasonal",
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Smoked Tandoori Avocado",
    category: "Chef's Table",
    description: "Whole Haas avocado light-charred in clay oven, stuffed with spicy cottage cheese crumbles and served over warm cashew cream gravy.",
    price: 890,
    spiceLevel: 1,
    image: "/images/smoked tandoori avacardo.png",
    badge: "Chef's Special",
    isAvailable: true,
    isFeatured: false,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/saffron";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for menu seeding...");

    // Clear existing
    await MenuItem.deleteMany({});
    console.log("Cleared existing MenuItems.");

    // Insert new
    await MenuItem.insertMany(dishes);
    console.log("Successfully seeded 21 Saffron menu items!");

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
