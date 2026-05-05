import React from 'react';
import { ProductionData } from '../types';

interface ProductionCardProps {
  data: ProductionData;
  className?: string;
}

export const ProductionCard: React.FC<ProductionCardProps> = ({ data, className = '' }) => {
  return (
    <div className={`relative border border-black p-2 pt-3.5 bg-white font-sans text-black leading-none ${className}`} id="production-card" style={{ width: '68mm', height: '42mm', boxSizing: 'border-box' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[8px] font-black uppercase tracking-tighter border-x border-black whitespace-nowrap leading-none py-0.5">
        Elastic Bundle Card
      </div>
      <div className="grid grid-cols-[48px_6px_1fr_38px_6px_45px] gap-x-0.5 gap-y-1.5 items-start h-full pr-0.5">
        {/* Row 1 */}
        <div className="font-bold text-[10.5px] whitespace-nowrap uppercase">Buyer</div>
        <div className="text-[10.5px] font-black text-center">:</div>
        <div className="uppercase tracking-tight font-black truncate text-[10.5px] pb-0.5">{data.buyer}</div>
        <div className="font-bold text-[10.5px] pl-1 whitespace-nowrap uppercase">Size</div>
        <div className="text-[10.5px] font-black text-center">:</div>
        <div className="font-black text-[15px] text-right leading-none pr-1">{data.size}</div>

        {/* Row 2 */}
        <div className="font-bold text-[10.5px] whitespace-nowrap uppercase">Ref. No</div>
        <div className="text-[10.5px] font-black text-center">:</div>
        <div className="uppercase tracking-tight font-black truncate text-[10.5px] pb-0.5">{data.refNo}</div>
        <div className="font-bold text-[10.5px] pl-1 whitespace-nowrap uppercase">B Qty</div>
        <div className="text-[10.5px] font-black text-center">:</div>
        <div className="font-black text-[15px] text-right leading-none pr-1">{data.bQty}</div>

        {/* Row 3 */}
        <div className="font-bold text-[10.5px] whitespace-nowrap uppercase mt-2.5">Style</div>
        <div className="text-[10.5px] font-black text-center mt-2.5">:</div>
        <div className="uppercase tracking-tight font-black text-[10px] break-words leading-tight mt-2.5">{data.style}</div>
        <div className="font-bold text-[10.5px] pl-1 whitespace-nowrap uppercase mt-2.5">B No</div>
        <div className="text-[10.5px] font-black text-center mt-2.5">:</div>
        <div className="font-black text-right text-[13px] leading-none mt-2.5 pr-1">{data.bNo}</div>

        {/* Row 4 */}
        <div className="font-bold text-[10.5px] whitespace-nowrap uppercase mt-1">G. Color</div>
        <div className="text-[10.5px] font-black text-center mt-1">:</div>
        <div className="uppercase tracking-tight font-black text-[10px] break-words leading-tight mt-1">{data.gColour}</div>
        <div className="font-bold text-[10.5px] pl-1 whitespace-nowrap uppercase mt-1">B SL</div>
        <div className="text-[10.5px] font-black text-center mt-1">:</div>
        <div className="font-black text-right whitespace-nowrap text-[13px] leading-none mt-1 pr-1">{data.bSl}</div>

        {/* Row 5 */}
        <div className="font-bold text-[10.5px] whitespace-nowrap uppercase mt-1">I. Color</div>
        <div className="text-[10.5px] font-black mt-1 text-center">:</div>
        <div className="uppercase text-[10.5px] font-bold col-span-4 break-words leading-tight mt-1">{data.iColour}</div>
      </div>
    </div>
  );
};
