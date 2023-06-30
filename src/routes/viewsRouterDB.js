import Router from "express";
import productsModel from "../dao/models/products.js";
import { io } from "../app.js";
const router = Router();

router.get("/", async (req, res) => {
  const products = await productsModel.find().lean();
  console.log(`Views Router ${products}`);
  res.render("home", {
    title: "E-Commerce Random",
    products : products,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsModel.find().lean();
  res.render("realTimeProducts", {
    title: "E-Commerce Random",
    products: products,
  });
  io.emit("updatedProducts", products);
});


router.get("/chat", async (req, res) => {
  const messages = await productsModel.find().lean();
  res.render("chat", {
    title: "Chat",
    style: "/styles/chat.css",
    script: "/js/chat.js",
  });
})

// router.get('/chat', (req, res) => {
//   res.render('chat');
// })



export default router;
