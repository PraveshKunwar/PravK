import { categories, CommandFunc } from "../../typedefs/commandEvent";
import { PermissionString, Util } from "discord.js";
import { embed } from "../../lib/embed";
import { ERROR } from "../../typedefs/constants";

export const run: CommandFunc = async (client, message, args) => {
  console.log(args);
  if (args.length >= 1) {
    return message.channel.send({
      embeds: [
        embed({
          desc: ERROR.NO_ARGS_NEEDED + "\n**Usage**: <prefix>ping",
          color: "RED",
          footer: {
            text: "\u3000".repeat(10),
          },
        }),
      ],
    });
  } else {
    message.channel.send("Pinging...").then((msg) => {
      msg.edit(
        `Ping: ${
          msg.createdTimestamp - message.createdTimestamp
        }ms \n\n Websocket hearbeat: ${client.ws.ping}ms`
      );
    });
  }
};

export const name: string = "ping";
export const aliases: string[] = ["pong"];
export const desc: string = "A simple ping command.";
export const perms: PermissionString[] | null = null;
export const cooldown: number = 10;
export const category: categories = "misc";
export const usage: string | string[] = "<prefix>ping";
