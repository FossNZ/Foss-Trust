export interface InjectedAccount {
    address: string;
    genesisHash?: string | null;
    name?: string;
}

enum AssetId {
    ETH = 1,
    BTC = 2,
    DOT = 3,
    DAI = 4
}
