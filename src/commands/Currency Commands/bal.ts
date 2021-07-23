import { PermissionString } from 'discord.js';
import { categories } from '../../typedefs/types';

export const name = 'bal';
export const aliases = ['balance', 'account'];
export const desc = 'Check your balanace.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES'
];
export const cooldown = 10;
export const category: categories = 'currency';
export const usage: string | string[] = '<prefix>balance';
