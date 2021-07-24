import {
   ButtonInteraction,
   CategoryChannel,
   Client,
   GuildChannel,
   Message,
   TextChannel
} from 'discord.js';
import { Winbi } from '../client';

export default class TicketHandler {
   private client: Client;
   public constructor(client: Client) {
      this.client = client;
   }
   public async nameTicketSession(
      message: Message
   ): Promise<string> {
      return `ticket-${message.author.discriminator}-${(
         this.client as Winbi
      ).util.randomString(4)}`;
   }
   public async createTicketSession(
      message: Message
   ): Promise<TextChannel> {
      const categoryChannel: CategoryChannel | undefined =
         (await (this.client as Winbi).util.getChannel(
            message,
            null,
            'category',
            'tickets'
         )) as CategoryChannel | undefined;
      const categoryPosition = (
         message.guild.channels.cache.first() as GuildChannel
      ).position;
      if (
         !categoryChannel ||
         categoryChannel === undefined
      ) {
         const newCategoryChannel =
            await message.guild.channels.create('tickets', {
               type: 'category',
               position:
                  categoryPosition !== undefined
                     ? categoryPosition + 1
                     : 1
            });
         if (newCategoryChannel) {
            const createNewTicket =
               await message.guild.channels.create(
                  await this.nameTicketSession(message),
                  {
                     type: 'text',
                     permissionOverwrites: [
                        {
                           id: message.guild.id,
                           deny: ['VIEW_CHANNEL']
                        },
                        {
                           id: message.member.user.id,
                           allow: ['VIEW_CHANNEL', 'SPEAK']
                        }
                     ],
                     parent: newCategoryChannel
                  }
               );
            this.client.emit(
               'ticketCreate',
               message,
               createNewTicket
            );
         }
      } else if (categoryChannel) {
         const createNewTicket =
            await message.guild.channels.create(
               await this.nameTicketSession(message),
               {
                  type: 'text',
                  permissionOverwrites: [
                     {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                     },
                     {
                        id: message.member.user.id,
                        allow: ['VIEW_CHANNEL', 'SPEAK']
                     }
                  ],
                  parent: categoryChannel
               }
            );
         this.client.emit(
            'ticketCreate',
            message,
            createNewTicket
         );
         return createNewTicket;
      }
   }
   public async deleteTicketSession(
      interaction: ButtonInteraction
   ): Promise<void> {
      await interaction.reply({
         embeds: [
            await (this.client as Winbi).util.embed({
               timestamp: true,
               color: 'NAVY',
               desc: `Closing the ticket in 5 seconds...`,
               authorName: interaction.user.tag,
               authorIcon:
                  interaction.user.displayAvatarURL(),
               footer: {
                  text: 'Winbi Bot • Created By PraveshK',
                  iconURL: (
                     this.client as Winbi
                  ).user.displayAvatarURL()
               }
            })
         ]
      });
      setTimeout(async () => {
         interaction.channel.delete();
      }, 5000);
   }
   public async lockTicketSession(): Promise<void> {
      console.log(2);
   }
   public async saveTicketLogs(): Promise<void> {
      console.log(2);
   }
}
