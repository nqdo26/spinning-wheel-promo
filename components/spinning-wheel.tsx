"use client";

import * as React from "react";
import { useLanguage } from "@/lib/language-context";

export type Prize = {
  id: string;
  label: string;
  color: string;
  textColor?: string;
};

type SpinningWheelProps = {
  prizes: Prize[];
  onSpinComplete?: (prize: Prize) => void;
  disabled?: boolean;
};

// Helper to convert polar coordinates to cartesian
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Helper to create SVG arc path for wheel segment
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

export function SpinningWheel({
  prizes,
  onSpinComplete,
  disabled = false,
}: SpinningWheelProps) {
  const { t } = useLanguage();
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);

  const wheelSize = 546;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize / 2 - 10;
  const segmentAngle = 360 / prizes.length;

  const handleSpin = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    const minSpins = 5;
    const extraRotation = 360 * minSpins;
    const targetSegmentRotation = randomIndex * segmentAngle;
    const offset = segmentAngle / 2;
    const variance = (Math.random() - 0.5) * (segmentAngle * 0.3);

    const newRotation =
      rotation + extraRotation + targetSegmentRotation + offset + variance;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete?.(selectedPrize);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Wheel Container */}
      <div className="relative w-full max-w-136 aspect-square flex items-center justify-center">
        {/* Fixed Pointer at Top */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className="w-0 h-0 border-l-18 border-r-18 border-t-36 border-l-transparent border-r-transparent border-t-yellow-500 drop-shadow-2xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-14 border-r-14 border-t-28 border-l-transparent border-r-transparent border-t-yellow-400" />
          </div>
        </div>

        {/* Rotating SVG Wheel with Text */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${wheelSize} ${wheelSize}`}
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
            maxWidth: "546px",
            maxHeight: "546px",
          }}
        >
          {/* Draw each segment */}
          {prizes.map((prize, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const pathData = describeArc(
              centerX,
              centerY,
              radius,
              startAngle,
              endAngle,
            );

            // Calculate text position and rotation
            const midAngle = startAngle + segmentAngle / 2;
            const textRadius = radius * 0.62;
            const textPos = polarToCartesian(
              centerX,
              centerY,
              textRadius,
              midAngle,
            );

            // Split long text into multiple lines
            const words = prize.label.split(" ");
            const lines: string[] = [];

            if (words.length === 1) {
              lines.push(prize.label);
            } else if (words.length === 2) {
              lines.push(words[0]);
              lines.push(words[1]);
            } else {
              // For 3+ words, try to balance the lines
              const mid = Math.ceil(words.length / 2);
              lines.push(words.slice(0, mid).join(" "));
              lines.push(words.slice(mid).join(" "));
            }

            return (
              <g key={prize.id}>
                {/* Segment path */}
                <path
                  d={pathData}
                  fill={prize.color}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="3"
                />

                {/* Text rotated with segment - multi-line support */}
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill={prize.textColor || "white"}
                  fontSize="14"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    letterSpacing: "0.3px",
                  }}
                >
                  {lines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x={textPos.x}
                      dy={lineIndex === 0 ? (lines.length === 1 ? 0 : -9) : 18}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Segment dividers */}
          {prizes.map((_, index) => {
            const angle = index * segmentAngle;
            const innerPoint = polarToCartesian(
              centerX,
              centerY,
              radius * 0.25,
              angle,
            );
            const outerPoint = polarToCartesian(
              centerX,
              centerY,
              radius,
              angle,
            );

            return (
              <line
                key={`divider-${index}`}
                x1={innerPoint.x}
                y1={innerPoint.y}
                x2={outerPoint.x}
                y2={outerPoint.y}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}

          {/* Outer border */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="4"
          />

          {/* Center circle with gradient */}
          <defs>
            <linearGradient
              id="centerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <radialGradient id="centerShadow">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </radialGradient>
          </defs>

          {/* Outer center ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.24}
            fill="white"
            stroke="none"
          />

          {/* Inner center circle with gradient */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.22}
            fill="url(#centerGradient)"
            stroke="white"
            strokeWidth="3"
          />

          {/* Center text - SPIN */}
          <text
            x={centerX}
            y={centerY}
            fontSize="36"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
              letterSpacing: "2px",
            }}
          >
            SPIN
          </text>
        </svg>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || disabled}
        title={disabled && !isSpinning ? t.wheel.emailRequired : undefined}
        className="px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:hover:from-gray-400 disabled:hover:to-gray-500 transform hover:scale-105 active:scale-95"
        aria-busy={isSpinning}
        aria-label={isSpinning ? t.wheel.spinning : t.hero.spinButton}
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t.wheel.spinning}
          </span>
        ) : (
          t.hero.spinButton
        )}
      </button>
    </div>
  );
}
