import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useToast } from "./use-toast";

export function useCreateWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createWallet = async (data) => {
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
