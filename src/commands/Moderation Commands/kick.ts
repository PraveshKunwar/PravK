import { PermissionString } from "discord.js";
import {
  categories,
  CommandFunc,
  CommandStruct,
} from "../../typedefs/commandEvent";
export const name: string = "kick";
export const aliases: string[] = ["boot", ""];
export const desc: string = "Upload code to sourcebin easily.";
export const perms: PermissionString[] | null = ["KICK_MEMBERS"];
export const cooldown: number = 10;
export const category: categories = "moderation";
export const usage: string | string[] = "<prefix>bin <source code>";
