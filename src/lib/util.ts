import { Message, PermissionString, Util } from "discord.js";

export default class Utility extends Util {
  public async permsCheck(
    msg: Message,
    perms: PermissionString[]
  ): Promise<PermissionString[]> {
    for (let i = 0; i < perms.length; i++) {
      const j = Math.floor(Math.random() * i + 1);
      const store = perms[i];
      perms[i] = perms[j];
      perms[j] = store;
    }
    return perms;
  }
}
