const Products = [
  {
    id: 1,
    category: "Electronics",
    name: "Fridges",
    title: "Dawlence Chrome Fridge",
    description: "Dawlence Chrome Series Fridge.",
    features: ["Invertor", "Glass Door", "3-year warranty"],
    price: 50000,
    discount: "10%",
    images: [require("../assets/Deals/fridge1.png")],
    extra: [
      {
        Color: ["blue", "green", "black"],
      },
      {
        Size: ["small", "medium", "large"],
      },
    ],
    sold: 5,
  },
  {
    id: 2,
    category: "Electronics",
    name: "Fridges",
    title: "Dawlence Avante+ Fridge",
    description: "Dawlence Avante+ Series Fridge.",
    features: ["Invertor", "Glass Door", "3-year warranty,"],
    price: 150000,
    discount: "15%",
    images: [require("../assets/Deals/fridge2.png")],
    extra: [
      {
        Colors: ["blue", "green", "black"],
      },
      {
        Size: ["small", "medium", "large"],
      },
    ],
    sold: 10,
  },
  {
    id: 3,
    category: "Phones & Accessories",
    name: "Mobile Phones",
    title: "Samsung S23",
    description: "Samsung S23 (12GB, 256GB)",
    features: ["12GB", "Blue Color", "3-year warranty,"],
    price: 170000,
    discount: "",
    images: [require("../assets/Deals/phone.png")],
    sold: 15,
    extra: [
      {
        Color: ["blue", "green", "black"],
      },
      {
        Ram: ["8GB", "12GB"],
      },
    ],
  },
  {
    id: 4,
    category: "Phones & Accessories",
    name: "Mobile Phones",
    title: "Redmi 13C",
    description: "Redmi 13C (4GB, 64GB)",
    features: ["4GB", "White Color", "50MP Camera"],
    price: 80000,
    discount: "15%",
    images: [require("../assets/Deals/phone2.png")],
    sold: 20,
    extra: [
      {
        Ram: ["4GB", "6GB"],
      },
    ],
  },
  {
    id: 5,
    category: "Furniture",
    name: "Sofa, Bed & Tables",
    title: "Velvet Sofa",
    description: "Velvet Sofa (6 Seater)",
    features: ["Velvet Material", "Sky Blue", "6 Seater"],
    price: 85000,
    discount: "10%",
    images: [require("../assets/Deals/sofa.png")],
    sold: 25,
    extra: [],
  },
  {
    id: 6,
    category: "Electronics",
    name: "Washing Machines",
    title: "Samsung Washing Machine",
    description: "Samsung Washing Machine (10KG)",
    features: ["10KG", "White Color", "3-year warranty"],
    price: 65000,
    discount: "",
    images: [require("../assets/Deals/washing.png")],
    sold: 0,
    extra: [
      {
        Color: ["red", "white", "black"],
      },
      {
        Capacity: ["10KG", "14KG"],
      },
    ],
  },
  {
    id: 7,
    category: "Phones & Accessories",
    name: "Mobile Accessories",
    title: "AKG Handfrees",
    description:
      "AKG Earphones. Original AKG Earphones. Handsfree with Top Base",
    features: ["3.5mm Jack", "Black Color", "2-months warranty,"],
    price: 500,
    discount: "",
    images: [require("../assets/Deals/handfree.png")],
    sold: 25,
    extra: [
      {
        Color: ["white", "black"],
      },
    ],
  },
  {
    id: 8,
    category: "Phones & Accessories",
    name: "Mobile Accessories",
    title: "Sony Wireless HeadPhones",
    description:
      "Sony Wireless HeadPhones. Original Sony HeadPhones. Long lasting battery",
    features: ["Wireless", "Multiple Colors", "2-year warranty,"],
    price: 30000,
    discount: "",
    images: [require("../assets/Deals/headphones.png")],
    sold: 60,
    extra: [
      {
        Color: ["blue", "white", "black"],
      },
    ],
  },
];

export default Products;
