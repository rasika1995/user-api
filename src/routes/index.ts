import { Router } from "express";
import userSignUp from "src/controllers/user/auth";
import verifyUser from "src/controllers/user/verify-user";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome !");
});

router.get("/verify", verifyUser);
router.post("/signup", userSignUp);

export default router;
