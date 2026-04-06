export interface Product {
  id: string;
  model: string;
  storage: string;
  image: string; // base64 or URL
}

const STORAGE_KEY = "imperio-apple-products";

const defaultProducts: Product[] = [
  { id: "1", model: "iPhone 16 Pro Max", storage: "256GB", image: "" },
  { id: "2", model: "iPhone 16 Pro", storage: "128GB", image: "" },
  { id: "3", model: "iPhone 15 Pro Max", storage: "256GB", image: "" },
  { id: "4", model: "iPhone 15 Pro", storage: "128GB", image: "" },
  { id: "5", model: "iPhone 15", storage: "128GB", image: "" },
  { id: "6", model: "iPhone 14", storage: "128GB", image: "" },
];

export function getProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultProducts;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
