import { Message } from 'discord.js';
import { Winbi } from '../client';
import ytsr from 'ytsr';

export default class MusicHandler {
   private client: Winbi;
   public constructor(client: Winbi) {
      this.client = client;
   }
   public async checkPerms(msg: Message): Promise<Message> {
      if (!msg.member.voice.channel) {
         return msg.channel.send({
            embeds: [
               await this.client.util.embed({
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
               await this.client.util.embed({
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
   public async play(
      message: Message,
      query: string
   ): Promise<void> {
      const result = await ytsr(query);
      let res: string;
      if (result.items[0].type === 'video') {
         res = result.items[0].url;
      }
      this.client.DisTube.play(message, res);
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
