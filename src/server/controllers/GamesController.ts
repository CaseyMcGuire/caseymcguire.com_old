import { Request, Response } from "express-serve-static-core";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";

export default class GamesController {

  public tetris(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "tetris.bundle.js"
    });
  }
}