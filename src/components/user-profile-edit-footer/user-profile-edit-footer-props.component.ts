export interface UserProfileEditFooterProps {
  showLeftButton: boolean;
  ShowCenterButton: boolean;
  showRightButton: boolean;
  LeftButtonIcon?: string;
  CenterButtonIcon?: string;
  RightButtonIcon?: string;
  LeftButtonText?: string;
  CenterButtonText?: string;
  RightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  onCenterButtonClick?: () => void;
  isValid: () => boolean;
}
