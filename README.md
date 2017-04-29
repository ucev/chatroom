# chatroom
chatroom demo

Until now, I have to abandon `create-react-app` frame, for port conflict.

I have solved the conflict between the client-side port 3000 and server-side port 3001, by adding `proxy: http://localhost:3001` to the `package.json`, but I have no idea how to solve CORS caused by socket.io, which listening on port 3000.

Migrate to pure `express`, and try to use `webpack` myself.

## Update On 2017/4/27
Chatroom demo with limited functions. To get it to work as expected will need more works, but it fulfills my initial purpose to try to use `socket.io`.Continuing.

## Update on 2017/4/28
Add online/offline state tommorrow, together with some small modifications.

## Update on 2017/4/28
In this demo, I have learnt how to use **socket.io** and how to create **single page web application** with `React`. It meets my current needs. So just stop here, and I will find something else to learn.