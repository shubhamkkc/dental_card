interface PrintOffsetSlidersProps {
  offsetX: number;
  offsetY: number;
  setOffsetX: (val: number) => void;
  setOffsetY: (val: number) => void;
}

export default function PrintOffsetSliders({ offsetX, offsetY, setOffsetX, setOffsetY }: PrintOffsetSlidersProps) {
  return (
    <>
      <div className="divider"></div>
      <div className="sec-hdr" style={{ borderTop: 'none' }}>Fine-Tune Print Position</div>
      <div className="slider-grp">
        <div className="sl-lbl">Horizontal (X) <span>{offsetX >= 0 ? '+' : ''}{offsetX} mm</span></div>
        <input type="range" min="-20" max="20" value={offsetX} step="1" onChange={(e) => setOffsetX(parseInt(e.target.value))} />
      </div>
      <div className="slider-grp" style={{ paddingBottom: '10px' }}>
        <div className="sl-lbl">Vertical (Y) <span>{offsetY >= 0 ? '+' : ''}{offsetY} mm</span></div>
        <input type="range" min="-20" max="20" value={offsetY} step="1" onChange={(e) => setOffsetY(parseInt(e.target.value))} />
      </div>
    </>
  );
}
