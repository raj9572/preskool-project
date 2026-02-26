import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

export const brevoClient = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY, 
});