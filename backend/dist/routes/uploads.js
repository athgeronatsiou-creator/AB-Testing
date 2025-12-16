"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const cloudinary_1 = require("../lib/cloudinary");
const router = (0, express_1.Router)();
router.post("/uploads/sign", auth_1.requireAuth, async (req, res) => {
    const config = cloudinary_1.cloudinary.config();
    console.log("[Uploads] Cloudinary config check:", {
        hasCloudName: !!config.cloud_name,
        hasApiKey: !!config.api_key,
        hasApiSecret: !!config.api_secret,
        cloudName: config.cloud_name,
        apiKey: config.api_key ? config.api_key.substring(0, 10) + "..." : "missing",
    });
    if (!config.api_key || !config.api_secret) {
        console.error("[Uploads] Cloudinary not configured - missing api_key or api_secret");
        return res.status(500).json({ error: "Cloudinary not configured" });
    }
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "ab-testing";
    const signature = cloudinary_1.cloudinary.utils.api_sign_request({ timestamp, folder }, cloudinary_1.cloudinary.config().api_secret);
    res.json({
        timestamp,
        folder,
        signature,
        cloudName: cloudinary_1.cloudinary.config().cloud_name,
        apiKey: cloudinary_1.cloudinary.config().api_key,
    });
});
exports.default = router;
//# sourceMappingURL=uploads.js.map