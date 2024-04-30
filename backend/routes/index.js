const router = require("express").Router();
const routerProduits = require("./produits.routes");

router.get("/", (req, res) => {
  res.end("Hello Mimi");
});

router.use("/produits", routerProduits);

module.exports = router;
