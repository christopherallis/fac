
const Mutex = require('async-mutex').Mutex;
const Semaphore = require('async-mutex').Semaphore;
const withTimeout = require('async-mutex').withTimeout;

const {auth} = require('google-auth-library');


const mutext = new Mutex()
var oauth_token = ""
var expires_at

const keys = JSON.parse(process.env["YT_CREDS"])
const client = auth.fromJSON(keys)
client.scopes = ['https://www.googleapis.com/auth/youtube.readonly'];


async function getLive() {
    const url = `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus&broadcastStatus=all&broadcastType=all`;
    const res = await client.request({url});
    console.log(res.data)
}

module.exports = {getLive}