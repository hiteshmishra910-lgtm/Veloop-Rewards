import React, { useState } from 'react';
import { X, CreditCard, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  veBalance: number;
  onRedeemRewards: (veCost: number, rewardLabel: string) => void;
}

interface RedemptionOption {
  id: string;
  name: string;
  type: 'UPI' | 'VOUCHER';
  valueText: string;
  veCost: number;
  provider: string;
  badge: string;
}

const REDEMPTION_CATALOG: RedemptionOption[] = [
  {
    id: 'upi-500',
    name: 'Direct UPI Bank Payout',
    type: 'UPI',
    valueText: '₹500 Instant Transfer',
    veCost: 5000,
    provider: 'National Payments Rail',
    badge: 'Fastest Payout',
  },
  {
    id: 'amazon-500',
    name: 'Amazon Pay E-Gift Card',
    type: 'VOUCHER',
    valueText: '$25 / ₹500 Voucher Code',
    veCost: 5000,
    provider: 'Amazon Digital Services',
    badge: 'Popular Retail',
  },
  {
    id: 'upi-200',
    name: 'Direct UPI Mini Payout',
    type: 'UPI',
    valueText: '₹200 Instant Transfer',
    veCost: 2000,
    provider: 'National Payments Rail',
    badge: 'Low Minimum',
  },
  {
    id: 'steam-20',
    name: 'Steam Wallet Card',
    type: 'VOUCHER',
    valueText: '$20 Digital Wallet Code',
    veCost: 4000,
    provider: 'Valve Corporation',
    badge: 'Instant Key',
  },
  {
    id: 'apple-25',
    name: 'Apple Gift Card',
    type: 'VOUCHER',
    valueText: '$25 App Store & iTunes',
    veCost: 5000,
    provider: 'Apple Inc.',
    badge: 'Universal',
  },
];

export const ExchangeModal: React.FC<ExchangeModalProps> = ({
  isOpen,
  onClose,
  veBalance,
  onRedeemRewards,
}) => {
  const [selectedOption, setSelectedOption] = useState<RedemptionOption>(REDEMPTION_CATALOG[0]);
  const [upiId, setUpiId] = useState<string>('user@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<{
    id: string;
    amount: string;
    item: string;
    timestamp: string;
  } | null>(null);

  if (!isOpen) return null;

  const canAfford = veBalance >= selectedOption.veCost;

  const handleRedeem = () => {
    if (!canAfford) return;
    setIsProcessing(true);

    setTimeout(() => {
      const generatedReceipt = {
        id: `TXN-VLP-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: selectedOption.valueText,
        item: selectedOption.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setReceipt(generatedReceipt);
      setIsProcessing(false);
      onRedeemRewards(selectedOption.veCost, selectedOption.name);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#1a1e32] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exchange-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 id="exchange-title" className="text-lg font-bold text-white">
                Exchange Center (Redemption Vault)
              </h3>
              <p className="text-xs text-slate-400">
                Redeem eligible VEs into real-world payout rails and e-gift vouchers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          {receipt ? (
            /* Digital Redemption Receipt */
            <div className="p-6 bg-slate-900 rounded-2xl border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                  Redemption Dispatched
                </span>
                <h4 className="text-xl font-bold text-white mt-1">{receipt.amount}</h4>
                <p className="text-xs text-slate-400 mt-1">{receipt.item}</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-left text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="text-amber-300">{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Settlement Time:</span>
                  <span>{receipt.timestamp} (Instant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rail:</span>
                  <span>{selectedOption.type === 'UPI' ? upiId : 'Digital Code Sent'}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-white transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Wallet Available Balance */}
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Available Reward Balance:</span>
                <span className="text-sm font-bold text-amber-300 font-mono tabular-nums">
                  {formatNumber(veBalance)} VE
                </span>
              </div>

              {/* Catalog List */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Select Payout Option</span>
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {REDEMPTION_CATALOG.map((opt) => {
                    const isSelected = selectedOption.id === opt.id;
                    const affordable = veBalance >= opt.veCost;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedOption(opt)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-800 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/50'
                        } ${!affordable ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                              opt.type === 'UPI'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {opt.type === 'UPI' ? 'UPI' : <ShoppingBag size={16} />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{opt.name}</span>
                              <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                                {opt.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 block">{opt.valueText}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-300 font-mono tabular-nums block">
                            {formatNumber(opt.veCost)} VE
                          </span>
                          <span className="text-[10px] text-slate-400">0% Fee</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Destination Input (UPI or Email) */}
              {selectedOption.type === 'UPI' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Beneficiary UPI Virtual Payment Address (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@upi"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              ) : (
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Voucher claim code will be generated instantly and mirrored to account.</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  onClick={handleRedeem}
                  disabled={!canAfford || isProcessing}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Payout Rail...</span>
                  ) : !canAfford ? (
                    <span>Insufficient VE Balance (Requires {formatNumber(selectedOption.veCost)} VE)</span>
                  ) : (
                    <>
                      <span>Redeem for {selectedOption.valueText}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
