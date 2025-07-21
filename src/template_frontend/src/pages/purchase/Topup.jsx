// EdooInAppPurchase.tsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coins } from "lucide-react";
import { template_backend } from "declarations/template_backend"; // Canister import

const EdooInAppPurchase = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await template_backend.addCurrency(userId, BigInt(amount));

      if (result) {
        setMessage("✅ Purchase successful! Edoo tokens added.");
      } else {
        setMessage("❌ Purchase failed. User not found or backend error.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error during purchase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Coins className="text-yellow-500" size={28} />
            <h2 className="text-xl font-bold">Buy Edoo Tokens</h2>
          </div>
          <Input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount of Edoo"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button
            className="w-full"
            onClick={handlePurchase}
            disabled={loading || !userId || amount <= 0}
          >
            {loading ? "Processing..." : "Purchase"}
          </Button>
          {message && <p className="text-sm text-center pt-2">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default EdooInAppPurchase;
