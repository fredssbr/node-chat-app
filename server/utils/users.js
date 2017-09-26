// [{
//     id: '1234321234',
//     name: 'Fred',
//     room: 'The Office Fans'
// }]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor (){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var users = this.users.filter((user) => user.id === id);
        if(users.length == 0){
            return undefined;
        }
        return this.users.splice(this.users.indexOf(users[0]), 1)[0];
        //or
        // var user = this.users.filter((user) => user.id === id);
        // this.users = this.users.filter((user) => user.id !== id)
        // return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0]; 
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
    
}

module.exports = {Users};


// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('Fred', 30);
// var description = me.getUserDescription();
// console.log(description);