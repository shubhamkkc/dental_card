export interface CardData {
  labName: string;
  dentist: string;
  patient: string;
  jobNo: string;
  workType: string;
  date: string;
  warrantyYears: number;
  teeth: {
    lt: string;
    rt: string;
    lb: string;
    rb: string;
  };
}
