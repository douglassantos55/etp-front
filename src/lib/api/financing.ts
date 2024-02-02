import { makeAuthPost, makeAuthRequest, type Response } from ".";

type Rates = {
    period: string;
    inflation: number;
    interest: number;
}

type BondIssue = {
    rate: number;
    amount: number;
}

export function getFinancingRates(fetch: Function): Promise<Rates[]> {
    return makeAuthRequest(`financing/rates`, fetch);
}

export function getBonds(companyId: number, fetch: Function): Promise<Bond[]> {
    return makeAuthRequest(`financing/bonds?company=${companyId}`, fetch);
}

export function issueBond(bond: BondIssue): Promise<Response<Bond>> {
    return makeAuthPost(`financing/bonds`, bond, fetch);
}

export function getLoans(fetch: Function): Promise<Loan[]> {
    return makeAuthRequest(`financing/loans`, fetch);
}

export function takeLoan(amount: number): Promise<Response<Loan>> {
    return makeAuthPost(`financing/loans`, { amount }, fetch);
}

export function buyBackLoan(loanId: number, amount: number): Promise<Response<Loan>> {
    return makeAuthPost(`financing/loans/${loanId}`, { amount }, fetch);
}

export function buyBackBond(bondId: number, creditorId: number, amount: number): Promise<Response<Creditor>> {
    return makeAuthPost(`financing/bonds/${bondId}`, { creditor_id: creditorId, amount }, fetch);
}
