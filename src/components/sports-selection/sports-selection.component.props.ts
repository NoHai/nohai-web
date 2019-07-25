
export interface SportSelectionProps {
    sport:string;
    level:string;
    onCloseDrawer?: (sport: string, level: string) => void;
}