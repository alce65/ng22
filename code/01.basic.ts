/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Imferencia de tipos

let greeting = 'Hola mundo';
// greeting = 22;
console.log(greeting);

let user = { name: 'Juan', age: 30 };
console.log(user);
console.log(user);

// @ts-expect-error: La propiedad 'job' no existe en el tipo
user.job = 'Developer';
//
// @ts-expect-error: El tipo 'string' no se puede asignar al tipo 'number'.
user.age = '31';

//Tipos literales

const pi = 3.14;

let pi2 = 3.14 as const;

// @ts-expect-error: El tipo '3.15' no se puede asignar al tipo '3.14'.
pi2 = 3.15;

// Tipo any - mala práctica
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let variable: any = 'Hola';
variable = 22;
variable = true;
console.log(variable);

// Anotación de tipos

const add = (a: number, b: number): number => {
  return a + b;
};

// Arrays
let numbers: number[] = [];
numbers.push(1);
numbers.push(2);
// numbers.push("3");

let users: unknown[] = []; // array de never

users.push({ name: 'Ana', age: 25 });
let bad: unknown = 2;

//@ts-expect-error: "bad" es de tipo "unknown".
let c = bad + 1;

// aserción o casting de tipos

(bad as string).toLocaleLowerCase();

// Guardas de tipos

if (typeof bad === 'number') {
  console.log(bad.toFixed(2));
} else if (typeof bad === 'string') {
  console.log(bad.toLocaleLowerCase());
}

// Tipos propios

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type User = {
  readonly name: string;
  age: number;
  job?: string
};

let user2: User = { name: 'Ana', age: 25 };
user2.job = 'Developer';

const users2: User[] = [];
users2.push(user2);
users2.push({ name: 'Luis', age: 28, job: 'Designer' });

// Tuplas

let userTuple: [string, number] = ['Pedro', 35];
userTuple[0] = 'Pablo';

// @ts-expect-error: El tipo '"36"' no se puede asignar al tipo 'undefined'.
userTuple[2] = "36";

userTuple.push(36);

// @ts-expect-error: El tipo true no se puede asignar al tipo 'undefined'.
userTuple[2] = true;

// Interfaces

interface IUser {
  readonly id: number;
  name: string;
  age: number;
  job?: string;
}

const users3: IUser[] = [{ ...user2, id: 1 }];
users3[0].age++;

// Interfaces v. tipos

// Solo tipos
type ID = string | number;
type PopularTag = 'js' | 'ts' | 'node' | 'react';
type MaybePopularTag = PopularTag | 'angular' | 'vue';

const p: PopularTag = 'ts';

interface IAdmin extends IUser {
  role: 'admin' | 'superAdmin';
}

const admin: IAdmin = { id: 1, name: 'Admin', age: 40, role: 'admin' };

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type BasicProduct = { id: number; name: string; price: number };
type BookProduct = BasicProduct & { author: string; pages: number };

const book: BookProduct = {
  id: 1,
  name: 'TypeScript',
  price: 29.99,
  author: 'John Doe',
  pages: 300,
};

type TypeInutil = IUser & BookProduct;

const test: TypeInutil = { id: 1, name: 'Test', age: 20, price: 10, author: 'Author', pages: 100 };

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type User2 = {
  name: string;
  boss: string;
};

interface Admin {
  name: string;
  team: string;
}

type UserOrAdmin2 = User2 | Admin;
