import { Router } from "express";
import { createVehicleController } from "../controllers/vehicles/createVehicle.controller";
import { deleteVehicleController } from "../controllers/vehicles/deleteVehicle.controller";
import { listAllPublishedVehiclesController } from "../controllers/vehicles/listAllPublishedVehicles.controller";
import { listSessionVehiclesController } from "../controllers/vehicles/listSessionVehicles.controller";
import { listUserVehiclesController } from "../controllers/vehicles/listUserVehicles.controller";
import { patchVehicleController } from "../controllers/vehicles/patchVehicle.controller";
import { retrieveVehicleController } from "../controllers/vehicles/retrieveVehicle.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import validateSerializerMiddleware from "../middlewares/validateSerializer.middleware";
import {
  createVehicleSerializer,
  updateVehicleSerializer,
} from "../serializers/vehicle.serializer";

const vehiclesRoutes = Router();

vehiclesRoutes.post(
  "",
  ensureAuthMiddleware,
  validateSerializerMiddleware(createVehicleSerializer),
  createVehicleController
);
vehiclesRoutes.get("", listAllPublishedVehiclesController);
vehiclesRoutes.get("/:id", retrieveVehicleController);
vehiclesRoutes.get("/user/:id", listUserVehiclesController);
vehiclesRoutes.get("/session/user", ensureAuthMiddleware, listSessionVehiclesController);
vehiclesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  validateSerializerMiddleware(updateVehicleSerializer),
  patchVehicleController
);
vehiclesRoutes.delete("/:id", ensureAuthMiddleware, deleteVehicleController);

export default vehiclesRoutes;
