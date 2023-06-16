import express from "express";
import ProductManager from "../clases/ProductManager.js";

const router = express.Router();
const rutaDatos = "./src/clases/files/products.json";
const productManager = new ProductManager(rutaDatos);

router.get("/products", async (req, resp) => {
  const limite = req.query.limit;
  if (limite != null) {
    const productos = await productManager.getProducts();
    let respuesta;
    if (limite > productos.length || limite < 0) {
      respuesta = "Ingrese un limite de productos valido";
    } else {
      productos.length = limite;
      respuesta = productos;
    }
    resp.render("home", { productos });
  } else {
    const productos = await productManager.getProducts();
    console.log(productos);
    resp.render("home", { productos });
  }
});

router.get("/products/:idProducto", async (req, resp) => {
  let idProducto = req.params.idProducto;
  console.log("entro..", req.params);
  let productos = await productManager.getProductById(idProducto);
  console.log(productos);
  resp.render("home", { productos });
});

router.get("/realtimeproducts", async (req, resp) => {
  const productos = await productManager.getProducts();
  console.log(productos);
  resp.render("realTimeProducts", { productos });
});

export default router;
