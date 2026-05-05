import React from 'react';
import { ProductionData } from '../types';

interface ProductionCardProps {
  data: ProductionData;
  className?: string;
}

export const ProductionCard: React.FC<ProductionCardProps> = ({ data, className = '' }) => {
  return (
    <div className={`relative border border-black p-1.5 pt-3 bg-white font-sans text-black leading-none ${className}`} id="production-card" style={{ width: '66mm', height: '40mm', boxSizing: 'border-box' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[8px] font-black uppercase tracking-tighter border-x border-black whitespace-nowrap leading-none py-0.5">
        Elastic Bundle Card
      </div>
      <div className="grid grid-cols-[45px_6px_1fr_35px_6px_45px] gap-x-1 gap-y-1.5 items-start h-full">
        {/* Row 1 */}
        <div className="font-bold text-[10px] whitespace-nowrap uppercase">Buyer</div>
        <div className="text-[10px] font-black text-center">:</div>
        <div className="uppercase tracking-tight font-black break-words text-[10px] leading-tight pl-0.5 pr-1">{data.buyer}</div>
        <div className="font-bold text-[10px] whitespace-nowrap uppercase">Size</div>
        <div className="text-[10px] font-black text-center">:</div>
        <div className="font-black text-[14px] text-right leading-none pr-0.5 pl-0.5">{data.size}</div>

        {/* Row 2 */}
        <div className="font-bold text-[10px] whitespace-nowrap uppercase">Ref. No</div>
        <div className="text-[10px] font-black text-center">:</div>
        <div className="uppercase tracking-tight font-black break-words text-[10px] leading-tight pl-0.5 pr-1 uppercase">{data.refNo}</div>
        <div className="font-bold text-[10px] whitespace-nowrap uppercase">B Qty</div>
        <div className="text-[10px] font-black text-center">:</div>
        <div className="font-black text-[14px] text-right leading-none pr-0.5 pl-0.5">{data.bQty}</div>

        {/* Row 3 */}
        <div className="font-bold text-[10px] whitespace-nowrap uppercase mt-0.5">Style</div>
        <div className="text-[10px] font-black text-center mt-0.5">:</div>
        <div className="uppercase tracking-tight font-black text-[9px] break-all leading-tight mt-0.5 pl-0.5 pr-1">{data.style}</div>
        <div className="font-bold text-[10px] whitespace-nowrap uppercase mt-0.5">B No</div>
        <div className="text-[10px] font-black text-center mt-0.5">:</div>
        <div className="font-black text-right text-[12px] leading-none mt-0.5 pr-0.5 pl-0.5">{data.bNo}</div>

        {/* Row 4 */}
        <div className="font-bold text-[10px] whitespace-nowrap uppercase mt-0.5">G. Color</div>
        <div className="text-[10px] font-black text-center mt-0.5">:</div>
        <div className="uppercase tracking-tight font-black text-[8px] break-words leading-tight mt-0.5 pl-0.5 pr-1">{data.gColour}</div>
        <div className="font-bold text-[10px] whitespace-nowrap uppercase mt-0.5">B SL</div>
        <div className="text-[10px] font-black text-center mt-0.5">:</div>
        <div className="font-black text-right break-words text-[11px] leading-[1.1] mt-0.5 pr-0.5 pl-0.5">{data.bSl}</div>

        {/* Row 5 */}
        <div className="font-bold text-[10px] whitespace-nowrap uppercase mt-0.5">I. Color</div>
        <div className="text-[10px] font-black mt-0.5 text-center">:</div>
        <div className="uppercase text-[10px] font-bold col-span-4 break-words leading-tight mt-0.5 pl-0.5 pr-1">{data.iColour}</div>
      </div>
    </div>
  );
};
