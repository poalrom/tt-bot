import { Request, Response } from "express";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";

export async function tour2(_: Request, res: Response) {
    const users = await User.find({
        isActive: true,
        state: UserState.MovedToOffline
    });

    res.json(users);
}