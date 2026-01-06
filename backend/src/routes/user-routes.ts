import { Router } from "express";
import { getUserByName } from "../controllers/user-controller";
import { logger } from "../utils/logger";

const router = Router();

router.get("/:name", async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const user = await getUserByName(name);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    logger.error("Error fetching user by name", err, "UserRoutes");
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
