import { Client } from "discord.js";
import { HelperOptions } from "../typedefs/helperOptions";

export abstract class HelperSession {
  public readonly client: Client;
  public constructor(client: Client, options: HelperOptions) {
    this.client = client;
  }
}
