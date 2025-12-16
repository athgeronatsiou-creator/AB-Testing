"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const enums_1 = require("../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/tests/:id/vote", auth_1.requireAuth, async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Missing test ID" });
        }
        const { choice } = req.body;
        if (!choice || !["A", "B"].includes(choice)) {
            return res.status(400).json({ error: "Invalid choice" });
        }
        const test = await prisma_1.prisma.test.findUnique({
            where: { id },
        });
        if (!test || test.status !== enums_1.TestStatus.PUBLISHED) {
            return res.status(400).json({ error: "Test not open for voting" });
        }
        const vote = await prisma_1.prisma.vote.upsert({
            where: { testId_userId: { testId: id, userId: req.user.id } },
            create: {
                testId: id,
                userId: req.user.id,
                choice: choice === "A" ? enums_1.VoteChoice.A : enums_1.VoteChoice.B,
            },
            update: { choice: choice === "A" ? enums_1.VoteChoice.A : enums_1.VoteChoice.B },
        });
        await prisma_1.prisma.event.create({
            data: {
                testId: id,
                userId: req.user.id,
                type: "VOTE",
                meta: { choice },
            },
        });
        req.app.get("io")?.to(`test:${id}`).emit("vote", {
            testId: id,
            choice,
            userId: req.user.id,
        });
        // Return vote with choice as string for consistency
        res.json({
            ...vote,
            choice: vote.choice === enums_1.VoteChoice.A ? "A" : "B",
        });
    }
    catch (error) {
        console.error("[POST /tests/:id/vote] Error:", error);
        res.status(500).json({ error: "Failed to save vote" });
    }
});
exports.default = router;
//# sourceMappingURL=votes.js.map