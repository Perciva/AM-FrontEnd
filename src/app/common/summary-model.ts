import { SummaryInData } from "./summary-in-model";
import { SummaryOutData } from "./summary-out-model";
import { SummarySpecialData } from "./summary-special-model";

export interface SummaryData{
    leader: String;
    assistant: String;
    in: SummaryInData[];
    out: SummaryOutData[];
    special: SummarySpecialData[];
    unverified: number;
}