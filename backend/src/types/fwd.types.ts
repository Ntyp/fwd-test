export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string; 
  }

export interface PremiumCalculationRequest {
    genderCd: string;
    dob: string;
    planCode: string;
    premiumPerYear: number;
    paymentFrequency: string;
}

export interface PremiumCalculationResponse {
    planCode: string;
    baseSumAssured: number;
    baseAnnualPremium: number;
    modalPremium: number;
    productTerm: number;
    premiumPayingTerm: number;
    paymentFrequencyCd: string;
}

export interface GetProductsResponse {
    planCode: string;
    packageName: string;
    benefit: string;
}
  