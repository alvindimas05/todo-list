import type { RowDataPacket } from 'mysql2';

export interface FormResponse {
	success: boolean;
	error: string;
}

export interface IUser extends RowDataPacket {
	id: string;
}
