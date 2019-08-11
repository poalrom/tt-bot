import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";

type IUserRouterItem = (user: User, text: string) => Promise<void>;
type IAdminRouterItem = (admin: Admin, text: string, args?: string) => Promise<void>;

export type IUserRouter = Record<string, IUserRouterItem>;
export type IAdminRouter = Record<string, IAdminRouterItem>;