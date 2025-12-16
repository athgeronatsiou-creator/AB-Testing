"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const enums_1 = require("../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/tests", auth_1.requireAuth, async (req, res) => {
    try {
        const { title, descA, descB, imageAUrl, imageBUrl, status } = req.body;
        console.log("[POST /tests] Request received:", {
            hasTitle: !!title,
            hasImageAUrl: !!imageAUrl,
            hasImageBUrl: !!imageBUrl,
            status,
            userId: req.user?.id,
            userEmail: req.user?.email,
        });
        if (!title || !imageAUrl || !imageBUrl) {
            console.error("[POST /tests] Missing required fields:", {
                title: !!title,
                imageAUrl: !!imageAUrl,
                imageBUrl: !!imageBUrl,
            });
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!req.user?.id) {
            console.error("[POST /tests] Missing user ID");
            return res.status(401).json({ error: "Unauthorized" });
        }
        // Ensure user exists in database (auth middleware might have failed to create it)
        let user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user && req.user.email) {
            // Try to find by email as fallback
            user = await prisma_1.prisma.user.findUnique({
                where: { email: req.user.email },
            });
        }
        if (!user) {
            // Create user if it doesn't exist
            console.log("[POST /tests] Creating user:", req.user.id);
            try {
                user = await prisma_1.prisma.user.create({
                    data: {
                        id: req.user.id,
                        email: req.user.email || "",
                        name: req.user.name ?? null,
                        provider: "google",
                    },
                });
                console.log("[POST /tests] User created successfully");
            }
            catch (userError) {
                console.error("[POST /tests] Failed to create user:", userError);
                // If user creation fails due to duplicate, try to find again
                if (userError.code === "P2002" && req.user.email) {
                    user = await prisma_1.prisma.user.findUnique({
                        where: { email: req.user.email },
                    });
                }
                if (!user) {
                    throw new Error("Failed to create or find user");
                }
            }
        }
        const test = await prisma_1.prisma.test.create({
            data: {
                title,
                descA,
                descB,
                imageAUrl,
                imageBUrl,
                status: status === "PUBLISHED" ? enums_1.TestStatus.PUBLISHED : enums_1.TestStatus.DRAFT,
                userId: user.id,
                publishedAt: status === "PUBLISHED" ? new Date() : null,
            },
        });
        console.log("[POST /tests] Test created successfully:", test.id);
        res.json(test);
    }
    catch (error) {
        console.error("[POST /tests] Error creating test:", error);
        console.error("[POST /tests] Error details:", {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack,
        });
        res.status(500).json({
            error: "Internal server error",
            details: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }
});
router.get("/tests", auth_1.optionalAuth, async (req, res) => {
    try {
        console.log("[GET /tests] Request received:", {
            hasUser: !!req.user,
            userId: req.user?.id,
            userEmail: req.user?.email,
        });
        const selectFields = {
            id: true,
            title: true,
            descA: true,
            descB: true,
            imageAUrl: true,
            imageBUrl: true,
            userId: true,
            createdAt: true,
            publishedAt: true,
            _count: { select: { votes: true } },
        };
        if (req.user) {
            selectFields.votes = {
                where: { userId: req.user.id },
                select: { choice: true },
            };
        }
        const tests = await prisma_1.prisma.test.findMany({
            where: { status: enums_1.TestStatus.PUBLISHED },
            orderBy: { publishedAt: "desc" },
            select: selectFields,
        });
        const testsWithVote = tests.map((test) => {
            const userVote = test.votes?.[0];
            const { votes, ...rest } = test;
            const result = {
                ...rest,
                userVote: userVote ? (userVote.choice === enums_1.VoteChoice.A ? "A" : "B") : null,
            };
            if (req.user) {
                console.log(`[GET /tests] Test ${test.id}: userVote=${result.userVote}, userId=${test.userId}, req.user.id=${req.user.id}`);
            }
            return result;
        });
        res.json(testsWithVote);
    }
    catch (error) {
        console.error("[GET /tests] Error:", error);
        res.status(500).json({ error: "Failed to load tests" });
    }
});
router.get("/tests/mine", auth_1.requireAuth, async (req, res) => {
    const tests = await prisma_1.prisma.test.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { votes: true } },
            votes: {
                select: { choice: true },
            },
        },
    });
    const withCounts = tests.map((t) => {
        const votesA = t.votes.filter((v) => v.choice === enums_1.VoteChoice.A).length;
        const votesB = t.votes.length - votesA;
        const total = t.votes.length;
        return {
            ...t,
            votesA,
            votesB,
            total,
        };
    });
    res.json(withCounts);
});
router.get("/tests/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Missing test ID" });
    }
    const test = await prisma_1.prisma.test.findUnique({
        where: { id, status: enums_1.TestStatus.PUBLISHED },
        include: {
            _count: { select: { votes: true } },
        },
    });
    if (!test) {
        return res.status(404).json({ error: "Not found" });
    }
    res.json(test);
});
router.patch("/tests/:id/publish", auth_1.requireAuth, async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Missing test ID" });
    }
    const existing = await prisma_1.prisma.test.findUnique({
        where: { id },
    });
    if (!existing || existing.userId !== req.user.id) {
        return res.status(404).json({ error: "Not found" });
    }
    const updated = await prisma_1.prisma.test.update({
        where: { id },
        data: { status: enums_1.TestStatus.PUBLISHED, publishedAt: new Date() },
    });
    res.json(updated);
});
router.delete("/tests/:id", auth_1.requireAuth, async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Missing test ID" });
    }
    const existing = await prisma_1.prisma.test.findUnique({
        where: { id },
    });
    if (!existing || existing.userId !== req.user.id) {
        return res.status(404).json({ error: "Not found" });
    }
    // Prisma will cascade delete votes and events due to onDelete: Cascade
    await prisma_1.prisma.test.delete({
        where: { id },
    });
    res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=tests.js.map