import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import OrphanagesController from "./controllers/OrphanagesController";
import SessionController from "./controllers/SessionController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

routes.post("/user", UsersController.create);
routes.post("/sessions", SessionController.create);

export default routes;
