//Task 1
var student = {
  name: "Ahmed",
  unversity: "cairo University",
  faculty: "Engineering",
  grade: 90,
};

console.log(
  `${student.name} is a student in faculty of ${student.faculty} in university ${student.unversity} And his final grade is ${student.grade}.`
);

//Task 2
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Teacher extends Person {
  teach(subject) {
    console.log(`${this.name} is now teaching ${subject}.`);
  }
}

var teacher = new Teacher("Mr. Smith");
teacher.teach("Mathematics");

//Task 3
class Vehicle {
  constructor(wheels, speed) {
    this.wheels = wheels;
    this.speed = speed;
  }
}

class Bike extends Vehicle {
  constructor() {
    super(2, 20);
    Bike.incrementCount();
  }

  static instanceCount = 0;

  static incrementCount() {
    Bike.instanceCount++;
  }

  static getCount() {
    return Bike.instanceCount;
  }
}

const b1 = new Bike();
const b2 = new Bike();
console.log(Bike.getCount());
