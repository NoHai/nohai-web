export interface EventFooterProps {
  showLeftButton: boolean;
  ShowCenterButton: boolean;
  showRightButton: boolean;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  onCenterButtonClick?: () => void;
  isValid: boolean;
}
