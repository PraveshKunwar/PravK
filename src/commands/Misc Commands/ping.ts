import { CommandFunc } from "../../typedefs/commandEvent";
import { Util } from "discord.js";

export const run: CommandFunc = async (client, message, args) => {
  message.channel.send("Pinging...").then((msg) => {
    msg.edit(
      `Ping: ${
        msg.createdTimestamp - message.createdTimestamp
      }ms \n\n Websocket hearbeat: ${client.ws.ping}ms`
    );
  });
};

export const name: string = "ping";
export const aliases: string[] = ["pong"];
export const desc: string = "A simple ping command.";
export const perms: string | string[] | null = null;
export const cooldown: number = 10;
