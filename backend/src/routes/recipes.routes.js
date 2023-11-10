import { Router } from "express";

const router = Router();

router.get("/recipes")

router.get("/recipes/:id")

router.post("/recipes")

router.put("/recipes/:id")

router.delete("/recipes/:id")

export default router;