import redis from 'redis';

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6380,
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});
(async () => {
  try {
    await redisClient.connect(); // Connect to Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis', err);
  }
})();
export default redisClient;
