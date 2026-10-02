import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, RefreshCw, Terminal, AlertCircle, Sparkles } from 'lucide-react';

interface CaptchaTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteTask: (rewardAmount: number) => void;
}

export const CaptchaTaskModal: React.FC<CaptchaTaskModalProps> = ({
  isOpen,
  onClose,
  onCompleteTask,
}) => {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Generate random 6-character fintech security token
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    setErrorMessage('');
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setErrorMessage('Please enter the captcha characters above');
      return;
    }

    if (userInput.trim().toUpperCase() !== captchaCode) {
      setErrorMessage('Verification failed. Characters do not match.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      onCompleteTask(25);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#1a1e32] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="captcha-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 id="captcha-title" className="text-lg font-bold text-white">
                Human Verification Task
              </h3>
              <p className="text-xs text-slate-400">
                Complete accuracy-checked challenges to earn platform VEs.
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

        {/* Challenge Box */}
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Terminal size={14} className="text-blue-400" />
              <span>Security Queue Item: #TASK-918</span>
            </div>
            <span className="font-semibold text-amber-300">+25 VE Reward</span>
          </div>

          {/* Visual Captcha Canvas Simulation */}
          <div className="relative p-5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between overflow-hidden">
            {/* Background noise grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#3B82F6 1px, transparent 1px), radial-gradient(#F59E0B 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px',
              }}
            />

            <div className="relative z-10 flex items-center gap-3">
              {captchaCode.split('').map((char, index) => (
                <span
                  key={index}
                  className="font-mono text-2xl font-black tracking-widest text-slate-100 select-none transform inline-block"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (4 + index * 2)}deg) translateY(${
                      (index % 3) * 2 - 2
                    }px)`,
                    color: index % 2 === 0 ? '#93C5FD' : '#FDE047',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={generateCaptcha}
              className="relative z-10 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Refresh captcha code"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* Verification Form */}
          {isSuccess ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>
              <h4 className="text-sm font-bold text-emerald-300">Task Verified Successfully!</h4>
              <p className="text-xs text-slate-300">
                +25 VE has been credited to your active rewards wallet.
              </p>
              <button
                type="button"
                onClick={generateCaptcha}
                className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-white transition-colors"
              >
                Solve Next Task in Queue
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label htmlFor="captcha-input" className="block text-xs font-semibold text-slate-300 mb-1">
                  Type the security characters shown above:
                </label>
                <input
                  id="captcha-input"
                  type="text"
                  maxLength={6}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono uppercase tracking-wider text-white focus:outline-none focus:border-blue-400"
                  autoFocus
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Validating Human Submission...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Submit & Verify Task (+25 VE)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
