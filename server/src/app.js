import express from "express";
import cors from "cors";

import router from "./routes/taskMockRouter.js";
import {
  formatResponseMiddleware,
  parseDateMiddleware,
} from "./middleware/dateMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.none());

app.use(parseDateMiddleware);
app.use(formatResponseMiddleware);

app.use("/api/v1/tasks", router);

export default app;
