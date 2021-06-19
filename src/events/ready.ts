import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (client) => {
  console.log(`${client.user.tag} is online!`);
  client.user.setPresence({
    activities: [
      {
        name: "Currently coding myself!",
        type: "PLAYING",
      },
    ],
    status: "dnd",
  });
};

export const name: string = "ready";
