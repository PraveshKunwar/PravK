import { Message } from 'discord.js';
import { embed } from '../lib/embed';

export default class MusicHandler {
   public async checkPerms(msg: Message): Promise<Message> {
      if (!msg.member.voice.channel) {
         return msg.channel.send({
            embeds: [
               embed({
                  desc: `❌ Need to be in voice channel in order for me to join. Try again.`,
                  color: 'RED',
                  footer: {
                     text: '\u3000'.repeat(10)
                  }
               })
            ]
         });
      }
      if (
         !msg.member.permissions.has([
            'CONNECT',
            'SEND_MESSAGES'
         ]) ||
         !msg.guild.me.permissions.has([
            'CONNECT',
            'SEND_MESSAGES',
            'SPEAK'
         ])
      ) {
         return msg.channel.send({
            embeds: [
               embed({
                  desc: `Missing Perms: **SPEAK | CONNECT**`,
                  color: 'RED',
                  footer: {
                     text: '\u3000'.repeat(10)
                  }
               })
            ]
         });
      }
   }
   public async play(): Promise<void> {
      console.log(2);
   }
   public async stop(): Promise<void> {
      console.log(2);
   }
   public async pause(): Promise<void> {
      console.log(2);
   }
   public async resume(): Promise<void> {
      console.log(2);
   }
   public async queue(): Promise<void> {
      console.log(2);
   }
   public async skip(): Promise<void> {
      console.log(2);
   }
   public async loop(): Promise<void> {
      console.log(2);
   }
   public async lyrics(): Promise<void> {
      console.log(2);
   }
   public async bassboost(): Promise<void> {
      console.log(2);
   }
   public async forceSkip(): Promise<void> {
      console.log(2);
   }
   public async nowPlaying(): Promise<void> {
      console.log(2);
   }
   public async remove(): Promise<void> {
      console.log(2);
   }
   public async info(): Promise<void> {
      console.log(2);
   }
}
