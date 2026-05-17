import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.CLIENT_URL,
}) as ReturnType<typeof createClient>;

redisClient.on("error", (err) => {
  console.log(`redis connection not established`);
});
await redisClient.connect();
console.log(`redis connection established`);
