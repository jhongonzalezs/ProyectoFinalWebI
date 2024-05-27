import React from 'react';
import NavbarAll from "./NavbarAll";
import RoomCard from './RoomCard';
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';

function NavbarRooms() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [rooms, setRooms] = React.useState([]);
  const [reservedRooms, setReservedRooms] = React.useState([]);

  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await db.collection('salas').get();
        const roomsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchReservedRooms = async () => {
      if (auth.currentUser) {
        try {
          const userRef = db.collection('usuarios').doc(auth.currentUser.uid);
          const reservedSnapshot = await userRef.collection('reservas').get();
          const reservedRoomsData = reservedSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setReservedRooms(reservedRoomsData);
        } catch (error) {
          console.error('Error fetching reserved rooms:', error);
        }
      }
    };

    fetchRooms();
    fetchReservedRooms();
  }, []);

  const handleReserve = async (roomId) => {
    try {
      const roomRef = db.collection('salas').doc(roomId);
      const roomDoc = await roomRef.get();
      if (roomDoc.exists && roomDoc.data().disponibilidad) {
        const roomData = roomDoc.data();
        await roomRef.update({ disponibilidad: false, reservadoPor: auth.currentUser.uid });
        await db.collection('usuarios').doc(auth.currentUser.uid).collection('reservas').doc(roomId).set(roomData);

        setRooms(prevRooms => prevRooms.map(room => room.id === roomId ? { ...room, disponibilidad: false, reservadoPor: auth.currentUser.uid } : room));
        setReservedRooms(prevReservedRooms => [...prevReservedRooms, { ...roomData, id: roomId, disponibilidad: false, reservadoPor: auth.currentUser.uid }]);
      }
    } catch (error) {
      console.error('Error reserving room:', error);
    }
  };

  const handleRelease = async (roomId) => {
    try {
      const roomRef = db.collection('salas').doc(roomId);
      const roomDoc = await roomRef.get();
      if (roomDoc.exists && roomDoc.data().reservadoPor === auth.currentUser.uid) {
        const roomData = roomDoc.data();
        await roomRef.update({ disponibilidad: true, reservadoPor: null });
        await db.collection('usuarios').doc(auth.currentUser.uid).collection('reservas').doc(roomId).delete();

        setRooms(prevRooms => prevRooms.map(room => room.id === roomId ? { ...room, disponibilidad: true, reservadoPor: null } : room));
        setReservedRooms(prevReservedRooms => prevReservedRooms.filter(room => room.id !== roomId));
      }
    } catch (error) {
      console.error('Error releasing room:', error);
    }
  };

  return (
    <React.Fragment>
      <NavbarAll />
      <div className="container">
        <h1>Salas Disponibles</h1>
        <div className="rooms-list">
          {rooms.filter(room => room.disponibilidad || room.reservadoPor === auth.currentUser.uid).map(room => (
            <RoomCard
              key={room.id}
              id={room.id}
              nombre={room.nombre}
              descripcion={room.descripcion}
              disponibilidad={room.disponibilidad}
              capacidad={room.capacidad}
              ubicacion={room.ubicacion}
              reservadoPor={room.reservadoPor}
              userId={user.uid}
              onReserve={handleReserve}
              onRelease={handleRelease}
            />
          ))}
        </div>
        <h1>Mis Salas Reservadas</h1>
        <div className="rooms-list">
          {reservedRooms.map(room => (
            <RoomCard
              key={room.id}
              id={room.id}
              nombre={room.nombre}
              descripcion={room.descripcion}
              disponibilidad={room.disponibilidad}
              capacidad={room.capacidad}
              ubicacion={room.ubicacion}
              reservadoPor={room.reservadoPor}
              userId={user.uid}
              onReserve={() => {}} // No mostrar el botón de reserva para las salas ya reservadas
              onRelease={handleRelease}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavbarRooms;
