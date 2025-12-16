import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { TestStatus, VoteChoice } from "../generated/prisma/enums";

const router = Router();

router.post("/tests/:id/vote", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing test ID" });
    }

    const { choice } = req.body as { choice?: "A" | "B" };
    if (!choice || !["A", "B"].includes(choice)) {
      return res.status(400).json({ error: "Invalid choice" });
    }

    const test = await prisma.test.findUnique({
      where: { id },
    });

    if (!test || test.status !== TestStatus.PUBLISHED) {
      return res.status(400).json({ error: "Test not open for voting" });
    }

    const vote = await prisma.vote.upsert({
      where: { testId_userId: { testId: id, userId: req.user!.id } },
      create: {
        testId: id,
        userId: req.user!.id,
        choice: choice === "A" ? VoteChoice.A : VoteChoice.B,
      },
      update: { choice: choice === "A" ? VoteChoice.A : VoteChoice.B },
    });

    await prisma.event.create({
      data: {
        testId: id,
        userId: req.user!.id,
        type: "VOTE",
        meta: { choice },
      },
    });

    req.app.get("io")?.to(`test:${id}`).emit("vote", {
      testId: id,
      choice,
      userId: req.user!.id,
    });

    // Return vote with choice as string for consistency
    res.json({
      ...vote,
      choice: vote.choice === VoteChoice.A ? "A" : "B",
    });
  } catch (error: any) {
    console.error("[POST /tests/:id/vote] Error:", error);
    res.status(500).json({ error: "Failed to save vote" });
  }
});

export default router;


