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
      <div className="card-header text-center w-full font-bold uppercase tracking-[0.2em] mb-1.5 border-b border-[rgba(0,0,0,0.1)] pb-0.5" style={{ fontSize: `${Math.max(6, (styleConfig?.fontSize ?? 10) - 4)}px` }}>
        Elastic Bundle Card
      </div>
      <div 
        className="grid grid-cols-[max-content_min-content_1fr_max-content_min-content_auto] gap-x-1 gap-y-1 items-center"
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {/* Row 1 */}
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>Buyer</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="uppercase tracking-tight font-bold self-end pb-0.5">
          <AutoShrink text={data.buyer} fontSize={valueSize} />
        </div>
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>Size</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.size}</div>

        {/* Row 2 */}
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>Ref. No</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="uppercase tracking-tight font-bold self-end pb-0.5">
          <AutoShrink text={data.refNo} fontSize={valueSize} />
        </div>
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B Qty</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.bQty}</div>

        {/* Row 3 */}
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>Style</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="uppercase tracking-tight font-bold self-end pb-0.5">
          <AutoShrink text={data.style} fontSize={valueSize} />
        </div>
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B No</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="font-bold leading-none" style={{ fontSize: `${bigValueSize}px` }}>{data.bNo}</div>

        {/* Row 4 */}
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>G. Color</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="uppercase font-bold self-end pb-0.5">
          <AutoShrink text={data.gColour} fontSize={valueSize} />
        </div>
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>B SL</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="font-bold whitespace-nowrap leading-none" style={{ fontSize: `${valueSize}px` }}>{data.bSl}</div>

        {/* Row 5 */}
        <div className="font-bold whitespace-nowrap" style={{ fontSize: `${labelSize}px` }}>I. Color</div>
        <div className="font-bold" style={{ fontSize: `${labelSize}px` }}>:</div>
        <div className="uppercase font-bold col-span-4 self-end pb-0.5">
          <AutoShrink text={data.iColour} fontSize={valueSize} />
        </div>
      </div>
    </div>
  );
};
