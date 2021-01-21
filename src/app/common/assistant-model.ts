import { LeaderData } from "./leader-model";
import { PeriodData } from "./period-model";
import { ShiftData } from "./shift-model";

export interface AssistantData {
    id: number;
    period: PeriodData;
    leader: LeaderData;
    initial: string;
    name: string;
    shift: ShiftData[];
}