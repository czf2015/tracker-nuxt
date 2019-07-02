## What is a callback? Can you show an example using one?

Callbacks are functions passed as an argument to another function to be executed once an event has occurred or a certain task is complete, often used in asynchronous code. Callback functions are invoked later by a piece of code but can be declared on initialization without being invoked.

As an example, event listeners are asynchronous callbacks that are only executed when a specific event occurs.

```js
function onClick() {
  console.log("The user clicked on the page.")
}
document.addEventListener("click", onClick)
```

However, callbacks can also be synchronous. The following map function takes a callback function that is invoked synchronously for each iteration of the loop (array element).

```js
const map = (arr, callback) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i))
  }
  return result
}
map([1, 2, 3, 4, 5], n => n * 2) // [2, 4, 6, 8, 10]
```

Good to hear

    Functions are first-class objects in JavaScript

    Callbacks vs Promises


## How do you clone an object in JavaScript?

Using the object spread operator ..., the object's own enumerable properties can be copied into the new object. This creates a shallow clone of the object.

```js
const obj = { a: 1, b: 2 }
const shallowClone = { ...obj }
```

With this technique, prototypes are ignored. In addition, nested objects are not cloned, but rather their references get copied, so nested objects still refer to the same objects as the original. Deep-cloning is much more complex in order to effectively clone any type of object (Date, RegExp, Function, Set, etc) that may be nested within the object.

Other alternatives include:

    JSON.parse(JSON.stringify(obj)) can be used to deep-clone a simple object, but it is CPU-intensive and only accepts valid JSON (therefore it strips functions and does not allow circular references).
    Object.assign({}, obj) is another alternative.
    Object.keys(obj).reduce((acc, key) => (acc[key] = obj[key], acc), {}) is another more verbose alternative that shows the concept in greater depth.

Good to hear

    JavaScript passes objects by reference, meaning that nested objects get their references copied, instead of their values.

    The same method can be used to merge two objects.


## What is the difference between lexical scoping and dynamic scoping?

Lexical scoping refers to when the location of a function's definition determines which variables you have access to. On the other hand, dynamic scoping uses the location of the function's invocation to determine which variables are available.
Good to hear

    Lexical scoping is also known as static scoping.

    Lexical scoping in JavaScript allows for the concept of closures.

    Most languages use lexical scoping because it tends to promote source code that is more easily understood.



## What is the difference between a parameter and an argument?

Parameters are the variable names of the function definition, while arguments are the values given to a function when it is invoked.

function myFunction(parameter1, parameter2) {
  console.log(arguments[0]) // "argument1"
}
myFunction("argument1", "argument2")

Good to hear

    arguments is an array-like object containing information about the arguments supplied to an invoked function.

    myFunction.length describes the arity of a function (how many parameters it has, regardless of how many arguments it is supplied).



## How do you pass an argument to an event handler or callback?

You can use an arrow function to wrap around an event handler and pass arguments, which is equivalent to calling bind:

<button onClick={() => this.handleClick(id)} />
<button onClick={this.handleClick.bind(this, id)} />


## What is the output of the following code?

const a = [1, 2, 3]
const b = [1, 2, 3]
const c = "1,2,3"

console.log(a == c)
console.log(a == b)

The first console.log outputs true because JavaScript's compiler performs type conversion and therefore it compares to strings by their value. On the other hand, the second console.log outputs false because Arrays are Objects and Objects are compared by reference.
Good to hear

    JavaScript performs automatic type conversion

    Objects are compared by reference

    Primitives are compared by value


## Are semicolons required in JavaScript?

Sometimes. Due to JavaScript's automatic semicolon insertion, the interpreter places semicolons after most statements. This means semicolons can be omitted in most cases.

