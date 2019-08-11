import { Request, Response } from "express";
import { Debate } from "../db/entities/Debate";

export async function stats(_: Request, res: Response) {
    const debate = await Debate.findOne({ isActive: true }, { relations: ["votes"] });

    if (!debate) {
        return res.json("");
    }

    const scores = debate.votes.reduce((acc, vote) => {
        if (vote.forOpponent) {
            acc.opponent++;
        } else {
            acc.defender++;
        }

        return acc;
    }, {defender: 0, opponent: 0});

    res.json({
        ...scores,
        sum: debate.votes.length,
    });
}