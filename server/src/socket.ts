import { Server as SocketServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { event } from './config/constants'

const socketData: any = {} // Given socket id, returns room id
const roomData: any = {} // Given room id, returns list of sockets connected to the room
// (i.e each list element is like this { username: 'est1114@gmail.com', socketId: 'a5ayyhvxYAzvR3geAAAd' }
//{username, and socketId )

export function initializeSocketServer(server: httpServer) {
  const io = new SocketServer(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    serveClient: false,
    connectTimeout: 10000,
  })

  io.on(event.CONNECTION, (socket: Socket) => {
    socket.on(event.JOIN_ROOM, data => {
      socket.join(data.roomId)
      socketData[socket.id] = data.roomId

      if (roomData[data.roomId]) {
        var _found = roomData[data.roomId].filter(
          (item: any) => item.socketId === socket.id,
        )
        if (!_found || _found.length === 0) {
          roomData[data.roomId] = [
            ...roomData[data.roomId],
            { username: data.username, socketId: socket.id },
          ]
        }
      } else {
        roomData[data.roomId] = [{ username: data.username, socketId: socket.id }]
      }

      io.in(socketData[socket.id]).emit(event.UPDATED_USERS, roomData[data.roomId])
    })

    socket.on(event.READY_FOR_VIDEO_CALL, data => {

      const usersInThisRoom = roomData[data.roomId].filter(
        (element: any) => element.socketId !== socket.id,
      )
      socket.emit('all users', usersInThisRoom)
    });

    socket.on(event.DISCONNECTION, _reason => {
      
      if (roomData[socketData[socket.id]]) {
        roomData[socketData[socket.id]] = roomData[socketData[socket.id]].filter(
          (x: any) => x.socketId !== socket.id,
        )
        io.in(socketData[socket.id]).emit(
          event.UPDATED_USERS,
          roomData[socketData[socket.id]],
        )
        io.in(socketData[socket.id]).emit(event.DISCONNECTION, socket.id)
      }
      socket.leave(socketData[socket.id]);
    })

    socket.on('disconnect', _reason => {
      if (roomData[socketData[socket.id]]) {
        roomData[socketData[socket.id]] = roomData[socketData[socket.id]].filter(
          (x: any) => x.socketId !== socket.id,
        )
        io.in(socketData[socket.id]).emit(
          event.UPDATED_USERS,
          roomData[socketData[socket.id]],
        )
        io.in(socketData[socket.id]).emit(event.DISCONNECTION, socket.id)
      }
      socket.leave(socketData[socket.id]);

    })

    socket.on(event.SYNC_CODE, data => {
      socket.in(socketData[socket.id]).emit(event.UPDATE_CODE, data)
    })

    socket.on(event.SENDING_SIGNAL, payload => {
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
      })
    })

    socket.on(event.RETURNING_SIGNAL, payload => {
      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      })
    })

    socket.on(event.CHANGE, payload => {
      socket.broadcast.emit('change', payload)
    })

    socket.on(event.BE_SEND_MESSAGE, ({ roomId, msg, sender }) => {
      io.to(roomId).emit(event.FE_RECEIVE_MESSAGE, { msg, sender })
    })

  })
}