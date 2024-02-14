import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

// Add car details
const fieldsAdded = await client.hSet(
    'car:1',
    {
        model: 'Civic',
        brand: 'Honda',
        type: 'Sedan',
        price: 25000,
    },
);
console.log(`Added car details: ${fieldsAdded} fields added`);

// Get specific details
const model = await client.hGet('car:1', 'model');
console.log(`Model of the car: ${model}`);

const price = await client.hGet('car:1', 'price');
console.log(`Price of the car: $${price}`);

// Get all details
const car = await client.hGetAll('car:1');
console.log(`Details of the car:`, car);

// Get specific fields
const fields = await client.hmGet('car:1', ['model', 'price']);
console.log(`Specific fields of the car:`, fields);

// Increment price
let newPrice = await client.hIncrBy('car:1', 'price', 100);
console.log(`Increased car price by $100. New price: $${newPrice}`);
newPrice = await client.hIncrBy('car:1', 'price', -100);
console.log(`Reset car price to its original value: $${newPrice}`);

// Increment stats
let rides = await client.hIncrBy('car:1:stats', 'rides', 1);
console.log(`Total rides of the car: ${rides}`);
let crashes = await client.hIncrBy('car:1:stats', 'crashes', 1);
console.log(`Total crashes of the car: ${crashes}`);
let owners = await client.hIncrBy('car:1:stats', 'owners', 1);
console.log(`Total owners of the car: ${owners}`);

// Get stats
rides = await client.hGet('car:1:stats', 'rides');
console.log(`Total rides of the car: ${rides}`);
const stats = await client.hmGet('car:1:stats', ['crashes', 'owners']);
console.log(`Stats of the car: crashes=${stats[0]}, owners=${stats[1]}`);

await client.quit();
