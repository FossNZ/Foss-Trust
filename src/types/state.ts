import { InjectedAccount } from './type';

export type State = {
    accounts: InjectedAccount[],
    mainAccount: InjectedAccount,
    balances: any // TODO: 
};
