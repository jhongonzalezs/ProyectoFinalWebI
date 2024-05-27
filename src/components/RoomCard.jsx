import React from 'react';
import '../assets/css/RoomCard.css';

function RoomCard({ id, nombre, descripcion, disponibilidad, capacidad, ubicacion, reservadoPor, userId, onReserve, onRelease }) {
  const isReservedByUser = reservadoPor === userId;

  return (
    <div className="room-card">
      <h3>{nombre}</h3>
      <p><strong>Descripción:</strong> {descripcion}</p>
      <p><strong>Disponibilidad:</strong> {disponibilidad ? 'Sí' : 'No'}</p>
      <p><strong>Capacidad:</strong> {capacidad}</p>
      <p><strong>Ubicación:</strong> {ubicacion}</p>
      {disponibilidad ? (
        <button className="reserve-button" onClick={() => onReserve(id)}>Reservar</button>
      ) : (
        isReservedByUser && <button className="release-button" onClick={() => onRelease(id)}>Liberar</button>
      )}
    </div>
  );
}

export default RoomCard;
