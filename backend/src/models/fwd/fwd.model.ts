import axios from "axios";
import dotenv from "dotenv";
import {
  PremiumCalculationRequest,
  PremiumCalculationResponse,
  GetProductsResponse,
} from "../../types/fwd.types";
import db from "../../database/database";

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

  insertDataFwd: async (data: PremiumCalculationResponse) => {
    try {
      const query = `
        INSERT INTO premium_calculation
        (plan_code, base_sum_assured, base_annual_premium, modal_premium, product_term, premium_paying_term, payment_frequency_cd, created_at)
        VALUES(?, ?, ?, ?, ?, ?, ?, NOW());
      `;
      const params = [
        data.planCode,
        data.baseSumAssured,
        data.baseAnnualPremium,
        data.modalPremium,
        data.productTerm,
        data.premiumPayingTerm,
        data.paymentFrequencyCd,
      ];

      const [result] = await db.query(query, params);
      return result;
    } catch (error) {
      console.error("Error Insert Data Fwd:", (error as Error).message);
      throw error;
    }
  },
};

export default fwdService;
