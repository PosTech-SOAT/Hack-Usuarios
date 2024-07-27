export enum UserRole {
	Medico = 'Doctor',
	Paciente = 'Patient',
}

export interface IUser {
	id: string;
	email: string;
	password?: string;
	role: UserRole;
}
