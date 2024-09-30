import redis from 'redis';
const client = redis.createClient();

client.on('connect', ()=>{
    console.log('Redis connected');

})
client.on('error', (err)=>{
    console.log(`Error occurred: ${err}`);
})

class RedisLoader {
    static getClient() {
        return client;
    }
}
export { RedisLoader };