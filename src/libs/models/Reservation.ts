import { v4 as uuid } from '@lukeed/uuid';
import { sortBy } from "lodash";
import { map, pipe, fromPairs, reject, isNil } from "lodash/fp";

export interface NewReservation {
    id: string;
	uuid?: string;
    rsvName: string;
    phone: string;
    text: string;
    email: string;
    rsvCode: string;
    complete: boolean;
    createdAt: string;
}

interface SavedReservation {
	id: number | "";
	uuid?: string;
    rsvName: string;
    phone: string;
    text: string;
    email: string;
    rsvCode: string;
    complete: boolean;
    createdAt: string;
}

type Reservation = NewReservation | SavedReservation;

type ReservationList = Reservation[];
interface ReservationMap {
  [id: string]: Reservation;
}

export type T = Reservation;
export type List = ReservationList;
export type Map = ReservationMap;

export const listToMap = (list: ReservationList): ReservationMap => {
	return pipe(
		map((reservation: Reservation) => [key(reservation), reservation]),
		fromPairs
	)(list);
};

export const mapToList = (map: ReservationMap): ReservationList => {
	return pipe(
		Object.values,
		reject(isNil),
		reservationList => sortBy(reservationList, ["done", "createdAt"])
	)(map);
};

export const isNew = (reservation: Reservation): reservation is NewReservation => {
	return reservation.id === -1;
};

export const toApi = (reservation: Reservation): SavedReservation => {
const { id, ...json } = reservation;

const apiId = (id === -1 ? "" : id) as number | "";
	return { ...json, id: apiId };
};

export const key = (reservation: Reservation): string | number => reservation.uuid || reservation.id;

export const build = (
    rsvName: string = "",
    phone: string = "",
    text: string = "",
    email: string = "",
    rsvCode: string = ""
) => {
	return {
	id: -1,
	uuid: uuid(),
    rsvName,
    phone,
    text,
    email,
    rsvCode,
    complete: false,
	createdAt: new Date().toISOString()
	};
};
