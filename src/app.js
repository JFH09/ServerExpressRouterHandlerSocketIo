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

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use("/home", productsRoutes);
app.use("/", viewsRouter);
//app.use("/home", productsRoutes);
let listaProductos = [
  {
    title: "agua",
    description: "bebida",
    price: 2.66,
    thumbnail: "ruta2.png",
    code: "bebidas#543",
    stock: 33,
    id: 2,
  },
  {
    title: "papas",
    description: "paquetes",
    price: 888.2,
    thumbnail: "rutaPAPAS.png",
    code: "paquetes#788",
    stock: 333,
    id: 3,
  },
  {
    title: "jabon",
    description: "aseo",
    price: 80.9,
    thumbnail: "rutaJabon.png",
    code: "aseo#009",
    stock: 41,
    id: 5,
  },
  {
    title: "chocolatinas",
    description: "dulces",
    price: 2,
    thumbnail: "rutaChoco.png",
    code: "chocho#44",
    stock: 55,
    id: 11,
  },
  {
    title: "manzana",
    description: "fruta",
    price: 88.09,
    thumbnail: "rutaManzana.png",
    code: "frutas#111",
    stock: 54,
    id: 12,
  },
];
io.on("connection", (socket) => {
  //cuando escuche que una vista - cliente se conecte...
  console.log("Nuevo Cliente Conectado...");
  io.emit("listaProductos", listaProductos);

  socket.on("productoAgregado", (product) => {
    listaProductos.push(product);
    io.emit("listaProductos", listaProductos);
  });

  socket.on("eliminarProducto", (idEliminar) => {
    console.log("entro a eliminar");
    listaProductos = listaProductos.filter((e) => e.id != idEliminar);
    //console.log("entro a eliminar", listaProductos);
    io.emit("listaProductos", listaProductos);
  });

  socket.on("buscarProductoEdit", (idProduct) => {
    console.log("se va a editar -> ", idProduct);
    let productToEdit = listaProductos.find((e) => e.id == idProduct);
    //console.log(productToEdit);
    io.emit("productToEdit", productToEdit);
  });

  socket.on("productoEditado", (product) => {
    listaProductos;
    console.log("entro a producto editado...", product);
    //console.log(product.id);
    let posicion = listaProductos.findIndex((e) => e.id == product.id);
    // console.log(posicion);
    listaProductos[posicion] = product;
    //console.log("listaProductos .,,", listaProductos);
    io.emit("listaProductos", listaProductos);
  });
});
