import { Request, Response } from "express";
import { In } from 'typeorm';
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";

export async function leaderboardStats(_: Request, res: Response) {
    const users = await User.find({
        isActive: true,
        state: In([UserState.MovedToOffline, UserState.MovedToFinal]),
    });

    res.json(users);
}