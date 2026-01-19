import { supabase } from "@/integrations/supabase/client";

export interface PrivacyMetrics {
  feePayerReuseRatio: number;
  signerConcentration: number;
  programEntropy: number;
  counterpartyConcentration: number;
  memoDetected: boolean;
  temporalEntropy: number;
}

export interface PrivacyReport {
  summary: string;
  leaks: string[];
  mitigations: string[];
  checklist: string[];
}

export interface AnalysisMeta {
  transactionCount: number;
  uniqueFeePayers: number;
  uniqueSigners: number;
  uniquePrograms: number;
  topPrograms: { name: string; count: number }[];
}

export interface AnalysisResult {
  wallet: string;
  score: number;
  metrics: PrivacyMetrics;
  report: PrivacyReport;
  meta: AnalysisMeta;
}

export async function analyzeWallet(wallet: string): Promise<AnalysisResult> {
  const { data, error } = await supabase.functions.invoke("analyze-wallet", {
    body: { wallet },
  });

  if (error) {
    console.error("Analysis error:", error);
    throw new Error(error.message || "Failed to analyze wallet");
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as AnalysisResult;
}
