import {
   ButtonInteraction,
   CategoryChannel,
   CommandInteraction,
   GuildChannel,
   TextChannel
} from 'discord.js';
import { Winbi } from '../client';

export default class TicketHandler {
   private client: Winbi;
   public constructor(client: Winbi) {
      this.client = client;
   }
   public async nameTicketSession(
      interaction: CommandInteraction
   ): Promise<string> {
      return `ticket-${
         interaction.user.discriminator
      }-${this.client.util.randomString(4)}`;
   }
   public async createTicketSession(
      interaction: CommandInteraction
   ): Promise<TextChannel> {
      const categoryChannel: CategoryChannel | undefined =
         (await this.client.util.getChannel(
            interaction,
            null,
            'GUILD_CATEGORY',
            'tickets'
         )) as CategoryChannel | undefined;
      const categoryPosition = (
         interaction.guild.channels.cache.first() as GuildChannel
      ).position;
      if (
         !categoryChannel ||
         categoryChannel === undefined
      ) {
         const newCategoryChannel =
            await interaction.guild.channels.create(
               'tickets',
               {
                  type: 'GUILD_CATEGORY',
                  position:
                     categoryPosition !== undefined
                        ? categoryPosition + 1
                        : 1
               }
            );
         if (newCategoryChannel) {
            const createNewTicket =
               await interaction.guild.channels.create(
                  await this.nameTicketSession(interaction),
                  {
                     type: 'GUILD_TEXT',
                     permissionOverwrites: [
                        {
                           id: interaction.guild.id,
                           deny: ['VIEW_CHANNEL']
                        },
                        {
                           id: interaction.member.user.id,
                           allow: ['VIEW_CHANNEL', 'SPEAK']
                        }
                     ],
                     parent: newCategoryChannel
                  }
               );
            this.client.emit(
               'ticketCreate',
               interaction,
               createNewTicket
            );
         }
      } else if (categoryChannel) {
         const createNewTicket =
            await interaction.guild.channels.create(
               await this.nameTicketSession(interaction),
               {
                  type: 'GUILD_TEXT',
                  permissionOverwrites: [
                     {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL']
                     },
                     {
                        id: interaction.member.user.id,
                        allow: ['VIEW_CHANNEL', 'SPEAK']
                     }
                  ],
                  parent: categoryChannel
               }
            );
         this.client.emit(
            'ticketCreate',
            interaction,
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
            await this.client.util.embed({
               timestamp: true,
               color: 'NAVY',
               desc: `Closing the ticket in 5 seconds...`,
               authorName: interaction.user.tag,
               authorIcon:
                  interaction.user.displayAvatarURL(),
               footer: {
                  text: 'Winbi Bot • Created By PraveshK',
                  iconURL:
                     this.client.user.displayAvatarURL()
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
