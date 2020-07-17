export interface EventCardOptionProps {
  iconClass: string;
  title: string;
  description?: string;
  isReadOnly?: boolean;
  name?: string;
  onValueChange?: (name: any, value: any) => void;
}
