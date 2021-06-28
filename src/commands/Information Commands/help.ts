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

export const run: CommandFunc = async (client, message, args) => {
  const filterCmds = client.commands.filter((i) => i.category !== "owner");
  const cmdNames = client.commands.map((i) => i.name);
  const searchFor = args.join(" ");
  if (!args || !searchFor) {
    message.channel.send("hi");
  } else {
    const cmd: CommandStruct =
      client.commands.get(searchFor) || client.aliases.get(searchFor);
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
export const perms: string | string[] | null = null;
export const cooldown: number = 5;
export const category: categories = "information";
export const usage: string | string[] = "<prefix>help <command name>";
