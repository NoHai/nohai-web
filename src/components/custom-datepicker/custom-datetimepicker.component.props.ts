export interface CustomDateTimePickerProps {
  value: string;
  dateFormat?: string;
  pickerFormat?: string;
  placeholder?: string;
  cssClass:string;
  isTimePicker?:boolean;
  onValueChange: (date: any) => void;
}
