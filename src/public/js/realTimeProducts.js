console.log("Llamando a realTimeProducts!!!");
const socket = io();
socket.emit(
  "message1",
  "Hola, soy cliente y me estoy comunidando desde un websocket Productos!!!!"
);
socket.on("lista_productos", (datos) => {
  console.log("se recibio una nueva actualizacion de productos...", datos);
});
