import { Router } from "express";
import healthRouter from "./health";
import testsRouter from "./tests";
import votesRouter from "./votes";
import uploadsRouter from "./uploads";

const router = Router();

router.use(healthRouter);
router.use(testsRouter);
router.use(votesRouter);
router.use(uploadsRouter);

export default router;


