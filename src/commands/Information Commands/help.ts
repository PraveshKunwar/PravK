import { glob } from "glob";
import {
  categories,
  CommandFunc,
  CommandStruct,
} from "../../typedefs/commandEvent";
import fs from "fs/promises";
import path from "path";
import { embed } from "../../lib/embed";
import { ERROR } from "../../typedefs/constants";
import { PermissionString } from "discord.js";

export const run: CommandFunc = async (client, message, args) => {
  const filterCmds = client.commands.filter((i) => i.category !== "owner");
  const filterAliases = client.aliases.filter((i) => i.category !== "owner");
  const searchFor = args.join(" ");
  const categoryCmds = (category: categories): string => {
    return filterCmds
      .filter((i) => i.category === category)
      .map((cmd) => cmd.name)
      .join(", ");
  };
  if (!args || !searchFor) {
    message.channel.send({
      embeds: [
        embed({
          fields: [
            {
              name: "🛠 Moderation",
              value: `${client.codeblock(categoryCmds("moderation"))}`,
              inline: true,
            },
            {
              name: "💵 Currency",
              value: `${client.codeblock(categoryCmds("currency"))}`,
              inline: true,
            },
            {
              name: "❓ Information",
              value: `${client.codeblock(categoryCmds("information"))}`,
              inline: true,
            },
            {
              name: "🎖 Miscellaneous",
              value: `${client.codeblock(categoryCmds("misc"))}`,
              inline: true,
            },
          ],
          timestamp: true,
          color: "NAVY",
          authorName: message.author.tag,
          authorIcon: message.author.displayAvatarURL(),
          footer: {
            text: "Winbi Bot • Created By PraveshK",
            iconURL: client.user.displayAvatarURL(),
          },
          title: "Help Dashboard",
          desc: `Welcome to the help section. Type ${client.codeblock(
            "<prefix>help <command name>"
          )} to quickly get help on a command. \n\n Here are a list of all the commands down below: \n\nIf you need more help: [Github](https://github.com/PraveshKunwar/Winbi) • Discord: **PraveshK#4056**
    `,
        }),
      ],
    });
  } else {
    const cmd: CommandStruct =
      filterCmds.get(searchFor) || filterAliases.get(searchFor);
    if (!cmd || typeof cmd === "undefined") {
      return message.channel.send({
        embeds: [
          embed({
            desc: ERROR.COULD_NOT_FIND,
            color: "RED",
            footer: {
              text: "\u3000".repeat(10),
            },
          }),
        ],
      });
    } else {
      message.channel.send({
        embeds: [
          embed({
            timestamp: true,
            color: "NAVY",
            title: `Command Name: ${cmd.name.toLowerCase()}`,
            authorName: message.author.tag,
            authorIcon: message.author.displayAvatarURL(),
            footer: {
              text: "Winbi Bot • Created By PraveshK",
              iconURL: client.user.displayAvatarURL(),
            },
            fields: [
              {
                name: "📜 Description",
                value: client.codeblock(cmd.desc),
                inline: true,
              },
              {
                name: "❣ Usage",
                value: client.codeblock(
                  Array.isArray(cmd.usage) ? cmd.usage.join(", ") : cmd.usage
                ),
                inline: true,
              },
              {
                name: "🚀 Aliases",
                value: client.codeblock(
                  Array.isArray(cmd.aliases)
                    ? cmd.aliases.join(", ")
                    : typeof cmd.aliases === "undefined"
                    ? "No aliases."
                    : cmd.aliases
                ),
                inline: true,
              },
              {
                name: "⌚ Cooldown",
                value: client.codeblock(cmd.cooldown + " seconds"),
                inline: true,
              },
              {
                name: "📚 Category",
                value: client.codeblock(cmd.category),
                inline: true,
              },
              {
                name: "🏆 Permissions",
                value: client.codeblock(
                  Array.isArray(cmd.perms)
                    ? cmd.perms.join(", ")
                    : cmd.perms === null
                    ? "No permissions."
                    : cmd.perms
                ),
                inline: true,
              },
            ],
          }),
        ],
      });
    }
  }
};

export const name: string = "help";
export const desc: string =
  "Help command to get info on commands or specific command.";
export const perms: PermissionString[] | null = null;
export const cooldown: number = 0;
export const category: categories = "information";
export const usage: string | string[] = "<prefix>help <command name>";
