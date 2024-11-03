const socket = io();

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);

  socket.on("userAuthenticated", console.log("Authenticated"));
}
