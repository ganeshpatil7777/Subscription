const test = require('ava');
const { MongoDBServer } = require('mongomem');

test.before(async t => {
    await MongoDBServer.start()
});

test('', async t => {
    const connectionString = await MongoDBServer.getConnectionString();
    console.log('connextion', connectionString)
    t.pass()
})