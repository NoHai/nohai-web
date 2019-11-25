export interface CustomDateTimePickerProps {
  value: string;
  dateFormat?: string;
  pickerFormat?: string;
  placeholder?: string;
  cssClass:string;
  isTimePiker?:boolean;
  onValueChange: (date: any) => void;
}
