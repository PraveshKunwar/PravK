import { Client, Snowflake } from "discord.js";
import { HelperOptions } from "../typedefs/helperOptions";

export abstract class HelperSession {
  public readonly client: Client;
  public time: string | number | Date;
  public id: Snowflake;
  public constructor(options: HelperOptions) {
    this.time = options.time;
    this.id = options.id;
  }
  public schedule(period: string | number | Date) {
    period = this.time;
  }
}
