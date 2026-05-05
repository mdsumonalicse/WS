/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Printer, Settings2, FileText, ChevronDown, Plus, X } from 'lucide-react';
import { ProductionCard } from './components/ProductionCard';
import { ProductionData, LabelStyle, defaultLabelStyle } from './types';

const INITIAL_BUYERS = [
  'Calliope', 'Kesko', 'O/Marines', 'US Polo', 'George', 'Gildan', 'Zizzi', 
  'Button', 'Zippar', 'CK', 'Terranova', 'Teddy', 'W/Secret', 'T/Australia', 'ICA', 'RIMI'
];

import html2pdf from 'html2pdf.js';

const DEFAULT_DATA: ProductionData = {
  buyer: 'Calliope',
  refNo: '110---0279',
  style: 'GOKD52770PFANI',
  gColour: 'VAR-AZZVRO.CHIARO',
  iColour: 'VAR-AZZVRO.CHIARO',
  size: 'S',
  bQty: '40',
  bNo: '1',
  bSl: '1-40'
};

export default function App() {
  const [styleConfig, setStyleConfig] = useState<LabelStyle>(() => {
    try {
      const saved = localStorage.getItem('garment_label_style');
      return saved ? JSON.parse(saved) : defaultLabelStyle;
    } catch (e) {
      return defaultLabelStyle;
    }
  });

  const [buyers, setBuyers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('garment_buyers');
      return saved ? JSON.parse(saved) : INITIAL_BUYERS;
    } catch (e) {
      return INITIAL_BUYERS;
    }
  });

  const [newBuyer, setNewBuyer] = useState('');
  const [isAddingBuyer, setIsAddingBuyer] = useState(false);

  const [specData, setSpecData] = useState<ProductionData>(() => {
    try {
      const saved = localStorage.getItem('garment_spec_data');
      return saved ? JSON.parse(saved) : DEFAULT_DATA;
    } catch (e) {
      return DEFAULT_DATA;
    }
  });

  const [labelCount, setLabelCount] = useState(() => {
    try {
      const saved = localStorage.getItem('garment_label_count');
      return saved ? Math.min(200, Math.max(1, parseInt(saved))) : 12;
    } catch (e) {
      return 12;
    }
  });

  useEffect(() => {
    localStorage.setItem('garment_label_style', JSON.stringify(styleConfig));
  }, [styleConfig]);

  useEffect(() => {
    localStorage.setItem('garment_spec_data', JSON.stringify(specData));
  }, [specData]);

  useEffect(() => {
    localStorage.setItem('garment_label_count', labelCount.toString());
  }, [labelCount]);

  useEffect(() => {
    localStorage.setItem('garment_buyers', JSON.stringify(buyers));
  }, [buyers]);

  const handleAddBuyer = () => {
    const trimmed = newBuyer.trim();
    if (trimmed && !buyers.includes(trimmed)) {
      setBuyers([...buyers, trimmed]);
      setSpecData(prev => ({ ...prev, buyer: trimmed }));
      setNewBuyer('');
      setIsAddingBuyer(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSpecData(prev => ({ ...prev, [name]: value }));
  };

  // Generate labels with automatic calculations
  const qty = parseInt(specData.bQty) || 0;
  const startBNo = parseInt(specData.bNo) || 1;

  const labels = Array(labelCount).fill(null).map((_, i) => {
    const currentBNo = startBNo + i;
    const startSL = 1 + (i * qty);
    const endSL = 1 + ((i + 1) * qty) - 1;
    
    return {
      ...specData,
      bNo: currentBNo.toString(),
      bSl: `${startSL}-${endSL}`,
    };
  });

  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.error('Print failed:', err);
    }
  };

  const handleExportPDF = async () => {
    if (isExporting) return;
    
    try {
      setIsExporting(true);
      const element = document.querySelector('.print-area');
      if (!element) {
        throw new Error('Print area element not found');
      }

      // Hide non-print elements temporarily
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach(el => (el as HTMLElement).style.display = 'none');

      const opt = {
        margin: 0,
        filename: `Production-Labels-${specData.buyer}-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 3,
          useCORS: true,
          logging: false,
          letterRendering: false,
          windowWidth: 1200,
          onclone: (clonedDocument: Document) => {
            const style = clonedDocument.createElement('style');
            style.innerHTML = `
              :root {
                --color-zinc-50: #fafafa !important;
                --color-zinc-100: #f4f4f5 !important;
                --color-zinc-200: #e4e4e7 !important;
                --color-black: #000000 !important;
                --color-white: #ffffff !important;
              }
              
              .print-area {
                background: white !important;
                padding: 0 !important;
                width: 210mm !important;
                margin: 0 !important;
                box-shadow: none !important;
                border: none !important;
                display: block !important;
              }
              
              .page-container {
                width: 210mm !important;
                height: 297mm !important;
                padding: 5mm !important;
                box-sizing: border-box !important;
                background: white !important;
                position: relative !important;
              }
              
              .page-container:not(:last-child) {
                page-break-after: always !important;
              }
              
              .grid-container {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                width: 200mm !important;
                column-gap: 2mm !important;
                row-gap: 4mm !important;
                margin: 0 auto !important;
              }
              
              [id="production-card"] {
                width: 65mm !important;
                min-width: 65mm !important;
                border: 2px solid #000000 !important;
                box-sizing: border-box !important;
                color: #000000 !important;
                background: #ffffff !important;
                font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                page-break-inside: avoid !important;
                line-height: 1.2 !important;
                padding-top: 2mm !important; /* Increased to prevent top text cutting */
              }
              
              .card-header {
                border-bottom: 1px solid rgba(0,0,0,0.06) !important; /* Lighter "zapca" underline */
                margin-bottom: 2mm !important;
                padding-bottom: 0.5mm !important;
                display: block !important;
                color: rgba(0,0,0,0.8) !important; /* Slightly faded text for the secondary title */
              }
              
              .font-bold { font-weight: 700 !important; }
              .uppercase { text-transform: uppercase !important; }
              
              /* Force all text to be pure black and avoid any squishing */
              * {
                color: #000000 !important;
                -webkit-font-smoothing: antialiased !important;
                overflow: visible !important;
              }

              /* Selective border color to avoid making light lines too dark */
              [id="production-card"] {
                border-color: #000000 !important;
              }
            `;
            clonedDocument.head.appendChild(style);
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
      
      // Cleanup style visibility
      noPrintElements.forEach(el => (el as HTMLElement).style.display = '');
    } catch (err) {
      console.error('PDF Export failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`PDF Generation failed: ${errorMessage}. If the file didn't start downloading, please use the "Printer" icon and choose "Save as PDF" manually.`);
    } finally {
      setIsExporting(false);
    }
  };

  const renderPages = () => {
    const totalToGenerate = labelCount;
    // 21 labels per sheet (3 cols x 7 rows) fits well on A4
    const itemsPerSheet = 21; 
    
    const pages = [];
    
    for (let i = 0; i < totalToGenerate; i += itemsPerSheet) {
      const pageLabels = [];
      const end = Math.min(i + itemsPerSheet, totalToGenerate);
      
      for (let j = i; j < end; j++) {
        const currentBNo = startBNo + j;
        // Correct calculation for Serial Range (B SL)
        const currentBundleQty = parseInt(specData.bQty) || 0;
        const startSL = 1 + (j * currentBundleQty);
        const endSL = (j + 1) * currentBundleQty;
        
        pageLabels.push({
          ...specData,
          bNo: currentBNo.toString(),
          bSl: `${startSL}-${endSL}`,
        });
      }
      pages.push(pageLabels);
    }

    return pages.map((page, pageIdx) => (
      <div key={pageIdx} className="page-container mb-24 last:mb-0 print:mb-0">
        <div className="grid-container grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-4 print:gap-x-1 print:gap-y-4">
          {page.map((labelData, labelIdx) => (
            <ProductionCard key={labelIdx} data={labelData} styleConfig={styleConfig} />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-100">
      {/* Sidebar: Inputs */}
      <div className="w-full lg:w-[380px] bg-white border-r border-zinc-200 p-5 lg:h-screen lg:fixed lg:top-0 lg:left-0 no-print flex flex-col shadow-xl z-20">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <div className="bg-black p-1.5 rounded text-white">
            <Settings2 size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight uppercase">Garment Spec Pro</h1>
        </div>

        {/* Action Buttons at Top */}
        <div className="grid grid-cols-2 gap-2 mb-6 shrink-0">
          <button 
            onClick={handlePrint}
            className="flex-1 bg-black text-white py-3 rounded flex items-center justify-center gap-2 font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] text-[11px] uppercase tracking-wider"
          >
            <Printer size={16} />
            Print
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className={`flex-1 py-3 rounded flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.98] text-[11px] uppercase tracking-wider ${isExporting ? 'bg-zinc-100 text-zinc-400' : 'bg-white border-2 border-black text-black hover:bg-zinc-50'}`}
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <FileText size={16} />
                Download
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Select Buyer</label>
              <button 
                onClick={() => setIsAddingBuyer(!isAddingBuyer)}
                className={`p-1 rounded-full transition-colors ${isAddingBuyer ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                title={isAddingBuyer ? "Cancel" : "Add Buyer"}
              >
                {isAddingBuyer ? <X size={14} /> : <Plus size={14} />}
              </button>
            </div>

            {isAddingBuyer ? (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  autoFocus
                  value={newBuyer}
                  onChange={(e) => setNewBuyer(e.target.value)}
                  placeholder="New buyer name..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBuyer()}
                  className="flex-1 px-3 py-2 border border-black rounded focus:ring-0 transition-all text-sm font-medium" 
                />
                <button 
                  onClick={handleAddBuyer}
                  className="px-3 py-2 bg-black text-white rounded text-xs font-bold transition-colors uppercase"
                >
                  Save
                </button>
              </motion.div>
            ) : (
              <div className="relative">
                <select 
                  name="buyer"
                  value={specData.buyer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-zinc-200 rounded appearance-none focus:border-black focus:ring-0 transition-all text-sm font-medium bg-white cursor-pointer pr-10"
                >
                  {buyers.map(buyer => (
                    <option key={buyer} value={buyer}>{buyer}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Ref No.</label>
              <input 
                name="refNo"
                value={specData.refNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Size</label>
              <input 
                name="size"
                value={specData.size}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Style Code</label>
            <input 
              name="style"
              value={specData.style}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">G. Color</label>
            <input 
              name="gColour"
              value={specData.gColour}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">I. Color</label>
            <input 
              name="iColour"
              value={specData.iColour}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">B Qty (Per Bundle)</label>
              <input 
                name="bQty"
                type="number"
                value={specData.bQty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium font-mono" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Start B. No.</label>
              <input 
                name="bNo"
                type="number"
                value={specData.bNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium font-mono" 
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-zinc-100">
            <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-wider flex items-center gap-1.5">
              <Settings2 size={12} />
              Layout Adjustments
            </label>
            
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Font Size</span>
                  <span>{styleConfig.fontSize}px</span>
                </div>
                <input 
                  type="range"
                  min="6"
                  max="16"
                  step="0.5"
                  value={styleConfig.fontSize}
                  onChange={(e) => setStyleConfig(prev => ({ ...prev, fontSize: parseFloat(e.target.value) }))}
                  className="w-full accent-black h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Move Left/Right</span>
                  <span>{styleConfig.contentXOffset}px</span>
                </div>
                <input 
                  type="range"
                  min="-20"
                  max="20"
                  value={styleConfig.contentXOffset}
                  onChange={(e) => setStyleConfig(prev => ({ ...prev, contentXOffset: parseInt(e.target.value) }))}
                  className="w-full accent-black h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-zinc-100">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Items on Sheet</label>
                <input 
                  type="number"
                  min="1"
                  max="200"
                  value={labelCount}
                  onChange={(e) => setLabelCount(Math.min(200, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-zinc-200 rounded focus:border-black focus:ring-0 transition-all text-sm font-medium font-mono" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Preview */}
      <div className="flex-1 bg-zinc-100 p-8 lg:h-screen lg:overflow-y-auto preview-scroll relative lg:ml-[380px]">
        <div className="max-w-[1000px] mx-auto bg-white p-6 shadow-2xl border border-zinc-200 min-h-full print-area">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100 no-print">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[10px] font-bold uppercase tracking-widest italic">Live Preview</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-medium">
              A4 PORTRAIT • {labelCount} LABELS
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={JSON.stringify(specData) + labelCount}
          >
            {renderPages()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
