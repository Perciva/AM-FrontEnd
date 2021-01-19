import { PeriodService } from "../service/period-services.service";
import { PeriodData } from "./period-model"

export interface SpecialShiftData{
    id: number;
    period: PeriodData;
    description: string;
    assistant_ids: string;
    date: string;
    _in: string;
    _out: string;
}