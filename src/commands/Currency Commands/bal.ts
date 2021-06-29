import { PermissionString } from "discord.js";
import {
  categories,
  CommandFunc,
  CommandStruct,
} from "../../typedefs/commandEvent";

export const name: string = "bin";
export const aliases: string[] = ["sourcebin", "code"];
export const desc: string = "Upload code to sourcebin easily.";
export const perms: PermissionString[] | null = null;
export const cooldown: number = 10;
export const category: categories = "currency";
export const usage: string | string[] = "<prefix>bin <source code>";
