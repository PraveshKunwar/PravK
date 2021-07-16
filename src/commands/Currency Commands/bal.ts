import { PermissionString } from 'discord.js';
import { categories } from '../../typedefs/commandEvent';

export const name = 'bal';
export const aliases = ['balance', 'account'];
export const desc = 'Check your balanace.';
export const perms: PermissionString[] | null = null;
export const cooldown = 10;
export const category: categories = 'currency';
export const usage: string | string[] = '<prefix>balance';