However, there are some cases where they are required. They are not required at the beginning of a block, but are if they follow a line and:

    The line starts with [

const previousLine = 3
;[1, 2, previousLine].map(n => n * 2)

    The line starts with (

const previousLine = 3
;(function() {
  // ...
})()

In the above cases, the interpreter does not insert a semicolon after 3, and therefore it will see the 3 as attempting object property access or being invoked as a function, which will throw errors.
Good to hear

    Semicolons are usually optional in JavaScript but have edge cases where they are required.

    If you don't use semicolons, tools like Prettier will insert semicolons for you in the places where they are required on save in a text editor to prevent errors.


## What is the difference between synchronous and asynchronous code in JavaScript?

Synchronous means each operation must wait for the previous one to complete.

Asynchronous means an operation can occur while another operation is still being processed.

In JavaScript, all code is synchronous due to the single-threaded nature of it. However, asynchronous operations not part of the program (such as XMLHttpRequest or setTimeout) are processed outside of the main thread because they are controlled by native code (browser APIs), but callbacks part of the program will still be executed synchronously.
Good to hear

    JavaScript has a concurrency model based on an "event loop".

    Functions like alert block the main thread so that no user input is registered until the user closes it.


## What is a closure? Can you give a useful example of one?

A closure is a function defined inside another function and has access to its lexical scope even when it is executing outside its lexical scope. The closure has access to variables in three scopes:

    Variables declared in its own scope
    Variables declared in the scope of the parent function
    Variables declared in the global scope

In JavaScript, all functions are closures because they have access to the outer scope, but most functions don't utilise the usefulness of closures: the persistence of state. Closures are also sometimes called stateful functions because of this.

In addition, closures are the only way to store private data that can't be accessed from the outside in JavaScript. They are the key to the UMD (Universal Module Definition) pattern, which is frequently used in libraries that only expose a public API but keep the implementation details private, preventing name collisions with other libraries or the user's own code.
Good to hear

    Closures are useful because they let you associate data with a function that operates on that data.

    A closure can substitute an object with only a single method.

    Closures can be used to emulate private properties and methods.


## What is event-driven programming?

Event-driven programming is a paradigm that involves building applications that send and receive events. When the program emits events, the program responds by running any callback functions that are registered to that event and context, passing in associated data to the function. With this pattern, events can be emitted into the wild without throwing errors even if no functions are subscribed to it.

A common example of this is the pattern of elements listening to DOM events such as click and mouseenter, where a callback function is run when the event occurs.

document.addEventListener("click", function(event) {
  // This callback function is run when the user
  // clicks on the document.
})

Without the context of the DOM, the pattern may look like this:

const hub = createEventHub()
hub.on("message", function(data) {
  console.log(`${data.username} said ${data.text}`)
})
hub.emit("message", {
  username: "John",
  text: "Hello?"
})

With this implementation, on is the way to subscribe to an event, while emit is the way to publish the event.
Good to hear

    Follows a publish-subscribe pattern.

    Responds to events that occur by running any callback functions subscribed to the event.

    Show how to create a simple pub-sub implementation with JavaScript.


## What is functional programming?

Functional programming is a paradigm in which programs are built in a declarative manner using pure functions that avoid shared state and mutable data. Functions that always return the same value for the same input and don't produce side effects are the pillar of functional programming. Many programmers consider this to be the best approach to software development as it reduces bugs and cognitive load.
Good to hear

    Cleaner, more concise development experience

    Simple function composition

    Features of JavaScript that enable functional programming (.map, .reduce etc.)

    JavaScript is multi-paradigm programming language (Object-Oriented Programming and Functional Programming live in harmony)


## Explain the differences between imperative and declarative programming.

These two types of programming can roughly be summarized as:

    Imperative: how to achieve something
    Declarative: what should be achieved

A common example of declarative programming is CSS. The developer specifies CSS properties that describe what something should look like rather than how to achieve it. The "how" is abstracted away by the browser.

On the other hand, imperative programming involves the steps required to achieve something. In JavaScript, the differences can be contrasted like so:
Imperative

const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = []
for (let i = 0; i < numbers.length; i++) {
  numbersDoubled[i] = numbers[i] * 2
}

We manually loop over the numbers of the array and assign the new index as the number doubled.
Declarative

const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = numbers.map(n => n * 2)

We declare that the new array is mapped to a new one where each value is doubled.
Good to hear

    Declarative programming often works with functions and expressions. Imperative programming frequently uses statements and relies on low-level features that cause mutations, while declarative programming has a strong focus on abstraction and purity.

    Declarative programming is more terse and easier to process at a glance.


## Create a function pipe that performs left-to-right function composition by returning a function that accepts one argument.

const square = v => v * v
const double = v => v * 2
const addOne = v => v + 1
const res = pipe(square, double, addOne)
res(3) // 19; addOne(double(square(3)))

Gather all supplied arguments using the rest operator ... and return a unary function that uses Array.prototype.reduce() to run the value through the series of functions before returning the final value.

const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)

Good to hear

    Function composition is the process of combining two or more functions to produce a new function.


## What is a pure function?

A pure function is a function that satisfies these two conditions:

    Given the same input, the function returns the same output.
    The function doesn't cause side effects outside of the function's scope (i.e. mutate data outside the function or data supplied to the function).

Pure functions can mutate local data within the function as long as it satisfies the two conditions above.
Pure

const a = (x, y) => x + y
const b = (arr, value) => arr.concat(value)
const c = arr => [...arr].sort((a, b) => a - b)

Impure

const a = (x, y) => x + y + Math.random()
const b = (arr, value) => (arr.push(value), arr)
const c = arr => arr.sort((a, b) => a - b)

Good to hear

    Pure functions are easier to reason about due to their reliability.

    All functions should be pure unless explicitly causing a side effect (i.e. setInnerHTML).

    If a function does not return a value, it is an indication that it is causing side effects.


## Explain the difference between a static method and an instance method.

Static methods belong to a class and don't act on instances, while instance methods belong to the class prototype which is inherited by all instances of the class and acts on them.

Array.isArray // static method of Array
Array.prototype.push // instance method of Array

In this case, the Array.isArray method does not make sense as an instance method of arrays because we already know the value is an array when working with it.

Instance methods could technically work as static methods, but provide terser syntax:

const arr = [1, 2, 3]
arr.push(4)
Array.push(arr, 4)

Good to hear

    How to create static and instance methods with ES2015 class syntax