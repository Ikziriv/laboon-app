import { writable, derived } from "svelte/store";
import { isError } from "result-async";
import _ from "lodash";

import { get, put } from "../../routes/api/axios-index";
import type * as ReservationType from "../models/Reservation";
import * as Reservation from "../models/Reservation";

export const reservationMap = writable<ReservationType.Map>({});
export const reservationList = derived(reservationMap, Object.values);

export const loadReservations = async () => {
    const response = await get<ReservationType.List, string>("/");
  
    if (isError(response)) return null;
  
    const reservationList = response.ok;
    const reservationMapData = Reservation.listToMap(reservationList);
  
    reservationMap.set(reservationMapData);
  };
  
  export const updateReservation = (reservation: ReservationType.T): void => {
    reservationMap.update($reservationMap => {
      return _.merge({}, $reservationMap, { [reservation.id]: reservation });
    });
    put<ReservationType.T, string>(`/${reservation.id}`, reservation);
  };
  
  export const deleteReservation = (reservation: ReservationType.T): void => {
    reservationMap.update($reservationMap => {
      delete $reservationMap[reservation.id];
      return $reservationMap;
    });
  };
  
  export const completeReservations = derived(reservationList, $reservationList =>
    _.filter($reservationList, { complete: true })
  );
  
  export const pendingReservations = derived(reservationList, $reservationList =>
    _.filter($reservationList, { complete: false })
  );
  
  export const areReservationsComplete = derived(
    pendingReservations,
    $pendingReservations => $pendingReservations.length === 0
  );