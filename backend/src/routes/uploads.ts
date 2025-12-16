import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { cloudinary } from "../lib/cloudinary";

const router = Router();

router.post("/uploads/sign", requireAuth, async (req, res) => {
  const config = cloudinary.config();
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
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    cloudinary.config().api_secret as string
  );

  res.json({
    timestamp,
    folder,
    signature,
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
  });
});

export default router;


