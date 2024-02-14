import { Redis } from "ioredis";
const client = new Redis();

async function run() {
    try {
        // Add items to sets
        await client.sadd('sports:football', 'player1');
        await client.sadd('sports:football', 'player2');
        await client.sadd('sports:football', 'player3');
        await client.sadd('sports:cricket', 'player2');
        await client.sadd('sports:cricket', 'player4');
        await client.sadd('sports:tennis', 'player1');
        await client.sadd('sports:tennis', 'player3');
        await client.sadd('sports:tennis', 'player5');

        console.log("Items added to sets.");

        // Check if an item is a member of a set
        console.log("Is 'player1' a member of sports:football?", await client.sismember('sports:football', 'player1')); // true
        console.log("Is 'player3' a member of sports:cricket?", await client.sismember('sports:cricket', 'player3')); // false

        // Get intersection of sets
        const footballCricketIntersection = await client.sinter('sports:football', 'sports:cricket');
        console.log("Intersection of football and cricket sets:", footballCricketIntersection); // []

        // Get cardinality (number of elements) of a set
        console.log("Number of players in sports:tennis set:", await client.scard('sports:tennis')); // 3

        // Get all members of a set
        console.log("Members of sports:football set:", await client.smembers('sports:football')); // ['player1', 'player2', 'player3']

        // Check if multiple items are members of a set
        const membershipCheck = [
            await client.sismember('sports:tennis', 'player1'),
            await client.sismember('sports:tennis', 'player2'),
            await client.sismember('sports:tennis', 'player3')
        ];
        console.log("Membership check in sports:tennis set:", membershipCheck); // [true, false, true]

        // Get difference of sets
        const cricketTennisDifference = await client.sdiff('sports:cricket', 'sports:tennis');
        console.log("Difference between cricket and tennis sets:", cricketTennisDifference); // ['player4']

        // Remove item from a set
        console.log("Removed 'player1' from sports:football set:", await client.srem('sports:football', 'player1')); // 1

        // Pop random item from a set
        console.log("Popped random item from sports:tennis set:", await client.spop('sports:tennis')); // 'player3'

        // Get all members of a set after operations
        console.log("Members of sports:football set after operations:", await client.smembers('sports:football')); // ['player2', 'player3']
        console.log("Members of sports:tennis set after operations:", await client.smembers('sports:tennis')); // ['player1', 'player5']

        // Get a random member from a set
        console.log("Random member from sports:cricket set:", await client.srandmember('sports:cricket')); // 'player2'

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.quit();
    }
}

run();
