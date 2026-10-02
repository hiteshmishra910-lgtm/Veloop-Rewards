import React, { useState } from 'react';
import { X, ArrowDownUp, RefreshCw, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface SwapCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  veBalance: number;
  sveBalance: number;
  onExecuteSwap: (fromCurrency: 'VE' | 'SVE', fromAmount: number, toAmount: number) => void;
}

export const SwapCenterModal: React.FC<SwapCenterModalProps> = ({
  isOpen,
  onClose,
  veBalance,
  sveBalance,
  onExecuteSwap,
}) => {
  const [direction, setDirection] = useState<'VE_TO_SVE' | 'SVE_TO_VE'>('VE_TO_SVE');
  const [amount, setAmount] = useState<string>('200');
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapSuccess, setSwapSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const rateVeToSve = 0.75;
  const parsedAmount = Math.max(0, parseFloat(amount) || 0);

  const maxBalance = direction === 'VE_TO_SVE' ? veBalance : sveBalance;
  const estimatedOutput =
    direction === 'VE_TO_SVE' ? parsedAmount * rateVeToSve : parsedAmount / rateVeToSve;

  const handleToggleDirection = () => {
    setDirection((prev) => (prev === 'VE_TO_SVE' ? 'SVE_TO_VE' : 'VE_TO_SVE'));
  };

  const handleSetPercentage = (pct: number) => {
    const val = Math.floor((maxBalance * pct) / 100);
    setAmount(val.toString());
  };

  const handleConfirmSwap = () => {
    if (parsedAmount <= 0 || parsedAmount > maxBalance) return;
    setIsSwapping(true);

    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      if (direction === 'VE_TO_SVE') {
        onExecuteSwap('VE', parsedAmount, estimatedOutput);
      } else {
        onExecuteSwap('SVE', parsedAmount, estimatedOutput);
      }

      setTimeout(() => {
        setSwapSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#1a1e32] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="swap-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ArrowDownUp size={20} />
            </div>
            <div>
              <h3 id="swap-title" className="text-lg font-bold text-white">
                Swap Center
              </h3>
              <p className="text-xs text-slate-400">
                Convert platform reward balances with zero slippage.
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

        {/* Swap Form */}
        <div className="py-4 space-y-4">
          {/* From Card */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">You Pay</span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                Available: {formatNumber(maxBalance)} {direction === 'VE_TO_SVE' ? 'VE' : 'SVE'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                min="1"
                max={maxBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none font-mono"
              />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg shrink-0">
                <span className="text-xs font-bold text-amber-300">
                  {direction === 'VE_TO_SVE' ? 'VE Points' : 'SVE Staked'}
                </span>
              </div>
            </div>

            {/* Percentage shortcuts */}
            <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 text-[11px]">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handleSetPercentage(pct)}
                  className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  {pct === 100 ? 'Max' : `${pct}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Direction Switcher Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={handleToggleDirection}
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:rotate-180 duration-300"
              title="Reverse swap direction"
            >
              <ArrowDownUp size={16} />
            </button>
          </div>

          {/* To Card */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">You Receive (Estimated)</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} />
                Guaranteed Rate
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-bold text-blue-300 font-mono tabular-nums">
                {formatNumber(Math.round(estimatedOutput * 100) / 100)}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg shrink-0">
                <span className="text-xs font-bold text-blue-300">
                  {direction === 'VE_TO_SVE' ? 'SVE Staked' : 'VE Points'}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details & Summary */}
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Conversion Rate</span>
              <span className="font-mono text-slate-200">
                {direction === 'VE_TO_SVE' ? '1 VE = 0.75 SVE' : '1 SVE = 1.33 VE'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Protocol Routing Fee</span>
              <span className="text-emerald-400 font-medium">0.00 VE (Platform Subsidized)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Execution Time</span>
              <span className="text-slate-200 font-mono">Instant (&lt; 1s)</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleConfirmSwap}
              disabled={isSwapping || swapSuccess || parsedAmount <= 0 || parsedAmount > maxBalance}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isSwapping ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Executing On-Chain Routing...</span>
                </>
              ) : swapSuccess ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>Swap Completed Successfully!</span>
                </>
              ) : parsedAmount > maxBalance ? (
                <span>Insufficient Balance</span>
              ) : (
                <span>Confirm Currency Swap</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
