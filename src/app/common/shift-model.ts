import { Time } from "@angular/common";

export interface ShiftData{
    id: number;
    assistant_id: number;
    day: number;
    in: Time;
    out: Time;
}