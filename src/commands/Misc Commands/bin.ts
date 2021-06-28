import { DiscordAPIError, MessageEmbed } from "discord.js";
import sourcebin from "sourcebin";
import { embed } from "../../lib/embed";
import { categories, CommandFunc } from "../../typedefs/commandEvent";
import { ERROR } from "../../typedefs/constants";

export const run: CommandFunc = async (client, message, args) => {
  const code = args.join(" ");
  if (!code) {
    return message.channel.send({
      embeds: [
        embed({
          desc: ERROR.NO_ARGS,
          color: "RED",
          footer: {
            text: "\u3000".repeat(10),
          },
        }),
      ],
    });
  } else {
    try {
      const bin = await sourcebin.create(
        [
          {
            content: code,
            language: "text",
          },
        ],
        {
          title: `${message.author.tag}'s bin.`,
          description: `${message.author.tag}'s code. Check it out.`,
        }
      );
      message
        .delete()
        .then((msg) => {
          message.channel.send({
            embeds: [
              embed({
                timestamp: true,
                color: "NAVY",
                desc: `Here is your url: ${bin.url}`,
                authorName: message.author.tag,
                authorIcon: message.author.displayAvatarURL(),
                footer: {
                  text: "Winbi Bot • Created By PraveshK",
                  iconURL: client.user.displayAvatarURL(),
                },
              }),
            ],
          });
        })
        .catch((err: DiscordAPIError) => {
          if (err.message) {
            return message.channel.send({
              embeds: [
                embed({
                  desc: `${ERROR.UNKNOWN}${client.oneblock(
                    `Message: ${err.message} | Code: ${err.code}`
                  )}`,
                  color: "RED",
                  footer: {
                    text: "\u3000".repeat(10),
                  },
                }),
              ],
            });
          }
        });
    } catch (e) {
      if (e) {
        message.channel.send(ERROR.UNKNOWN);
      }
    }
  }
};

export const name: string = "bin";
export const aliases: string[] = ["sourcebin", "code"];
export const desc: string = "Upload code to sourcebin easily.";
export const perms: string | string[] | null = null;
export const cooldown: number = 10;
export const category: categories = "misc";
