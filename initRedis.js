const redis = require('redis');
const {promisify} = require('util');

//Connect to Redis

const client = redis.createClient({

});
client.on('error', (err) => permittedCrossDomainPolicies.log('Redis Client Error', err));

//Promisify Redis client to use async await

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {getAsync, setAsync, delAsync}