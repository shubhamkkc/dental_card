import { CardData } from '@/types/card';
import { formatDate } from '@/lib/formatDate';

interface A4PreviewProps {
  card1: CardData;
  card2: CardData;
  enableCard2?: boolean;
  offsetX: number;
  offsetY: number;
}

const PRV = 496 / 210; // Preview scale factor
const B = { c1: 10, c2: 71, l: 30.5 }; // Base positions in mm

export default function A4Preview({ card1, card2, enableCard2 = true, offsetX, offsetY }: A4PreviewProps) {
  const c1Top = (B.c1 + offsetY) * PRV;
  const c2Top = (B.c2 + offsetY) * PRV;
  const cLeft = (B.l + offsetX) * PRV;

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
      <div className="cprev" id={id} style={{ left: `${cLeft}px`, top: `${id === 'cp1' ? c1Top : c2Top}px` }}>
        <div className="c-wm">Dentsply<br/>Sirona</div>
        <div className="c-circle"></div>
        <div className="c-hdr">
          <div className="c-hdr-title" style={getScaleStyle(data.labName )}>{data.labName }</div>
          <div className="c-hdr-sub">Certified of limited Warranty Hereby Offer Warranty<br />for Following work done in our Lab</div>
        </div>
        <div className="c-body">
          <div className="c-row"><span className="c-lbl">Dentist Name</span><span className="c-col">:</span><span className="c-val" style={getScaleStyle(data.dentist)}>{data.dentist}</span></div>
          <div className="c-row"><span className="c-lbl">Patient Name</span><span className="c-col">:</span><span className="c-val" style={getScaleStyle(data.patient)}>{data.patient}</span></div>
          <div className="c-row"><span className="c-lbl">Job No.</span><span className="c-col">:</span><span className="c-val" style={getScaleStyle(data.jobNo)}>{data.jobNo}</span></div>
          <div className="c-row"><span className="c-lbl">Types of Work</span><span className="c-col">:</span><span className="c-val" style={getScaleStyle(data.workType)}>{data.workType}</span></div>
          <div className="c-row"><span className="c-lbl">Date</span><span className="c-col">:</span><span className="c-val" style={getScaleStyle(data.date)}>{formatDate(data.date)}</span></div>
        </div>
        <div className="c-badge">
          <div className="c-badge-10">{data.warrantyYears}</div>
          <div className="c-badge-yr">YEAR</div>
          <div className="c-badge-wr">WARRANTY</div>
        </div>
        <div className="c-teeth">
          <div className="c-teeth-cross">
            <div className="c-teeth-hline"></div>
            <div className="c-teeth-vline"></div>
            <div className="c-t-lt">{data.teeth.lt || ''}</div>
            <div className="c-t-rt">{data.teeth.rt || ''}</div>
            <div className="c-t-lb">{data.teeth.lb || ''}</div>
            <div className="c-t-rb">{data.teeth.rb || ''}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="preview-panel">
      <div className="preview-lbl">A4 Live Preview · Card 1 (Blue) + Card 2 (Green)</div>

      <div className="a4-wrap">
        <div className="guide-h" style={{ top: '24px' }}></div>
        <div className="guide-h" style={{ top: '147px' }}></div>
        <div className="guide-h" style={{ top: '168px' }}></div>
        <div className="guide-h" style={{ top: '292px' }}></div>
        <div className="guide-v" style={{ left: '72px' }}></div>
        <div className="guide-v" style={{ left: '269px' }}></div>

        {renderCard('cp1', card1)}
        {enableCard2 && renderCard('cp2', card2)}
      </div>

      <div className="a4-info">
        Page: <strong>2479 × 3508 px</strong> &nbsp;·&nbsp;
        Each card: <strong>986 × 614 px</strong> &nbsp;·&nbsp;
        Both cards update live as you type
      </div>
    </div>
  );
}
