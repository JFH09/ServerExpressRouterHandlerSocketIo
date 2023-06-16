import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import productsRoutes from "./routes/products.router.js";
//import cartsRoutes from "./routes/carts.router.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/api", cartsRoutes);
const httpServer = app.listen(8080, () => console.log("Listen on PORT 8080"));
//const server = app.listen(8080, () => console.log("Escuchando por 8080"));

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use("/home", productsRoutes);
app.use("/", viewsRouter);
//app.use("/home", productsRoutes);

socketServer.on("connection", (socket) => {
  //cuando escuche que una vista - cliente se conecte...
  console.log("Nuevo Cliente Conectado...");

  socket.on("message", (data) => {
    //Cuando el socket que se conecto envie una peticion con ID -> mensaje... (cliente - servidor)
    console.log(data);
  });

  socket.on("message1", (data) => {
    //Cuando el socket que se conecto envie una peticion con ID -> mensaje... (cliente - servidor)
    console.log(data);
  });
  //para enviar una peticion desde el servidor - cliente...
  socket.emit(
    "nombre_evento_socket_individual",
    "Este mensaje solo lo recibe el socket conectado..."
  );

  socket.emit("lista_productos", "Enviando una lista de productos...");
});
