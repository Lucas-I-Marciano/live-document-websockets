const socket = io();

export function socketRegisterEmit(eventName, data) {
  socket.emit(eventName, data);
}
