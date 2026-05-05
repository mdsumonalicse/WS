import React from 'react';
import { ProductionData } from '../types';

interface ProductionCardProps {
  data: ProductionData;
  className?: string;
}

export const ProductionCard: React.FC<ProductionCardProps> = ({ data, className = '' }) => {
  return (
    <div className={`inline-block border-2 border-black p-2.5 bg-white font-sans text-black leading-tight ${className}`} id="production-card" style={{ width: '90mm' }}>
      <div className="grid grid-cols-[60px_1fr_45px_1fr] gap-x-1.5 gap-y-2.5 items-center">
        {/* Row 1 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Buyer:</div>
        <div className="uppercase tracking-tight font-semibold self-end pb-0.5 truncate text-[13px]">{data.buyer}</div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">Size:</div>
        <div className="font-bold text-[15px] text-right leading-none">{data.size}</div>

        {/* Row 2 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Ref. No:</div>
        <div className="uppercase tracking-tight font-semibold self-end pb-0.5 truncate text-[13px]">{data.refNo}</div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B Qty:</div>
        <div className="font-bold text-[15px] text-right leading-none">{data.bQty}</div>

        {/* Row 3 */}
        <div className="font-bold text-[11px] whitespace-nowrap">Style:</div>
        <div className="uppercase tracking-tight font-semibold text-[11px] self-end pb-0.5 truncate leading-none">{data.style}</div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B No:</div>
        <div className="font-medium text-right text-[13px] leading-none">{data.bNo}</div>

        {/* Row 4 */}
        <div className="font-bold text-[11px] whitespace-nowrap">G. Color:</div>
        <div className="uppercase text-[11px] font-semibold self-end pb-0.5 truncate">{data.gColour}</div>
        <div className="font-bold text-[11px] pl-1 whitespace-nowrap">B SL:</div>
        <div className="font-medium text-right whitespace-nowrap text-[13px] leading-none">{data.bSl}</div>

        {/* Row 5 */}
        <div className="font-bold text-[11px] whitespace-nowrap">I. Color:</div>
        <div className="uppercase text-[11px] font-medium col-span-3 self-end pb-0.5 truncate">{data.iColour}</div>
      </div>
    </div>
  );
};
