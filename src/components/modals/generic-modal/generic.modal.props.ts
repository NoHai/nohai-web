export interface GenericModalProps {
  title: string;
  showModal: boolean;
  isInfoModal:boolean;
  onClose: () => void;
  onApplay?:() =>void;
  onReset?:() =>void;
}
