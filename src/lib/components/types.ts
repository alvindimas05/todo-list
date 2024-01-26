import type { RowDataPacket } from "mysql2";

export type StatusEnum = "dijadwalkan" | "dikerjakan" | "selesai";

export interface TodoData {
    id: number;
    title: string;
    status: StatusEnum;
    hours: number;
    minutes: number;
}

export interface TodoDatabase extends RowDataPacket {
    id: number;
    title: string;
    time: string;
    status: string;
    user_id: string;
}