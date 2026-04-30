import { CardData } from '@/types/card';

interface CardFormProps {
  cardNumber: 1 | 2;
  data: CardData;
  onChange: (data: CardData) => void;
  isOptional?: boolean;
  isEnabled?: boolean;
  onToggle?: (val: boolean) => void;
}

export default function CardForm({ cardNumber, data, onChange, isOptional, isEnabled = true, onToggle }: CardFormProps) {
  const isCard2 = cardNumber === 2;
  const badgeClass = isCard2 ? 'badge-2' : 'badge-1';
  
  const updateField = (field: keyof CardData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const updateTeeth = (field: keyof CardData['teeth'], value: string) => {
    onChange({ ...data, teeth: { ...data.teeth, [field]: value } });
  };

  return (
    <>
      <div className="sec-hdr" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <span className={`badge ${badgeClass}`}>CARD {cardNumber}</span> Customer Details
        </div>
        {isOptional && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.7rem', color: 'var(--text)', textTransform: 'none', letterSpacing: 'normal' }}>
            <input type="checkbox" checked={isEnabled} onChange={(e) => onToggle?.(e.target.checked)} />
            Enable Card
          </label>
        )}
      </div>
      {(!isOptional || isEnabled) && (
        <div className={`fields ${isCard2 ? 'card2-sec' : ''}`}>
          <div className="field">
            <label>Lab Name</label>
          <input type="text" value={data.labName || ''} onChange={(e) => updateField('labName', e.target.value)} placeholder="Lab Name" />
        </div>
        <div className="field">
          <label>Dentist Name</label>
          <input type="text" value={data.dentist} onChange={(e) => updateField('dentist', e.target.value)} placeholder="Dentist Name" />
        </div>
        <div className="field">
          <label>Patient Name</label>
          <input type="text" value={data.patient} onChange={(e) => updateField('patient', e.target.value)} placeholder="Patient Name" />
        </div>
        <div className="field">
          <label>Job No.</label>
          <input type="text" value={data.jobNo} onChange={(e) => updateField('jobNo', e.target.value)} placeholder="Job Number" />
        </div>
        <div className="field">
          <label>Types of Work</label>
          <input type="text" value={data.workType} onChange={(e) => updateField('workType', e.target.value)} placeholder="e.g. Zirconia Classic" />
        </div>
        <div className="row2">
          <div className="field">
            <label>Date</label>
            <input type="date" value={data.date} onChange={(e) => updateField('date', e.target.value)} />
          </div>
          <div className="field">
            <label>Warranty (Yrs)</label>
            <input type="number" value={data.warrantyYears} min="1" max="25" onChange={(e) => updateField('warrantyYears', parseInt(e.target.value) || 10)} />
          </div>
        </div>
        <div className="field">
          <label>Teeth — 4 Sections</label>
          <div className="teeth-grid">
            <div className="tq">
              <span>LT Left Top</span>
              <input className="teeth-inp" type="text" value={data.teeth.lt} placeholder="—" onChange={(e) => updateTeeth('lt', e.target.value)} />
            </div>
            <div className="tq">
              <span>RT Right Top</span>
              <input className="teeth-inp" type="text" value={data.teeth.rt} placeholder="—" onChange={(e) => updateTeeth('rt', e.target.value)} />
            </div>
            <div className="tq">
              <span>LB Left Bot</span>
              <input className="teeth-inp" type="text" value={data.teeth.lb} placeholder="—" onChange={(e) => updateTeeth('lb', e.target.value)} />
            </div>
            <div className="tq">
              <span>RB Right Bot</span>
              <input className="teeth-inp" type="text" value={data.teeth.rb} placeholder="—" onChange={(e) => updateTeeth('rb', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
