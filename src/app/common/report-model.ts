import { AttendanceData } from "./attendance-model";
import { SpecialShiftData } from "./special-shift-model";

export interface ReportData{
	attendance: AttendanceData,
	special_shift: SpecialShiftData[]
}