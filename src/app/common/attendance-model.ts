import { AssistantData } from "./assistant-model";

export interface AttendanceData {
    id: number;
    assistant: AssistantData
    date: string;	
    _in: string;	
    _out: string;	
    in_permission: string;	
    out_permission: string;	
    special_permission: string;	
    in_permission_description: string;	
    out_permission_description: string;	
    special_permission_description: string;	
}