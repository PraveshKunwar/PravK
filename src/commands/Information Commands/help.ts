import { glob } from "glob";
import { categories, CommandFunc } from "../../typedefs/commandEvent";
import fs from "fs/promises";
import path from "path";
import { embed } from "../../lib/embed";
import { ERROR } from "../../typedefs/constants";

export const run: CommandFunc = async (client, message, args) => {
  const filterCmds = client.commands.filter((i) => i.category !== "owner");
  const category = args.length === 2 ? args.shift() : args[0];
  if (args.length >= 3) {
    return message.channel.send({
      embeds: [
        embed({
          desc:
            ERROR.NO_CATEGORY +
            " **Usage**: <prefix>help <{misc | information | moderation}> <command name> ",
          color: "RED",
          footer: {
            text: "\u3000".repeat(10),
          },
        }),
      ],
    });
  }
  console.log(category);
};

export const name: string = "help";
export const desc: string =
  "Help command to get info on commands or specific command.";
export const perms: string | string[] | null = null;
export const cooldown: number = 5;
export const category: categories = "information";
