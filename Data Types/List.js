import { createClient } from 'redis';
const client = await createClient();
await client.connect();
// Queue operations
await client.lPush('tasks:queue', 'task:1');
await client.lPush('tasks:queue', 'task:2');
const task1 = await client.rPop('tasks:queue');
console.log('Popped task from tasks:queue:', task1); // 'task:1'
const task2 = await client.rPop('tasks:queue');
console.log('Popped task from tasks:queue:', task2); // 'task:2'

// Stack operations
await client.lPush('tasks:stack', 'task:1');
await client.lPush('tasks:stack', 'task:2');
const task3 = await client.lPop('tasks:stack');
console.log('Popped task from tasks:stack:', task3); // 'task:2'
const task4 = await client.lPop('tasks:stack');
console.log('Popped task from tasks:stack:', task4); // 'task:1'

// Combining operations
await client.lPush('tasks:combined', ['task:important', 'task:routine']);
const tasks = await client.lRange('tasks:combined', 0, -1);
console.log('Tasks in tasks:combined:', tasks); // ['task:important', 'task:routine']

// Other operations
await client.rPush('tasks:combined', ['task:3', 'task:4']);
const task5 = await client.lPop('tasks:combined');
console.log('Popped task from tasks:combined:', task5); // 'task:important'
const task6 = await client.rPop('tasks:combined');
console.log('Popped task from tasks:combined:', task6); // 'task:4'

// List Length
console.log('Length of tasks:queue:', await client.lLen('tasks:queue')); // 0
console.log('Length of tasks:stack:', await client.lLen('tasks:stack')); // 0
console.log('Length of tasks:combined:', await client.lLen('tasks:combined')); // 2

// Existence check
console.log('Existence of tasks:queue:', await client.exists('tasks:queue')); // true
console.log('Existence of tasks:stack:', await client.exists('tasks:stack')); // true
console.log('Existence of tasks:combined:', await client.exists('tasks:combined')); // true

// Deletion
console.log('Deleted keys:', await client.del('tasks:queue', 'tasks:stack', 'tasks:combined')); // 3

// List Length after deletion
console.log('Length of tasks:queue after deletion:', await client.lLen('tasks:queue')); // 0
console.log('Length of tasks:stack after deletion:', await client.lLen('tasks:stack')); // 0
console.log('Length of tasks:combined after deletion:', await client.lLen('tasks:combined')); // 0

// Pop from empty list
console.log('Popped task from empty tasks:queue:', await client.lPop('tasks:queue')); // null
console.log('Popped task from empty tasks:stack:', await client.lPop('tasks:stack')); // null
console.log('Popped task from empty tasks:combined:', await client.lPop('tasks:combined')); // null

await client.quit();
