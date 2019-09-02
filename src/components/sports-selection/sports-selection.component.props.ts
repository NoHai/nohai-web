
export interface SportSelectionProps {
    sport:string;
    level:number;
    onCloseDrawer?: (sport: string, level: number) => void;
}