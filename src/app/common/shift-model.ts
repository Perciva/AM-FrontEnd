import { Time } from "@angular/common";
import { AssistantData } from "./assistant-model";

export interface ShiftData{
    id: number;
    assistant: AssistantData;
    day: number;
    _in: string;
    _out: string;
}