import { PermissionString } from 'discord.js';
import { categories } from '../../typedefs/commandEvent';

export const name = 'bin';
export const aliases = ['sourcebin', 'code'];
export const desc = 'Upload code to sourcebin easily.';
export const perms: PermissionString[] | null = null;
export const cooldown = 10;
export const category: categories = 'currency';
export const usage: string | string[] =
   '<prefix>bin <source code>';
