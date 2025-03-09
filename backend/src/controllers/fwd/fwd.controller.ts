import { Request, Response } from "express";
import fwdService from "../../models/fwd/fwd.model";
import {
  PremiumCalculationRequest,
  PremiumCalculationResponse,
  GetProductsResponse,
  ApiResponse,
} from "../../types/fwd.types";

export const getProducts = async (
  req: Request,
  res: Response<ApiResponse<GetProductsResponse[] | null>>
): Promise<void> => {
  try {
    const results = await fwdService.getProducts();
    if (results.length === 0) {
      res
        .status(404)
        .json({ success: false, data: null, error: "No products found" });
      return;
    }
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, data: null, error: err.message });
  }
};

export const premiumCalculation = async (
  req: Request<{}, {}, PremiumCalculationRequest>,
  res: Response<ApiResponse<PremiumCalculationResponse | null>>
): Promise<void> => {
  try {
    const results = await fwdService.premiumCalculation(req.body);
    if (!results) {
      res
        .status(404)
        .json({ success: false, data: null, error: "No calculation found" });
      return;
    }
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, data: null, error: err.message });
  }
};
