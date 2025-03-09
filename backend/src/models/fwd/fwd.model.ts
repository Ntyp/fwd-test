import axios from "axios";
import dotenv from "dotenv";
import {
  PremiumCalculationRequest,
  PremiumCalculationResponse,
  GetProductsResponse,
} from "../../types/fwd.types";
dotenv.config();

const API_ENDPOINT = process.env.API_ENDPOINT;
const API_KEY = process.env.API_KEY;

const fwdService = {
  getProducts: async (): Promise<GetProductsResponse[]> => {
    try {
      const response = await axios.get<GetProductsResponse[]>(
        `${API_ENDPOINT}/getProducts`
      );
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error("Error:", err.message);
      throw err;
    }
  },

  premiumCalculation: async (
    data: PremiumCalculationRequest
  ): Promise<PremiumCalculationResponse> => {
    try {
      const response = await axios.post<PremiumCalculationResponse>(
        `${API_ENDPOINT}/premium-calculation`,
        data,
        {
          headers: {
            "x-api-key": API_KEY, 
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error("Error:", err.message);
      throw err;
    }
  },
};

export default fwdService;
