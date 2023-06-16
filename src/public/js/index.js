console.log("El archivo se llama correctamente...");
const socket = io();

socket.emit(
  "message",
  "Hola, soy cliente y me estoy comunidando desde un websocket!!!!"
);

socket.on("nombre_evento_socket_individual", (data) => {
  console.log("mostrando data que llego del servidor...", data);
});
