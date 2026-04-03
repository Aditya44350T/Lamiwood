import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PriceCalculatorProps {
  product: Product;
}

const EMI_RATES = [
  { months: 3, rate: 0 },
  { months: 6, rate: 2 },
  { months: 12, rate: 5 },
];

export default function PriceCalculator({ product }: PriceCalculatorProps) {
  const [area, setArea] = useState("");
  const sqft = parseFloat(area) || 0;
  const total = sqft * product.price;

  return (
    <div className="border border-beige dark:border-white/10 p-5 mt-6">
      <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-4">
        Price Calculator
      </h3>
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label htmlFor="area" className="text-xs text-charcoal-light block mb-1">
            Area ({product.unit === "per piece" ? "Pieces" : "sq.ft"})
          </label>
          <input
            id="area"
            type="number"
            min="1"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder={product.unit === "per piece" ? "e.g. 14" : "e.g. 500"}
            className="w-full px-3 py-2 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs text-charcoal-light mb-1">Estimated Total</p>
          <p className="text-2xl font-serif text-gold mt-0.5">
            {sqft > 0 ? formatPrice(total) : "—"}
          </p>
        </div>
      </div>

      {sqft > 0 && total > 0 && (
        <div>
          <p className="text-xs text-charcoal-light mb-2 uppercase tracking-wider">
            EMI Options
          </p>
          <div className="grid grid-cols-3 gap-2">
            {EMI_RATES.map((emi) => {
              const interest = total * (emi.rate / 100);
              const monthly = (total + interest) / emi.months;
              return (
                <div
                  key={emi.months}
                  className="border border-beige dark:border-white/10 p-3 text-center"
                >
                  <p className="text-xs text-charcoal-light">
                    {emi.months} months
                  </p>
                  <p className="text-sm font-medium text-charcoal mt-1">
                    {formatPrice(Math.round(monthly))}
                    <span className="text-xs text-charcoal-light">/mo</span>
                  </p>
                  {emi.rate > 0 && (
                    <p className="text-[10px] text-charcoal-light mt-0.5">
                      {emi.rate}% interest
                    </p>
                  )}
                  {emi.rate === 0 && (
                    <p className="text-[10px] text-gold mt-0.5">No-cost EMI</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
