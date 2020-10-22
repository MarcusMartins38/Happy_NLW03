import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import OrphanagesController from "./controllers/OrphanagesController";
import SessionController from "./controllers/SessionController";
import UsersController from "./controllers/UsersController";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/user", UsersController.create);
routes.get(
  "/user/orphanages",
  ensureAuthenticated,
  UsersController.indexUserOrphanages
);
routes.delete(
  "/user/orphanages/:id",
  ensureAuthenticated,
  UsersController.deleteOrphanage
);

routes.post("/sessions", SessionController.create);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", ensureAuthenticated, OrphanagesController.show);
routes.post(
  "/orphanages",
  ensureAuthenticated,
  upload.array("images"),
  OrphanagesController.create
);

export default routes;
