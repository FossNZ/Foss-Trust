export interface InjectedAccount {
    address: string;
    genesisHash?: string | null;
    name?: string;
}

export enum ConditionType {
    None, BlockHeight, Timestamp, ClockInInterval
}
