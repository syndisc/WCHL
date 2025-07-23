import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { getUserId } from "@/lib/utils";
import { useLMS } from "@/hooks/useLMS";

const tokenPackages = [
    { icp: 5, edoo: 50 },
    { icp: 10, edoo: 125 },
    { icp: 20, edoo: 300 },
];

const PurchasePage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { addCurrency } = useLMS();

    const handlePurchase = async () => {
        if (selectedPackage === null) return;

        const amount = tokenPackages[selectedPackage].edoo;

        setLoading(true);
        setMessage("");

        try {
            const result = await addCurrency(getUserId(), BigInt(amount));

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6 space-y-6">
            <div className="text-2xl font-bold flex items-center space-x-2">
                <Coins className="text-yellow-500" size={28} />
                <span>Buy Edoo Tokens</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                {tokenPackages.map((pkg, index) => (
                    <Card
                        key={index}
                        onClick={() => setSelectedPackage(index)}
                        className={`cursor-pointer hover:shadow-xl transition border-2 ${selectedPackage === index ? "border-blue-500" : "border-transparent"
                            }`}
                    >
                        <CardContent className="p-6 text-center space-y-2">
                            <div className="text-xl font-semibold">{pkg.icp} ICP</div>
                            <div className="flex gap-2 justify-center items-center">
                                <div className="text-sm text-gray-500">Get {pkg.edoo} Edoo Tokens</div>
                                <img src="/token.png" className="w-6 h-6" alt="" srcset="" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button
                className="w-full max-w-md"
                onClick={handlePurchase}
                disabled={loading || selectedPackage === null}
            >
                {loading ? "Processing..." : "Purchase"}
            </Button>

            {message && <p className="text-sm text-center pt-2">{message}</p>}
        </div>
    );
};

export default PurchasePage;
