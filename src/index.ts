import { Winbi } from "./client";
import dotenv from "dotenv";

dotenv.config();

new Winbi().start(process.env.TOKEN as string);
