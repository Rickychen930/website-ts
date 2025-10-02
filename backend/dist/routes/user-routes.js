"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
router.get("/:name", async (req, res) => {
    try {
        const name = decodeURIComponent(req.params.name);
        const user = await (0, user_controller_1.getUserByName)(name);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("Error fetching user by name:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
exports.default = router;
