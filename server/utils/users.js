// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//   constructor(name,age){
//     this.name = name;
//     this.age= age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
// var me = new Person('Andrew',25);
// var description = me.getUserDescription();
// console.log(description);

const _ = require('lodash');

class Users {
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user= {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var users = this.users;
    var user = this.getUser(id);
    var afterRemoval = _.remove(users,(user)=> user.id ===id);
    this.users=users;
    return user;
  }
  getUser(id){
    var users = this.users;
    var user = _.find(users,(user)=>{
      return user.id === id;
    });
    return user;
  }
  getUserList(room) {
    var users = this.users.filter((user)=> user.room === room);
    var namesArray = users.map((user)=>user.name);
    return namesArray;
  }
}

module.exports= {Users};
