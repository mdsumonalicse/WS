import React, { useLayoutEffect, useRef, useState } from 'react';
import { ProductionData, LabelStyle } from '../types';

interface ProductionCardProps {
  data: ProductionData;
  styleConfig?: LabelStyle;
  className?: string;
}

const AutoShrink: React.FC<{ text: string; fontSize: number; className?: string }> = ({ text, fontSize, className }) => {
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
        setScale(Math.max(0.4, containerWidth / textWidth));
      } else {
        setScale(1);
      }
    }
  }, [text, fontSize]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden leading-none ${className}`}>
      <span 
        ref={textRef} 
        className="inline-block whitespace-nowrap origin-left"
        style={{ transform: `scale(${scale})`, fontSize: `${fontSize}px` }}
      >
        {text}
      </span>
    </div>
  );
};

export const ProductionCard: React.FC<ProductionCardProps> = ({ data, styleConfig, className = '' }) => {
  const baseSize = styleConfig?.fontSize ?? 10;
  const xOffset = styleConfig?.contentXOffset ?? 0;

  const labelSize = Math.max(7, baseSize - 1);
  const valueSize = baseSize;
  const bigValueSize = baseSize + 2;

  return (
    <div 
      className={`inline-block border-2 border-black p-2 bg-white font-sans text-black leading-tight ${className}`} 
      id="production-card" 
      style={{ 
        width: '65mm'
      }}
    >
      <div className="card-header text-center w-full font-bold uppercase tracking-[0.2em] mb-2 border-b border-black/10 pb-0.5" style={{ fontSize: `${Math.max(6, (styleConfig?.fontSize ?? 10) - 4)}px` }}>
        Elastic Bundle Card
      </div>
      <div 
        className="space-y-1"
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {/* Row 1: Buyer & Size */}
        <div className="flex items-end gap-1 overflow-hidden">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="font-bold whitespace-nowrap shrink-0" style={{ fontSize: `${labelSize}px` }}>Buyer</span>
            <span className="font-bold shrink-0" style={{ fontSize: `${labelSize}px` }}>:</span>
            <div className="uppercase tracking-tight font-bold overflow-hidden">
              <AutoShrink text={data.buyer} fontSize={valueSize} />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <span className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>Size</span>
            <span className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</span>
            <span className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.size}</span>
          </div>
        </div>

        {/* Row 2: Ref No & B Qty */}
        <div className="flex items-end gap-1 overflow-hidden">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="font-bold whitespace-nowrap shrink-0" style={{ fontSize: `${labelSize}px` }}>Ref. No</span>
            <span className="font-bold shrink-0" style={{ fontSize: `${labelSize}px` }}>:</span>
            <div className="uppercase tracking-tight font-bold overflow-hidden">
              <AutoShrink text={data.refNo} fontSize={valueSize} />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <span className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B Qty</span>
            <span className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</span>
            <span className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.bQty}</span>
          </div>
        </div>

        {/* Row 3: Style & B No */}
        <div className="flex items-end gap-1 overflow-hidden">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="font-bold whitespace-nowrap shrink-0" style={{ fontSize: `${labelSize}px` }}>Style</span>
            <span className="font-bold shrink-0" style={{ fontSize: `${labelSize}px` }}>:</span>
            <div className="uppercase tracking-tight font-bold overflow-hidden">
              <AutoShrink text={data.style} fontSize={valueSize} />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <span className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B No</span>
            <span className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</span>
            <span className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.bNo}</span>
          </div>
        </div>

        {/* Row 4: G. Color & B SL */}
        <div className="flex items-end gap-1 overflow-hidden">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <span className="font-bold whitespace-nowrap shrink-0" style={{ fontSize: `${labelSize}px` }}>G. Color</span>
            <span className="font-bold shrink-0" style={{ fontSize: `${labelSize}px` }}>:</span>
            <div className="uppercase font-bold overflow-hidden">
              <AutoShrink text={data.gColour} fontSize={valueSize} />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <span className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B SL</span>
            <span className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</span>
            <span className="font-bold whitespace-nowrap leading-none" style={{ fontSize: `${valueSize}px` }}>{data.bSl}</span>
          </div>
        </div>

        {/* Row 5: I. Color */}
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="font-bold whitespace-nowrap shrink-0" style={{ fontSize: `${labelSize}px` }}>I. Color</span>
          <span className="font-bold shrink-0" style={{ fontSize: `${labelSize}px` }}>:</span>
          <div className="uppercase font-bold overflow-hidden flex-1">
            <AutoShrink text={data.iColour} fontSize={valueSize} />
          </div>
        </div>
      </div>
    </div>
  );
};
