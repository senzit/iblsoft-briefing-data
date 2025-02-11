import { CountriesQueryParams, JsonRpcRequest, JsonRpcResponse, StationsQueryParams } from "../types/api";

const JSONRPCService = {
    async query(params: (StationsQueryParams | CountriesQueryParams)[]): Promise<JsonRpcResponse> {

        const requestData: JsonRpcRequest = {
            jsonrpc: "2.0",
            id: `query-${Date.now()}`,
            method: "query",
            params: params,
        };

        try {
            const response = await fetch("https://ogcie.iblsoft.com/ria/opmetquery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json() as JsonRpcResponse;
            if (result.error) {
                throw new Error(result.error.message);
            }
            return await result.result;
        } catch (error) {
            console.error("JSON-RPC Query Error:", error);
            throw error;
        }
    },
};

export default JSONRPCService;
