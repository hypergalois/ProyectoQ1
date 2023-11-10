import { Router } from "express";

const router = Router();

router.post("/register", register)

router.post("/login", login)

router.post("/logout", logout)

router.get("/profile", profile)

router.get("/verify", verifyToken)

export default router;
