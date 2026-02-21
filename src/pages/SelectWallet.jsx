import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Wallet, ChevronRight, Globe, Shield, Star } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const WALLETS = [
  { id: "metamask", name: "MetaMask", url: "metamask.io", popular: true, icon: "/wallets/metamask.png" },
  { id: "trust", name: "Trust Wallet", url: "trustwallet.com", popular: true, icon: "/wallets/trust.png" },
  { id: "safepal", name: "Safepal", url: "safepal.com", popular: false, icon: "/wallets/safepal.png" },
  { id: "cake", name: "Cake Wallet", url: "cakewallet.com", popular: true, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=cake" },
  { id: "ledger", name: "Ledger Live", url: "ledger.com", popular: true, icon: "/wallets/ledger.png" },
  { id: "hash", name: "Hash", url: "hashpack.app", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=hash" },
  { id: "coinbase", name: "Coinbase", url: "coinbase.com", popular: true, icon: "/wallets/coinbase.png" },
  { id: "crypto", name: "Crypto.com | Defi Wallet", url: "crypto.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=crypto" },
  { id: "chainge", name: "Chainge Wallet", url: "chainge.finance", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=chainge" },
  { id: "bitfrost", name: "Bitfrost Wallet", url: "bifrostwallet.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=bitfrost" },
  { id: "station", name: "Station", url: "terrastation.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=station" },
  { id: "pera", name: "Pera Algo Wallet", url: "algo.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=pera" },
  { id: "walken", name: "Walken", url: "walken.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=walken" },
  { id: "stepn", name: "Stepn", url: "stepn.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=stepn" },
  { id: "saitamask", name: "Saitamask", url: "saitamask.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=saitamask" },
  { id: "safemoon", name: "Safemoon", url: "safemoon.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=safemoon" },
  { id: "saitapro", name: "SaitaPro", url: "saitapro.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=saitapro" },
  { id: "defly", name: "Defly Wallet", url: "defly.app", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=defly" },
  { id: "walletconnect", name: "Wallet Connect", url: "walletconnect.com", popular: true, icon: "/wallets/walletconnect.png" },
  { id: "block", name: "Block wallet", url: "blockwallet.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=block" },
  { id: "stargazer", name: "Star gazer", url: "stargazer.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=stargazer" },
  { id: "tenset", name: "Tenset", url: "tenset.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=tenset" },
  { id: "ckbull", name: "CK Bull", url: "ckbull.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=ckbull" },
  { id: "liquality", name: "Liquality", url: "liquality.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=liquality" },
  { id: "binance", name: "Binance Chain Wallet", url: "binance.com", popular: true, icon: "/wallets/binance.png" },
  { id: "polygon", name: "Polygon Wallet", url: "polygon.technology", popular: true, icon: "/wallets/polygon.png" },
  { id: "rainbow", name: "Rainbow", url: "rainbow.me", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=rainbow" },
  { id: "bitpay", name: "Bitpay", url: "bitpay.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=bitpay" },
  { id: "walleth", name: "Walleth", url: "walleth.org", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=walleth" },
  { id: "argent", name: "Argent", url: "argent.xyz", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=argent" },
  { id: "huobi", name: "Huobi Wallet", url: "huobiwallet.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=huobi" },
  { id: "encrypted", name: "Encrypted Ink", url: "encrypted.ink", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=encrypted" },
  { id: "compound", name: "Compound", url: "compound.finance", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=compound" },
  { id: "polkadot", name: "Polkadot", url: "polkadot.network", popular: true, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=polkadot" },
  { id: "iotex", name: "Iotex", url: "iotex.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=iotex" },
  { id: "coin98", name: "Coin98", url: "coin98.com", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=coin98" },
  { id: "tokenpocket", name: "Token Pocket", url: "tokenpocket.pro", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=tokenpocket" },
  { id: "math", name: "Math Wallet", url: "mathwallet.org", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=math" },
  { id: "1inch", name: "1inch", url: "1inch.io", popular: true, icon: "/wallets/1inch.png" },
  { id: "dharma", name: "Dharma", url: "dharma.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=dharma" },
  { id: "trustvault", name: "Trust Vault", url: "trustology.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=trustvault" },
  { id: "mykey", name: "MYKEY", url: "mykey.org", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=mykey" },
  { id: "atomic", name: "Atomic", url: "atomicwallet.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=atomic" },
  { id: "coolwallet", name: "CoolWallet S", url: "coolwallet.io", popular: false, icon: "https://api.dicebear.com/7.x/identicon/svg?seed=coolwallet" },
];

export default function SelectWallet() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredWallets = WALLETS.filter((wallet) => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === "all" || 
      (activeFilter === "popular" && wallet.popular);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e11]">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Select a Wallet</h1>
            <p className="text-slate-400">Connect your wallet to access decentralized applications and services</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                type="text"
                placeholder="Search wallets..."
                className="pl-10 h-12 bg-[#1b1f24] border-slate-800 text-white focus:ring-cyan-500 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex bg-[#1b1f24] p-1 rounded-lg border border-slate-800">
              {["all", "popular", "recent"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFilter === filter 
                      ? "bg-[#2b3139] text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} Wallets
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWallets.map((wallet) => (
              <motion.div
                key={wallet.id}
                whileHover={{ y: -4 }}
                onClick={() => setLocation(`/connect?wallet=${encodeURIComponent(wallet.name)}`)}
                className="bg-[#1b1f24] border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                    {wallet.icon ? (
                      <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-cover" />
                    ) : (
                      <Wallet className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{wallet.name}</h3>
                      {wallet.popular && (
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Globe className="w-3 h-3" />
                      <span className="truncate">{wallet.url}</span>
                    </div>
                    {wallet.popular && (
                      <Badge variant="secondary" className="mt-2 h-5 text-[10px] bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredWallets.length === 0 && (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No wallets found</h3>
              <p className="text-slate-500">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
