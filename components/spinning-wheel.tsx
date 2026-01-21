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

    const segmentMidAngle = randomIndex * segmentAngle + segmentAngle / 2;
    const angleToRotate = -segmentMidAngle;
    const variance = (Math.random() - 0.5) * (segmentAngle * 0.3);

    const newRotation = extraRotation + angleToRotate + variance;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete?.(selectedPrize);
      setTimeout(() => {
        setRotation(0);
      }, 100);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full max-w-136 aspect-square flex items-center justify-center group">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-30 pointer-events-none"
          style={{ marginTop: "0px" }}
        >
          <svg width="40" height="30" viewBox="0 0 40 30">
            <polygon
              points="20,30 5,0 35,0"
              fill="#F59E0B"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
          </svg>
        </div>

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

            const midAngle = startAngle + segmentAngle / 2;
            const textRadius = radius * 0.62;
            const textPos = polarToCartesian(
              centerX,
              centerY,
              textRadius,
              midAngle,
            );

            const words = prize.label.split(" ");
            const lines: string[] = [];

            if (words.length === 1) {
              lines.push(prize.label);
            } else if (words.length === 2) {
              lines.push(words[0]);
              lines.push(words[1]);
            } else {
              const mid = Math.ceil(words.length / 2);
              lines.push(words.slice(0, mid).join(" "));
              lines.push(words.slice(mid).join(" "));
            }

            return (
              <g key={prize.id}>
                <path
                  d={pathData}
                  fill={prize.color}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="3"
                />

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

          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="4"
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient
                id="centerGradientFixed"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F9FAFB" />
                <stop offset="100%" stopColor="#F3F4F6" />
              </linearGradient>
              <filter id="dropShadowFixed">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="0" dy="4" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="60"
              cy="60"
              r="58"
              fill="#E5E7EB"
              stroke="none"
              onClick={handleSpin}
              style={{
                cursor: isSpinning || disabled ? "not-allowed" : "pointer",
                opacity: isSpinning ? 0.5 : 1,
              }}
              className={`transition-all duration-300 ${!isSpinning && !disabled ? "animate-pulse" : ""}`}
              filter="url(#dropShadowFixed)"
            />

            <circle
              cx="60"
              cy="60"
              r="53"
              fill="url(#centerGradientFixed)"
              stroke="none"
              onClick={handleSpin}
              style={{
                cursor: isSpinning || disabled ? "not-allowed" : "pointer",
                filter: isSpinning
                  ? "brightness(0.95)"
                  : "drop-shadow(0 6px 12px rgba(0,0,0,0.2))",
              }}
              className="transition-all duration-300"
            >
              {!isSpinning && !disabled && (
                <animate
                  attributeName="r"
                  values="53;55;53"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            <text
              x="60"
              y="60"
              fontSize="36"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#F59E0B"
              onClick={handleSpin}
              style={{
                textShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
                letterSpacing: "3px",
                cursor: isSpinning || disabled ? "not-allowed" : "pointer",
                userSelect: "none",
                opacity: isSpinning ? 0.7 : 1,
              }}
              className={`transition-all duration-300 ${!isSpinning && !disabled ? "animate-pulse" : ""}`}
            >
              {isSpinning ? (
                <tspan>
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                  ...
                </tspan>
              ) : (
                "SPIN"
              )}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
