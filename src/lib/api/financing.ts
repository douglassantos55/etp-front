import { makeAuthPost, makeAuthPut, makeAuthRequest, type Result } from ".";

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

export function getCompanyBonds(companyId: number, fetch: Function): Promise<Bond[]> {
    return makeAuthRequest(`financing/bonds?company=${companyId}`, fetch);
}

export function issueBond(bond: BondIssue): Promise<Result<Bond>> {
    return makeAuthPost(`financing/bonds`, bond, fetch);
}

export function getLoans(fetch: Function): Promise<Loan[]> {
    return makeAuthRequest(`financing/loans`, fetch);
}

export function takeLoan(amount: number): Promise<Result<Loan>> {
    return makeAuthPost(`financing/loans`, { amount }, fetch);
}

export function buyBackLoan(loanId: number, amount: number): Promise<Result<Loan>> {
    return makeAuthPost(`financing/loans/${loanId}`, { amount }, fetch);
}

export function buyBackBond(bondId: number, creditorId: number, amount: number): Promise<Result<Creditor>> {
    return makeAuthPut(`financing/bonds/${bondId}`, { creditor_id: creditorId, amount }, fetch);
}

export function getBonds(fetch: Function): Promise<Bond[]> {
    return makeAuthRequest(`financing/bonds`, fetch);
}

export function buyBond(bondId: number, amount: number): Promise<Result<Creditor>> {
    return makeAuthPost(`financing/bonds/${bondId}`, { amount }, fetch);
}
