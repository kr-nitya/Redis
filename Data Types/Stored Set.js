//Unique value + Sorted Order
import { Redis } from "ioredis";

const client = new Redis();

client.on("error", (err) => console.log("Redis Client Error", err));

async function run() {
  // Add scores to the sorted set
  const res1 = await client.zadd("racer_scores", 10, "Norem");
  console.log(
    `Added Norem with score 10: ${res1 === 1 ? "Success" : "Failed"}`
  );

  const res2 = await client.zadd("racer_scores", 12, "Castilla");
  console.log(
    `Added Castilla with score 12: ${res2 === 1 ? "Success" : "Failed"}`
  );

  const res3 = await client.zadd(
    "racer_scores",
    8,
    "Sam-Bodden",
    10,
    "Royce",
    6,
    "Ford",
    14,
    "Prickett",
    12,
    "Castilla"
  );
  console.log(`Added multiple racers: ${res3}`);

  // Get range and reverse range of the sorted set
  const res4 = await client.zrange("racer_scores", 0, -1);
  console.log(`Racers in ascending order: ${res4}`);

  const res5 = await client.zrevrange("racer_scores", 0, -1);
  console.log(`Racers in descending order: ${res5}`);

  // Get range with scores
  const res6 = await client.zrange("racer_scores", 0, -1, "WITHSCORES");
  console.log(`Racers with scores: ${res6}`);

  // Get range by score
  const res7 = await client.zrangebyscore("racer_scores", "-inf", 10);
  console.log(`Racers with score less than or equal to 10: ${res7}`);

  // Remove elements from the sorted set
  const res8 = await client.zrem("racer_scores", "Castilla");
  console.log(`Removed Castilla from racers: ${res8}`);

  const res9 = await client.zremrangebyscore("racer_scores", "-inf", 9);
  console.log(`Removed racers with score less than or equal to 9: ${res9}`);

  const res10 = await client.zrange("racer_scores", 0, -1);
  console.log(`Remaining racers: ${res10}`);

  // Get rank and reverse rank of elements
  const res11 = await client.zrank("racer_scores", "Norem");
  console.log(`Rank of Norem: ${res11}`);

  const res12 = await client.zrevrank("racer_scores", "Norem");
  console.log(`Reverse rank of Norem: ${res12}`);

  // Add elements with scores
  const res13 = await client.zadd(
    "racer_scores",
    0,
    "Norem",
    0,
    "Sam-Bodden",
    0,
    "Royce",
    0,
    "Ford",
    0,
    "Prickett",
    0,
    "Castilla"
  );
  console.log(`Reset scores for existing racers: ${res13}`);

  const res14 = await client.zrange("racer_scores", 0, -1);
  console.log(`Updated racer list: ${res14}`);

  // Get range by lexicographical score
  const res15 = await client.zrangebylex("racer_scores", "[A", "[L");
  console.log(`Racers with names in range [A-L]: ${res15}`);

  // Increment scores
  const res16 = await client.zincrby("racer_scores", 100, "Wood");
  console.log(`Incremented Wood's score by 100: ${res16}`);

  const res17 = await client.zincrby("racer_scores", 100, "Henshaw");
  console.log(`Incremented Henshaw's score by 100: ${res17}`);

  const res18 = await client.zincrby("racer_scores", 100, "Henshaw");
  console.log(`No change in Henshaw's score: ${res18}`);

  const res19 = await client.zincrby("racer_scores", 50, "Wood");
  console.log(`Incremented Wood's score by 50: ${res19}`);

  const res20 = await client.zincrby("racer_scores", 50, "Henshaw");
  console.log(`Incremented Henshaw's score by 50: ${res20}`);
}

run();
