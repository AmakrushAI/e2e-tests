import dotenv from 'dotenv';
dotenv.config();
import UserSocket from "./socket";
import { createUser, deleteUser } from "./utils/user";

(async () => {
    let userCount = 100
    let sockets = []
    for(let i=1;i<=userCount;i++){
        let data = await createUser(`tester${i}@amakrushi.ai`,`tester-amakrushi-${i}`)
        if(!data) {console.error('unable to create user', `tester${i}@amakrushi.ai`); continue;}
        const userSocket = new UserSocket(data.token,data.user.id)
        userSocket.connect()
        userSocket.mockEvent("mock","mock message")
        sockets.push(userSocket)
        console.log("connections =",i)
    }
    for(let i=0;i<sockets.length;i++){
        let userSocket = sockets[i]
        deleteUser(userSocket.deviceId)
        userSocket.close()
    }
})();