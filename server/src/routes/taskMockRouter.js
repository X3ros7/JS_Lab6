import * as taskMockController from "../controllers/taskMockController.js";
import { Router } from "express";
import {
  validateTask,
  validateTaskPatch,
  handleValidationErrors,
} from "../validators/taskValidator.js";

const router = Router();

router.get("/", taskMockController.getTasks);
router.post(
  "/",
  validateTask,
  handleValidationErrors,
  taskMockController.createTask
);
router.put(
  "/:id",
  validateTask,
  handleValidationErrors,
  taskMockController.updateTask
);
router.patch(
  "/:id",
  validateTaskPatch,
  handleValidationErrors,
  taskMockController.patchTask
);
router.delete("/:id", taskMockController.deleteTask);

export default router;
