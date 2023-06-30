import { io } from "../app.js";
import productManager from "../dao/managers/productManagerDB.js";

export async function updatedProducts() {
  const products = await productManager.getProducts().lean();
  io.emit("updatedProducts", products);
}

export default { updatedProducts };