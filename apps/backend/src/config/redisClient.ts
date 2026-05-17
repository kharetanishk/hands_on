import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.CLIENT_URL,
}) as ReturnType<typeof createClient>;

redisClient.on("error", (err) => {
  console.log(`redis connection not established ${err}`);
});

redisClient
  .connect()
  .then(() => {
    console.log(`redis client connected`);
  })
  .catch((err) => {
    console.log(`${err} in establishing redis connection`);
  });
