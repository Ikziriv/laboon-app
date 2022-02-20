export interface UserRec {
    displayName: string;
    photoURL: string;
    email: string;
    uid: string;
};

export interface Reservation {
    rsvName: string;
    phone: string;
    text: string;
    email: string;
    rsvCode: string;
    complete: boolean;
    createdAt: Date;
    id: number;
}

export interface TemperatureInfo {
	celsius: string;
	fahrenheit: string;
}