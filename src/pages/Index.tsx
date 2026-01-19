import { useState } from "react";
import { WalletInput } from "@/components/WalletInput";
import { AnalysisView } from "@/components/AnalysisView";
import { Shield, Eye, Lock, Zap } from "lucide-react";

// Mock analysis function - will be replaced with real API
const mockAnalyze = async (wallet: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate somewhat realistic mock data
  const feePayerReuseRatio = 0.3 + Math.random() * 0.5;
  const signerConcentration = 0.2 + Math.random() * 0.6;
  const programEntropy = 0.3 + Math.random() * 0.5;
  const counterpartyConcentration = 0.2 + Math.random() * 0.5;
  const memoDetected = Math.random() > 0.7;
  const temporalEntropy = 0.4 + Math.random() * 0.4;

  // Calculate score
  const score = Math.round(
    100 - 
    (feePayerReuseRatio * 20) - 
    (signerConcentration * 15) - 
    ((1 - programEntropy) * 15) - 
    (counterpartyConcentration * 15) - 
    (memoDetected ? 15 : 0) - 
    ((1 - temporalEntropy) * 10)
  );

  return {
    wallet,
    score: Math.max(10, Math.min(95, score)),
    metrics: {
      feePayerReuseRatio,
      signerConcentration,
      programEntropy,
      counterpartyConcentration,
      memoDetected,
      temporalEntropy,
    },
    report: {
      summary: `This wallet exhibits ${score > 60 ? 'moderate' : 'elevated'} privacy risks based on analysis of ${Math.floor(200 + Math.random() * 100)} recent transactions. The primary concerns are fee payer clustering and program interaction fingerprinting. ${memoDetected ? 'Critical: Memo field data leakage was detected.' : ''} Immediate operational adjustments are recommended.`,
      leaks: [
        "Fee payer concentration creates strong wallet clustering signals",
        "Program interaction patterns are highly distinctive and fingerprintable",
        "Transaction timing shows predictable business-hour patterns",
        ...(memoDetected ? ["Memo fields contain potential identifying information"] : []),
        "Counterparty relationships reveal organizational structure",
      ],
      mitigations: [
        "Rotate fee payer wallets using a pool of at least 5 addresses",
        "Introduce random delays between transactions (30-300 second range)",
        "Use privacy-preserving DEX aggregators to obscure trading patterns",
        "Batch operations through program composition to reduce fingerprinting",
        "Implement memo field policies - never include identifiable data",
        "Consider using multiple operational wallets for different functions",
      ],
      checklist: [
        "Audit all current fee payer addresses and create rotation schedule",
        "Review memo usage across all transactions - remove sensitive data",
        "Implement transaction timing randomization in operational scripts",
        "Set up counterparty diversification strategy",
        "Document and train team on privacy-preserving transaction practices",
        "Schedule quarterly privacy posture reviews",
      ],
    },
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<Awaited<ReturnType<typeof mockAnalyze>> | null>(null);

  const handleAnalyze = async (wallet: string) => {
    setIsLoading(true);
    try {
      const data = await mockAnalyze(wallet);
      setAnalysisData(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (analysisData) {
    return <AnalysisView data={analysisData} onBack={() => setAnalysisData(null)} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-lg text-foreground">Solana Privacy Copilot</span>
          </div>
        </header>

        {/* Hero */}
        <main className="container mx-auto px-4 pt-16 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in-up">
              <Eye className="w-4 h-4" />
              AI-Powered Privacy Analysis
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Understand Your Wallet's{" "}
              <span className="text-gradient-primary">Privacy Risk</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Quantify linkability, detect metadata leakage, and get AI-generated 
              mitigation strategies for your Solana wallet.
            </p>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <WalletInput onSubmit={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="card-cyber rounded-xl p-6 text-left">
                <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Privacy Score</h3>
                <p className="text-sm text-muted-foreground">
                  Composite heuristic scoring across 6 privacy dimensions with clear risk bands.
                </p>
              </div>
              
              <div className="card-cyber rounded-xl p-6 text-left">
                <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Solana Native</h3>
                <p className="text-sm text-muted-foreground">
                  Deep analysis of fee payers, signers, program interactions, and memo fields.
                </p>
              </div>
              
              <div className="card-cyber rounded-xl p-6 text-left">
                <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Actionable remediation strategies generated by AI based on your specific risks.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              Solana Privacy Copilot v1.0 • Built for Solana Privacy Hackathon 2026
            </p>
            <p className="text-muted-foreground text-sm">
              No wallet signing required • Read-only analysis
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
