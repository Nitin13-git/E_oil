'use client';

import { useEffect, useState } from 'react';

export default function ProcessAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: 'Organic Farming', subtitle: 'From Nature' },
    { title: 'Hand Harvesting', subtitle: 'With Care' },
    { title: 'Steam Distillation', subtitle: 'Pure Extraction' },
    { title: 'Quality Packing', subtitle: 'To Your Door' },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-[var(--color-muted)] to-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-semibold">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">From Nature to Your Home</h2>
          <p className="text-gray-600 mt-4 text-lg">Watch how we carefully extract and deliver the purest essential oils, preserving nature&apos;s goodness in every drop.</p>
        </div>

        {/* Main Animation Container */}
        <div className="relative max-w-5xl mx-auto pb-16">
          {/* Animated Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-1000"
              style={{ width: `${(activeStep + 1) * 25}%` }}
            />
            {/* Animated dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-accent)] rounded-full shadow-lg transition-all duration-1000"
              style={{ left: `${(activeStep + 1) * 25 - 2}%` }}
            >
              <div className="absolute inset-0 bg-[var(--color-accent)] rounded-full animate-ping" />
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1: Trees/Farming */}
            <div className={`text-center transition-all duration-500 ${activeStep === 0 ? 'scale-110' : 'scale-100 opacity-70'}`}>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Ground */}
                  <ellipse cx="60" cy="110" rx="50" ry="8" fill="#8B4513" opacity="0.3" />

                  {/* Tree 1 - Left */}
                  <g className="origin-bottom" style={{ transformOrigin: '35px 100px' }}>
                    <rect x="32" y="70" width="6" height="30" fill="#8B4513" rx="2">
                      <animate attributeName="height" values="30;32;30" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <ellipse cx="35" cy="55" rx="20" ry="25" fill="#22c55e">
                      <animate attributeName="ry" values="25;27;25" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="35" cy="55" rx="15" ry="20" fill="#4ade80" opacity="0.7" />
                    {/* Leaves falling */}
                    <circle r="3" fill="#22c55e">
                      <animate attributeName="cx" values="25;20;25" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="40;100;40" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Tree 2 - Center (larger) */}
                  <g>
                    <rect x="57" y="55" width="8" height="45" fill="#8B4513" rx="2" />
                    <ellipse cx="60" cy="35" rx="28" ry="35" fill="#16a34a">
                      <animate attributeName="ry" values="35;38;35" dur="2.5s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="60" cy="35" rx="22" ry="28" fill="#22c55e" opacity="0.8" />
                    <ellipse cx="60" cy="35" rx="15" ry="20" fill="#4ade80" opacity="0.6" />
                    {/* Swaying animation */}
                    <animateTransform attributeName="transform" type="rotate" values="-2 60 100;2 60 100;-2 60 100" dur="4s" repeatCount="indefinite" />
                  </g>

                  {/* Tree 3 - Right */}
                  <g style={{ transformOrigin: '85px 100px' }}>
                    <rect x="82" y="75" width="5" height="25" fill="#8B4513" rx="2" />
                    <ellipse cx="85" cy="60" rx="18" ry="22" fill="#22c55e">
                      <animate attributeName="ry" values="22;24;22" dur="3.5s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="85" cy="60" rx="14" ry="17" fill="#4ade80" opacity="0.7" />
                  </g>

                  {/* Sun */}
                  <circle cx="100" cy="20" r="12" fill="#fbbf24">
                    <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Sun rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <line
                      key={i}
                      x1={100 + Math.cos(angle * Math.PI / 180) * 15}
                      y1={20 + Math.sin(angle * Math.PI / 180) * 15}
                      x2={100 + Math.cos(angle * Math.PI / 180) * 20}
                      y2={20 + Math.sin(angle * Math.PI / 180) * 20}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                    </line>
                  ))}

                  {/* Butterflies */}
                  <g>
                    <ellipse rx="4" ry="2" fill="#ec4899" opacity="0.8">
                      <animate attributeName="cx" values="20;80;20" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="30;50;30" dur="6s" repeatCount="indefinite" />
                    </ellipse>
                  </g>
                </svg>
              </div>
              <div className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ${activeStep === 0 ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                <div className="text-3xl mb-2">🌳</div>
                <h3 className="font-bold text-gray-900">{steps[0].title}</h3>
                <p className="text-sm text-gray-500">{steps[0].subtitle}</p>
              </div>
            </div>

            {/* Step 2: Harvesting */}
            <div className={`text-center transition-all duration-500 ${activeStep === 1 ? 'scale-110' : 'scale-100 opacity-70'}`}>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Basket */}
                  <path d="M30,70 Q30,100 60,100 Q90,100 90,70" fill="#d4a853" stroke="#b8860b" strokeWidth="2" />
                  <path d="M25,70 L95,70" stroke="#b8860b" strokeWidth="3" strokeLinecap="round" />
                  <path d="M35,70 L35,95" stroke="#b8860b" strokeWidth="1" opacity="0.5" />
                  <path d="M50,70 L50,98" stroke="#b8860b" strokeWidth="1" opacity="0.5" />
                  <path d="M70,70 L70,98" stroke="#b8860b" strokeWidth="1" opacity="0.5" />
                  <path d="M85,70 L85,95" stroke="#b8860b" strokeWidth="1" opacity="0.5" />

                  {/* Leaves in basket */}
                  <ellipse cx="45" cy="68" rx="8" ry="5" fill="#22c55e" />
                  <ellipse cx="60" cy="65" rx="10" ry="6" fill="#4ade80" />
                  <ellipse cx="75" cy="68" rx="8" ry="5" fill="#22c55e" />
                  <ellipse cx="55" cy="62" rx="7" ry="4" fill="#16a34a" />
                  <ellipse cx="68" cy="63" rx="6" ry="4" fill="#4ade80" />

                  {/* Hand with leaves - animated */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0;0,-30;0,0" dur="2s" repeatCount="indefinite" />
                    {/* Hand */}
                    <ellipse cx="60" cy="35" rx="12" ry="8" fill="#fcd9b6" />
                    <rect x="55" y="35" width="10" height="15" fill="#fcd9b6" rx="3" />
                    {/* Fingers */}
                    <rect x="48" y="30" width="4" height="12" fill="#fcd9b6" rx="2" />
                    <rect x="53" y="28" width="4" height="14" fill="#fcd9b6" rx="2" />
                    <rect x="58" y="27" width="4" height="15" fill="#fcd9b6" rx="2" />
                    <rect x="63" y="28" width="4" height="14" fill="#fcd9b6" rx="2" />
                    <rect x="68" y="30" width="4" height="12" fill="#fcd9b6" rx="2" />
                    {/* Leaves in hand */}
                    <ellipse cx="60" cy="25" rx="15" ry="8" fill="#22c55e" opacity="0.9" />
                    <ellipse cx="55" cy="22" rx="8" ry="5" fill="#4ade80" />
                    <ellipse cx="65" cy="23" rx="7" ry="4" fill="#16a34a" />
                  </g>

                  {/* Falling leaves animation */}
                  {[0, 1, 2].map((i) => (
                    <g key={i}>
                      <path d="M0,0 Q5,3 3,8 Q0,10 -3,8 Q-5,3 0,0" fill="#22c55e">
                        <animateTransform attributeName="transform" type="translate"
                          values={`${40 + i * 20},20;${45 + i * 15},60;${40 + i * 20},20`}
                          dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                        <animateTransform attributeName="transform" type="rotate"
                          values="0;360;0" dur="2s" repeatCount="indefinite" additive="sum" />
                        <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                      </path>
                    </g>
                  ))}

                  {/* Sparkles */}
                  <circle cx="30" cy="50" r="2" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="90" cy="45" r="2" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <div className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ${activeStep === 1 ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                <div className="text-3xl mb-2">🌿</div>
                <h3 className="font-bold text-gray-900">{steps[1].title}</h3>
                <p className="text-sm text-gray-500">{steps[1].subtitle}</p>
              </div>
            </div>

            {/* Step 3: Distillation/Filtering */}
            <div className={`text-center transition-all duration-500 ${activeStep === 2 ? 'scale-110' : 'scale-100 opacity-70'}`}>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Distillation Flask - Left */}
                  <g>
                    {/* Flask body */}
                    <path d="M15,95 L15,60 Q15,50 25,50 L35,50 Q45,50 45,60 L45,95 Q45,105 30,105 Q15,105 15,95"
                      fill="none" stroke="#64748b" strokeWidth="2" />
                    {/* Liquid in flask */}
                    <path d="M17,95 L17,70 Q17,65 27,65 L33,65 Q43,65 43,70 L43,95 Q43,103 30,103 Q17,103 17,95"
                      fill="#22c55e" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0.8;0.6" dur="1s" repeatCount="indefinite" />
                    </path>
                    {/* Bubbles */}
                    <circle r="2" fill="white" opacity="0.6">
                      <animate attributeName="cx" values="25;28;25" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="90;70;90" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle r="1.5" fill="white" opacity="0.5">
                      <animate attributeName="cx" values="32;30;32" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="85;65;85" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                    <circle r="1" fill="white" opacity="0.4">
                      <animate attributeName="cx" values="28;26;28" dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="88;68;88" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Steam pipe */}
                  <path d="M35,50 Q50,50 50,35 L80,35 Q90,35 90,45"
                    fill="none" stroke="#64748b" strokeWidth="2" />

                  {/* Steam particles */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle key={i} r="3" fill="#e2e8f0" opacity="0.6">
                      <animate attributeName="cx" values={`${40 + i * 10};${42 + i * 10};${40 + i * 10}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="35;25;35" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                      <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    </circle>
                  ))}

                  {/* Collection Flask - Right */}
                  <g>
                    {/* Flask body */}
                    <path d="M75,95 L75,55 Q75,45 90,45 L90,45 Q105,45 105,55 L105,95 Q105,110 90,110 Q75,110 75,95"
                      fill="none" stroke="#64748b" strokeWidth="2" />
                    {/* Collected oil */}
                    <path d="M77,95 L77,75 Q77,70 90,70 Q103,70 103,75 L103,95 Q103,108 90,108 Q77,108 77,95"
                      fill="#d4a853" opacity="0.7">
                      <animate attributeName="d"
                        values="M77,95 L77,90 Q77,85 90,85 Q103,85 103,90 L103,95 Q103,108 90,108 Q77,108 77,95;
                                M77,95 L77,75 Q77,70 90,70 Q103,70 103,75 L103,95 Q103,108 90,108 Q77,108 77,95;
                                M77,95 L77,75 Q77,70 90,70 Q103,70 103,75 L103,95 Q103,108 90,108 Q77,108 77,95"
                        dur="3s" repeatCount="indefinite" />
                    </path>
                    {/* Drip */}
                    <circle r="2" fill="#d4a853">
                      <animate attributeName="cx" values="90;90;90" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="50;80;50" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Flame under left flask */}
                  <g>
                    <ellipse cx="30" cy="112" rx="12" ry="4" fill="#f97316" opacity="0.3" />
                    <path d="M25,110 Q30,95 30,100 Q35,95 30,110" fill="#f97316">
                      <animate attributeName="d"
                        values="M25,110 Q30,95 30,100 Q35,95 30,110;M25,110 Q28,92 30,98 Q32,92 35,110;M25,110 Q30,95 30,100 Q35,95 30,110"
                        dur="0.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M27,110 Q30,100 30,103 Q33,100 33,110" fill="#fbbf24">
                      <animate attributeName="d"
                        values="M27,110 Q30,100 30,103 Q33,100 33,110;M27,110 Q29,98 30,102 Q31,98 33,110;M27,110 Q30,100 30,103 Q33,100 33,110"
                        dur="0.4s" repeatCount="indefinite" />
                    </path>
                  </g>

                  {/* Labels */}
                  <text x="30" y="118" textAnchor="middle" fontSize="6" fill="#64748b">Heat</text>
                  <text x="90" y="118" textAnchor="middle" fontSize="6" fill="#64748b">Pure Oil</text>
                </svg>
              </div>
              <div className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ${activeStep === 2 ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                <div className="text-3xl mb-2">⚗️</div>
                <h3 className="font-bold text-gray-900">{steps[2].title}</h3>
                <p className="text-sm text-gray-500">{steps[2].subtitle}</p>
              </div>
            </div>

            {/* Step 4: Packing */}
            <div className={`text-center transition-all duration-500 ${activeStep === 3 ? 'scale-110' : 'scale-100 opacity-70'}`}>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Conveyor belt */}
                  <rect x="10" y="85" width="100" height="8" rx="4" fill="#64748b" />
                  <g>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <rect key={i} x={15 + i * 18} y="87" width="12" height="4" rx="2" fill="#475569">
                        <animate attributeName="x" values={`${15 + i * 18};${-3 + i * 18};${15 + i * 18}`} dur="2s" repeatCount="indefinite" />
                      </rect>
                    ))}
                  </g>

                  {/* Bottle 1 - Moving */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="-30,0;100,0;-30,0" dur="4s" repeatCount="indefinite" />
                    {/* Bottle */}
                    <rect x="25" y="55" width="20" height="30" rx="3" fill="url(#bottleGrad)" stroke="#d0d0d0" />
                    <rect x="30" y="48" width="10" height="10" rx="2" fill="#64748b" />
                    <rect x="27" y="60" width="16" height="20" rx="2" fill="white" stroke="#22c55e" />
                    <rect x="27" y="60" width="16" height="5" fill="#22c55e" />
                    {/* Liquid */}
                    <rect x="27" y="68" width="16" height="10" fill="#22c55e" opacity="0.4" rx="1" />
                  </g>

                  {/* Bottle 2 */}
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0,0;130,0;0,0" dur="4s" repeatCount="indefinite" begin="1s" />
                    <rect x="25" y="55" width="20" height="30" rx="3" fill="url(#bottleGrad)" stroke="#d0d0d0" />
                    <rect x="30" y="48" width="10" height="10" rx="2" fill="#64748b" />
                    <rect x="27" y="60" width="16" height="20" rx="2" fill="white" stroke="#22c55e" />
                    <rect x="27" y="60" width="16" height="5" fill="#22c55e" />
                    <rect x="27" y="68" width="16" height="10" fill="#9b7bb8" opacity="0.4" rx="1" />
                  </g>

                  {/* Box */}
                  <g>
                    <rect x="70" y="45" width="40" height="40" fill="#d4a853" stroke="#b8860b" strokeWidth="2" rx="3" />
                    <rect x="70" y="45" width="40" height="10" fill="#b8860b" rx="3" />
                    <line x1="90" y1="55" x2="90" y2="85" stroke="#b8860b" strokeWidth="1" opacity="0.5" />
                    {/* Botanica Bliss text on box */}
                    <text x="90" y="70" textAnchor="middle" fontSize="5" fill="#1e3d1a" fontWeight="bold">BOTANICA</text>
                    <text x="90" y="77" textAnchor="middle" fontSize="5" fill="#1e3d1a" fontWeight="bold">BLISS</text>
                    {/* Leaf icon */}
                    <path d="M88,60 Q92,55 90,62 Q88,55 88,60" fill="#22c55e" />
                  </g>

                  {/* Robotic arm */}
                  <g>
                    <rect x="55" y="10" width="10" height="30" fill="#475569" rx="2" />
                    <rect x="50" y="38" width="20" height="8" fill="#64748b" rx="2">
                      <animateTransform attributeName="transform" type="rotate" values="0 60 42;-15 60 42;0 60 42" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <circle cx="60" cy="42" r="5" fill="#22c55e" />
                  </g>

                  {/* Sparkles */}
                  <circle cx="95" cy="35" r="2" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="105" cy="40" r="1.5" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" begin="0.3s" />
                  </circle>

                  <defs>
                    <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e8e8e8" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#d0d0d0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ${activeStep === 3 ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-bold text-gray-900">{steps[3].title}</h3>
                <p className="text-sm text-gray-500">{steps[3].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Step indicators for mobile */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeStep === index ? 'bg-[var(--color-primary)] w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6" style={{ marginTop: '50px' }}>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center card-hover flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">100% Organic</h3>
            <p className="text-sm text-gray-600">No pesticides or chemicals used in our farming process</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center card-hover flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Lab Tested</h3>
            <p className="text-sm text-gray-600">Every batch tested for purity and potency</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center card-hover flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Carefully packed and shipped within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
