import MockAdapter from "axios-mock-adapter";
import { axios } from "./axios-index";
import type * as Reservation from "../../libs/models/Reservation";

const mock = new MockAdapter(axios);

const defaultReservations = [
    { 
        id: 0, 
        rsvName: "Ikziriv", 
        phone: "0895321684845", 
        text: "Clean and large boats", 
        email: "ikziriv.art@gmail.com", 
        rsvCode: "101171", 
        createdAt: "2019-08-12", 
        complete: false 
    },
    { 
        id: 1, 
        rsvName: "Poksterikz", 
        phone: "0895321684845", 
        text: "Clean and large boats", 
        email: "poksterikz@gmail.com", 
        rsvCode: "101181", 
        createdAt: "2019-08-12", 
        complete: true  
    },
];

let lastId = 1;
let reservations: Reservation.List = [];
const loadReservations = () => {
  const data = window.localStorage.getItem("reservations");
  reservations = data ? JSON.parse(data) : defaultReservations;
  return reservations;
};

const saveReservations = () => {
    window.localStorage.setItem("reservations", JSON.stringify(reservations));
};

const newReservation = () => {
    lastId++;
  
    const reservation = {
      id: lastId++,
      rsvName: "", 
      phone: "", 
      text: "", 
      email: "", 
      rsvCode: "", 
      createdAt: new Date().toISOString(),
      complete: false
    };
  
    reservations.push(reservation);
  
    saveReservations();
    return reservation;
};

const updateReservation = (updated: Reservation.T) => {
    console.log({ updated });
    reservations = reservations.map(reservation => {
      if (reservation.id === updated.id) return updated;
      return reservation;
    });
    saveReservations();
    return updated;
};

const deleteReservation = (id: number) => {
    reservations = reservations.filter(reservation => reservation.id !== id);
};

const getIdFromPath = (path: string | undefined): number => {
  const parts = path ? path.split("/") : [];
  const id = parts[parts.length - 1];
  return parseInt(id);
};

mock.onGet("http://localhost:3000/api/reservations/").reply(() => [200, loadReservations()]);
mock.onPost("http://localhost:3000/api/reservations/").reply(() => [201, newReservation()]);
mock
  .onPut(new RegExp("http://localhost:3000/api/reservations/\\d+"))
  .reply(config => [200, updateReservation(JSON.parse(config.data))]);
mock
  .onDelete(new RegExp("http://localhost:3000/api/reservations/\\d+"))
  .reply(config => [204, deleteReservation(getIdFromPath(config.url))]);