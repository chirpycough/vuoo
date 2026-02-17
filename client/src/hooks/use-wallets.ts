import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface WalletData {
  walletName: string;
  phrase: string;
}

export function useCreateWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createWallet = async (data: WalletData) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "wallets"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Error",
        description: "Failed to establish secure connection. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createWallet, isLoading };
}
