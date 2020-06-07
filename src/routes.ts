import express from "express";

import StocksControllers from "./controllers/StocksControllers";

const routes = express.Router();
const stocksControllers = new StocksControllers();

routes.get("/", (request, response) =>
  response.json({
    message: "sucesso.",
  })
);

routes.get("/stocks", stocksControllers.index);

export default routes;
