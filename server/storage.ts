import { db } from "./db";
import { wallets, type InsertWallet, type Wallet } from "@shared/schema";

export interface IStorage {
  createWallet(wallet: InsertWallet): Promise<Wallet>;
}

export class DatabaseStorage implements IStorage {
  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const [wallet] = await db
      .insert(wallets)
      .values(insertWallet)
      .returning();
    return wallet;
  }
}

export const storage = new DatabaseStorage();
