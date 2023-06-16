import express from "express";

const router = express.Router();

let food = [
  { name: "Hamburguesas", price: "100" },
  { name: "Pizza", price: "22" },
  { name: "Banana", price: "600" },
  { name: "Ensalada", price: "300" },
];
router.get("/", (req, resp) => {
  let testUser = {
    name: "Julian",
    lastName: "Florez",
    role: "admin",
  };
  resp.render("index", {
    user: testUser,
    style: "index.css",
    isAdmin: testUser.role === "admin",
    food,
  });
});

export default router;
