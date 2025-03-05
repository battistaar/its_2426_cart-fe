import { CartItem } from "../services/cart-item.entity";

export const cart: CartItem[] = [
  {
    id: "1",
    product: {
      description: 'test',
      name: 'ssd',
      netPrice: 95,
      weight: 100,
      discount: 5,
      id: 'p1'
    },
    quantity: 2
  },
  {
    id: "2",
    product: {
      description: 'test',
      name: 'motherboard',
      netPrice: 270,
      weight: 900,
      discount: 0,
      id: 'p2'
    },
    quantity: 1
  },
  {
    id: "3",
    product: {
      description: 'test',
      id: 'p3',
      name: 'ram',
      netPrice: 120,
      weight: 60,
      discount: 10,
    },
    quantity: 2
  },
  {
    id: "4",
    product: {
      description: 'test',
      id: 'p4',
      name: 'processor',
      netPrice: 400,
      weight: 130,
      discount: 0,
    },
    quantity: 1
  },
  {
    id: "5",
    product: {
      description: 'test',
      id: 'p5',
      name: 'power supply',
      netPrice: 130,
      weight: 1400,
      discount: 15,
    },
    quantity: 1
  },
  {
    id: "6",
    product: {
      description: 'test',
      id: 'p6',
      name: 'cpu cooler',
      netPrice: 170,
      weight: 1000,
      discount: 23,
    },
    quantity:1
  },
  {
    id: "7",
    product: {
      description: 'test',
      id: 'p7',
      name: 'gpu',
      netPrice: 1600,
      weight: 2500,
      discount: 0,
    },
    quantity: 1
  },
  {
    id: "8",
    product: {
      description: 'test',
      id: 'p8',
      name: 'case',
      netPrice: 130,
      weight: 3500,
      discount: 30,
    },
    quantity: 1
  }
];
