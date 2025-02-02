import { QueryParams } from "../types/api";
import JSONRPCService from "./JSONRPCService";

export async function fetchJSONRPC(queryParams: QueryParams[]) {
  try {
    const response = await JSONRPCService.query(queryParams);
    console.info("Response:", response);
    return response;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}