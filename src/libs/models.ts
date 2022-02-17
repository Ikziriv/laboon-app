export interface UserRec {
    displayName: string;
    photoURL: string;
    uid: string;
    email: string;
};

export interface Reservation {
    id: string;
    rsvName: string;
    phone: string;
    text: string;
    email: string;
    rsvCode: string;
    complete: boolean;
    createdAt: Date;
}