const DealsList = [
  {
    id: 1,
    title: "Dawlence Chrome Fridge",
    category: "Electronics",
    name: "Fridge",

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
    name: "Fridge",
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
    category: "Phones",
    name: "Phone",
    title: "Samsung S23",
    description: "Samsung S23 (12GB, 256GB)",
    features: ["12GB", "Blue Color", "3-year warranty,"],
    price: 170000,
    discount: "5%",
    images: [require("../assets/Deals/phone.png")],
    extra: [
      {
        Color: ["blue", "green", "black"],
      },
      {
        Ram: ["8GB", "12GB"],
      },
    ],
    sold: 15,
  },
  {
    id: 4,
    categories: "Phones",
    name: "Phone",
    title: "Redmi 13C",
    description: "Redmi 13C (4GB, 64GB)",
    features: ["4GB", "White Color", "50MP Camera"],
    price: 80000,
    discount: "18%",
    images: [require("../assets/Deals/phone2.png")],
    extra: [
      {
        Ram: ["4GB", "6GB"],
      },
    ],
    sold: 20,
  },
  {
    id: 5,
    category: "Furniture",
    name: "Sofa",
    title: "Velvet Sofa",
    description: "Velvet Sofa (6 Seater)",
    features: ["Velvet Material", "Sky Blue", "6 Seater"],
    price: 85000,
    discount: "18%",
    images: [require("../assets/Deals/sofa.png")],
    extra: [],
    sold: 25,
  },
  {
    id: 6,
    category: "Electronics",
    name: "Washing Machine",
    title: "Samsung Washing Machine",
    description: "Samsung Washing Machine (10KG)",
    features: ["10KG", "White Color", "3-year warranty"],
    price: 65000,
    discount: "10%",
    images: [require("../assets/Deals/washing.png")],
    extra: [
      {
        Color: ["red", "white", "black"],
      },
      {
        Capacity: ["10KG", "14KG"],
      },
    ],
    sold: 0,
  },
];

export default DealsList;
