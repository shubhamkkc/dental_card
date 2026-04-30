'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CardForm from '@/components/CardForm';
import PrintOffsetSliders from '@/components/PrintOffsetSliders';
import A4Preview from '@/components/A4Preview';
import ExportPanel from '@/components/ExportPanel';
import { CardData } from '@/types/card';

const initialCard1: CardData = {
  labName: '',
  dentist: '',
  patient: '',
  jobNo: '',
  workType: 'Zirconia Classic',
  date: new Date().toISOString().split('T')[0],
  warrantyYears: 10,
  teeth: { lt: '', rt: '', lb: '', rb: '' }
};

const initialCard2: CardData = {
  labName: '',
  dentist: '',
  patient: '',
  jobNo: '',
  workType: 'Zirconia Classic',
  date: new Date().toISOString().split('T')[0],
  warrantyYears: 10,
  teeth: { lt: '', rt: '', lb: '', rb: '' }
};

export default function Home() {
  const [card1, setCard1] = useState<CardData>(initialCard1);
  const [card2, setCard2] = useState<CardData>(initialCard2);
  const [enableCard2, setEnableCard2] = useState<boolean>(true);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  const handleReset = () => {
    setCard1(initialCard1);
    setCard2(initialCard2);
    setEnableCard2(true);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <>
      <Header />
      <div className="app">
        <div className="form-panel">
          <CardForm cardNumber={1} data={card1} onChange={setCard1} />
          <div className="divider"></div>
          <CardForm 
            cardNumber={2} 
            data={card2} 
            onChange={setCard2} 
            isOptional={true} 
            isEnabled={enableCard2} 
            onToggle={setEnableCard2} 
          />
          <PrintOffsetSliders 
            offsetX={offsetX} 
            offsetY={offsetY} 
            setOffsetX={setOffsetX} 
            setOffsetY={setOffsetY} 
          />
          <div className="note">
            <strong>🖨️ PVC Card Print — YouTube Format</strong>
            Page: <b>8.263″ × 11.693″</b> · <b>300 dpi</b><br />
            Rows: <b>1 · 6.2 · 7.1 · 12.4 cm</b> &nbsp;|&nbsp; Cols: <b>3.05 · 11.4 cm</b><br />
            Print at <b>100% scale / No margins / Manual feed</b>
          </div>
          <ExportPanel 
            card1={card1} 
            card2={card2} 
            enableCard2={enableCard2}
            offsetX={offsetX} 
            offsetY={offsetY} 
            onReset={handleReset} 
          />
        </div>
        <A4Preview 
          card1={card1} 
          card2={card2} 
          enableCard2={enableCard2}
          offsetX={offsetX} 
          offsetY={offsetY} 
        />
      </div>
    </>
  );
}
