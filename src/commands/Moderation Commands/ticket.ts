import { PermissionString } from 'discord.js';
import {
   categories,
   CommandFunc
} from '../../typedefs/types';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   await client.TicketHandler.createTicketSession(message);
};

export const name = 'ticket';
export const aliases = ['create-ticket'];
export const desc = 'Create a new ticket.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES',
   'MANAGE_CHANNELS'
];
export const cooldown = 10;
export const category: categories = 'moderation';
export const usage: string | string[] = '<prefix>ticket';
