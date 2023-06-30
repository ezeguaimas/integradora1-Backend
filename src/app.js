import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./routes/productRouterDB.js";
import productRouterFS from "./routes/productRouterFS.js";
import cartRouter from "./routes/cartRouterDB.js";
import cartRouterFS from "./routes/cartRouterFS.js";
import viewsRouter from "./routes/viewsRouterDB.js";
import viewsRouterFS from "./routes/viewsRouterFS.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import MONGO from "./utils/mongoDBConfig.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8080;
const MONGO_local = "mongodb://localhost:27017/ecommerce";

// Iniciar el servidor
const httpServer = app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

const connection = mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/fs/products", productRouterFS);

app.use("/api/carts", cartRouter);
app.use("/api/fs/carts", cartRouterFS);

app.use("/", viewsRouter);
app.use("/fs", viewsRouterFS);

const messages = [];
httpServer.on("connection", (socket) => {
  console.log("Nueva conexión websocket");

  socket.on("updatedProducts", (products) => {
    io.emit("updatedProducts", products);
  });

  socket.on('message', data => {
    messages.push(data);
    io.emit('messageLogs', messages);
})

socket.on('authenticated', data => {
    socket.broadcast.emit('newUserConnected', data);
})

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

});

