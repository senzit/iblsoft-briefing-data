export enum SubmitStatus {
    SUCCESS = "success",
    ERROR = "error",
    LOADING = "loading",
}

export interface StationsQueryParams {
    id: string;
    reportTypes: string[];
    stations?: string[];
    firs?: string[];
}

export interface CountriesQueryParams {
    id: string;
    reportTypes: string[];
    countries: string[];
}

export interface JsonRpcResponse {
    jsonrpc: '2.0';
    result?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
    id: number;
}

export interface JsonRpcRequest {
    jsonrpc: '2.0';
    method: string;
    params: any;
    id: string;
}
