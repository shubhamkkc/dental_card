import { CardData } from '@/types/card';
import { formatDate } from '@/lib/formatDate';
import { useState } from 'react';

interface ExportPanelProps {
  card1: CardData;
  card2: CardData;
  enableCard2?: boolean;
  offsetX: number;
  offsetY: number;
  onReset: () => void;
}

const EXP = 11.811; // Export px/mm
const B = { c1: 10, c2: 71, l: 30.5 };

export default function ExportPanel({ card1, card2, enableCard2 = true, offsetX, offsetY, onReset }: ExportPanelProps) {
  const [showToast, setShowToast] = useState(false);

  const c1Top = (B.c1 + offsetY) * EXP;
  const c2Top = (B.c2 + offsetY) * EXP;
  const cLeft = (B.l + offsetX) * EXP;

  const handleExport = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById('export-a4');
      if (!el) return;
      
      // Temporarily bring it to viewport to render
      el.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;width:2479px;height:3508px;background:white;overflow:hidden;';
      
      const canvas = await html2canvas(el, { 
        width: 2479, 
        height: 3508, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
        logging: false 
      } as any);
      
      // Put it back
      el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:2479px;height:3508px;background:white;overflow:hidden;';
      
      const a = document.createElement('a');
      const p1 = (card1.patient || 'patient1').replace(/\s+/g,'_');
      const p2 = (card2.patient || 'patient2').replace(/\s+/g,'_');
      const dt = new Date().toLocaleDateString('en-GB').replace(/\//g,'-');
      a.download = `WarrantyCard_2UP_${p1}_${p2}_${dt}.jpg`;
      a.href = canvas.toDataURL('image/jpeg', 0.98);
      a.click();
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const getScaleStyle = (text: string) => {
    if (!text) return {};
    const len = text.length;
    if (len > 25) return { fontSize: '0.65em' };
    if (len > 20) return { fontSize: '0.75em' };
    if (len > 15) return { fontSize: '0.85em' };
    return {};
  };

  const renderCard = (id: string, data: CardData) => {
    return (
      <div className="excard" id={id} style={{ left: `${cLeft}px`, top: `${id === 'exc1' ? c1Top : c2Top}px` }}>
        <div className="x-wm">Dentsply<br/>Sirona</div>
        <div className="x-circle"></div>
        <div className="x-hdr">
          <div className="x-hdr-title" style={getScaleStyle(data.labName)}>{data.labName}</div>
          <div className="x-hdr-sub">Certified of limited Warranty Hereby Offer Warranty<br />for Following work done in our Lab</div>
        </div>
        <div className="x-body">
          <div className="x-row"><span className="x-lbl">Dentist Name</span><span className="x-col">:</span><span className="x-val" style={getScaleStyle(data.dentist)}>{data.dentist}</span></div>
          <div className="x-row"><span className="x-lbl">Patient Name</span><span className="x-col">:</span><span className="x-val" style={getScaleStyle(data.patient)}>{data.patient}</span></div>
          <div className="x-row"><span className="x-lbl">Job No.</span><span className="x-col">:</span><span className="x-val" style={getScaleStyle(data.jobNo)}>{data.jobNo}</span></div>
          <div className="x-row"><span className="x-lbl">Types of Work</span><span className="x-col">:</span><span className="x-val" style={getScaleStyle(data.workType)}>{data.workType}</span></div>
          <div className="x-row" style={{ marginBottom: 0 }}><span className="x-lbl">Date</span><span className="x-col">:</span><span className="x-val" style={getScaleStyle(data.date)}>{formatDate(data.date)}</span></div>
        </div>
        <div className="x-badge">
          <div className="x-badge-10">{data.warrantyYears}</div>
          <div className="x-badge-yr">YEAR</div>
          <div className="x-badge-wr">WARRANTY</div>
        </div>
        <div className="x-teeth">
          <div className="x-teeth-cross">
            <div className="x-teeth-hline"></div>
            <div className="x-teeth-vline"></div>
            <div className="x-t-lt">{data.teeth.lt || ''}</div>
            <div className="x-t-rt">{data.teeth.rt || ''}</div>
            <div className="x-t-lb">{data.teeth.lb || ''}</div>
            <div className="x-t-rb">{data.teeth.rb || ''}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="actions">
        <button className="btn btn-p" onClick={handleExport}>⬇ Save A4 JPG — Both Cards</button>
        <button className="btn btn-s" onClick={onReset}>↺ Reset All</button>
      </div>

      <div id="export-a4">
        {renderCard('exc1', card1)}
        {enableCard2 && renderCard('exc2', card2)}
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">✅ A4 JPG saved — Both Cards!</div>
    </>
  );
}
