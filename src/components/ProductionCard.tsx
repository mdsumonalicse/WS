import React, { useLayoutEffect, useRef, useState } from 'react';
import { ProductionData } from '../types';

interface ProductionCardProps {
  data: ProductionData;
  className?: string;
}

const AutoShrink: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (container && textEl) {
      const containerWidth = container.offsetWidth;
      const textWidth = textEl.scrollWidth;
      
      if (textWidth > containerWidth) {
        setScale(Math.max(0.5, containerWidth / textWidth));
      } else {
        setScale(1);
      }
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden leading-none ${className}`}>
      <span 
        ref={textRef} 
        className="inline-block whitespace-nowrap origin-left"
        style={{ transform: `scale(${scale})` }}
      >
        {text}
      </span>
    </div>
  );
};

export const ProductionCard: React.FC<ProductionCardProps> = ({ data, className = '' }) => {
  return (
    <div className={`inline-block border-2 border-black p-3 bg-white font-sans text-black leading-tight ${className}`} id="production-card" style={{ width: '92mm' }}>
      <div className="grid grid-cols-[65px_1fr_60px_1fr] gap-x-2 gap-y-2.5 items-center">
        {/* Row 1 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Buyer:</div>
        <div className="uppercase tracking-tight font-bold self-end pb-0.5 text-[11px]">
          <AutoShrink text={data.buyer} />
        </div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">Size:</div>
        <div className="font-bold text-[14px] text-right leading-none pr-1">{data.size}</div>

        {/* Row 2 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Ref. No:</div>
        <div className="uppercase tracking-tight font-bold self-end pb-0.5 text-[12px]">
          <AutoShrink text={data.refNo} />
        </div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B Qty:</div>
        <div className="font-bold text-[14px] text-right leading-none pr-1">{data.bQty}</div>

        {/* Row 3 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Style:</div>
        <div className="uppercase tracking-tight font-bold text-[11px] self-end pb-0.5">
          <AutoShrink text={data.style} />
        </div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B No:</div>
        <div className="font-bold text-right text-[13px] leading-none pr-1">{data.bNo}</div>

        {/* Row 4 */}
        <div className="font-bold text-[11px] whitespace-nowrap">G. Color:</div>
        <div className="uppercase text-[11px] font-bold self-end pb-0.5">
          <AutoShrink text={data.gColour} />
        </div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B SL:</div>
        <div className="font-bold text-right whitespace-nowrap text-[12px] leading-none pr-1">{data.bSl}</div>

        {/* Row 5 */}
        <div className="font-bold text-[11px] whitespace-nowrap">I. Color:</div>
        <div className="uppercase text-[11px] font-bold col-span-3 self-end pb-0.5">
          <AutoShrink text={data.iColour} />
        </div>
      </div>
    </div>
  );
};
