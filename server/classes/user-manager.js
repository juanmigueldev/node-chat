
class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room }

        this.users.push(user)

        return this.users;
    }

    getUser(id) {
        return this.users.filter(usr => usr.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(usr => usr.room === room);
    }

    deleteUser(id) {
        let deletedUser = this.getUser(id);
        this.users = this.users.filter(usr => usr.id !== id);
        return deletedUser;
    }
}


module.exports = UserManager