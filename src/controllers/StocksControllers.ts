import { Request, Response } from 'express';

import getData from "../util/getData"
import parseData from "../util/parseData"

class StocksController {
  async index(request: Request, response: Response) {
    const data = await getData({
      username: String(request.query.username),
      password: String(request.query.password)
    });

    const parsedData = await parseData(data);

    return response.json({
      message: "Suas stocks",
      data: parsedData
    })
  }
}

export default StocksController;