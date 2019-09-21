const {ApiPromise} = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

async function prepare() {
    // node --experimental-repl-await
    const keyring = new Keyring({ type: 'sr25519' });
    const typeDefs = {BeneficiaryShare: {address: 'AccountId',weight: 'u64'},LivingSwitchCond: {_enum: {None: "Null",BlockHeight: "BlockNumber",Timestamp: "Moment",ClockInInterval: "BlockNumber"}}}
    
    let api = await ApiPromise.create({types: typeDefs});

    let alice = keyring.addFromUri('//Alice')
    let alex = keyring.addFromMnemonic('buffalo siren near guess roof turtle type laptop worth nuclear bridge voice');
    let ian = keyring.addFromMnemonic('put slide venture gorilla roof stand skull crisp slice mammal similar pet');

    setTimeout(async () => {
        await api.tx.balances.transfer(alex.address, 10000000).signAndSend(alice); // alex
    }, 5000)

    // (await api.query.balances.freeBalance(alex.address)).toString();
    setTimeout(async () => {
        await api.tx.balances.transfer(ian.address, 10000000).signAndSend(alice); // ian
    },5000)
    // (await api.query.balances.freeBalance(Ian.address)).toString();


    setTimeout(async () => {
        await api.tx.assets.issue(100000000000000).signAndSend(alex);
    },5000)
    setTimeout(async () => {
        await api.tx.assets.issue(100000000000000).signAndSend(alex);
    },5000)
    setTimeout(async () => {
        await api.tx.assets.issue(100000000000000).signAndSend(alex);
    },5000)
    setTimeout(async () => {
        await api.tx.assets.issue(100000000000000).signAndSend(alex);
    },5000)
    console.log((await api.query.assets.nextAssetId()).toString());
}

prepare();