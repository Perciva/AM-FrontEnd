import { PeriodData } from "./period-model"

export interface SpecialShiftData{
    id: number;
    period_id: number;
    description: string;
    assistant_ids: string;
    date: string;
    _in: string;
    _out: string;
}