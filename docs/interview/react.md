## What is the difference between HTML and React event handling?

In HTML, the attribute name is in all lowercase and is given a string invoking a function defined somewhere:

<button onclick="handleClick()"></button>

In React, the attribute name is camelCase and are passed the function reference inside curly braces:

<button onClick={handleClick} />

In HTML, false can be returned to prevent default behavior, whereas in React preventDefault has to be called explicitly.

<a href="#" onclick="console.log('The link was clicked.'); return false" />

function handleClick(e) {
  e.preventDefault()
  console.log("The link was clicked.")
}

Good to hear

    HTML uses lowercase, React uses camelCase.


## What are inline conditional expressions?

Since a JSX element tree is one large expression, you cannot embed statements inside. Conditional expressions act as a replacement for statements to use inside the tree.

For example, this won't work:

```js
function App({ messages, isVisible }) {
  return (
    <div>
      if (messages.length > 0) {
        <h2>You have {messages.length} unread messages.</h2>
      } else {
        <h2>You have no unread messages.</h2>
      }
      if (isVisible) {
        <p>I am visible.</p>
      }
    </div>
  )
}
```

Logical AND && and the ternary ? : operator replace the if/else statements.

```js
function App({ messages, isVisible }) {
  return (
    <div>
      {messages.length > 0 ? (
        <h2>You have {messages.length} unread messages.</h2>
      ) : (
        <h2>You have no unread messages.</h2>
      )}
      {isVisible && <p>I am visible.</p>}
    </div>
  )
}
```


## Which is the preferred option between callback refs and findDOMNode()?

Callback refs are preferred over the findDOMNode() API, due to the fact that findDOMNode() prevents certain improvements in React in the future.

```js
// Legacy approach using findDOMNode()
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView()
  }

  render() {
    return <div />
  }
}

// Recommended approach using callback refs
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView()
  }

  render() {
    return <div ref={node => (this.node = node)} />
  }
}
```

Good to hear

    Callback refs are preferred over findDOMNode().



## What are fragments?

Fragments allow a React component to return multiple elements without a wrapper, by grouping the children without adding extra elements to the DOM. Fragments offer better performance, lower memory usage, a cleaner DOM and can help in dealing with certain CSS mechanisms (e.g. tables, Flexbox and Grid).

render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

// Short syntax supported by Babel 7
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}

Good to hear

    Fragments group multiple elements returned from a component, without adding a DOM element around them.



## What are higher-order components?

A higher-order component (HOC) is a function that takes a component as an argument and returns a new component. It is a pattern that is derived from React’s compositional nature. Higher-order components are like pure components because they accept any dynamically provided child component, but they won’t modify or copy any behavior from their input components.

const EnhancedComponent = higherOrderComponent(WrappedComponent)

Good to hear

    They can be used for state abstraction and manipulation, props manipulation, render high jacking, etc.


## How do you ensure methods have the correct this context in React component classes?

In JavaScript classes, the methods are not bound by default. This means that their this context can be changed (in the case of an event handler, to the element that is listening to the event) and will not refer to the component instance. To solve this, Function.prototype.bind() can be used to enforce the this context as the component instance.

constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}

handleClick() {
  // Perform some logic
}

    The bind approach can be verbose and requires defining a constructor, so the new public class fields syntax is generally preferred:

handleClick = () => {
  console.log('this is:', this);
}

render() {
  return (
    <button onClick={this.handleClick}>
      Click me
    </button>
  );
}

    You can also use an inline arrow function, because lexical this (referring to the component instance) is preserved:

<button onClick={e => this.handleClick(e)}>Click me</button>

Note that extra re-rendering can occur using this technique because a new function reference is created on render, which gets passed down to child components and breaks shouldComponentUpdate / PureComponent shallow equality checks to prevent unnecessary re-renders. In cases where performance is important, it is preferred to go with bind in the constructor, or the public class fields syntax approach, because the function reference remains constant.
Good to hear

    You can either bind methods to the component instance context in the constructor, use public class fields syntax, or use inline arrow functions.


## What are portals in React?

Portal are the recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

ReactDOM.createPortal(child, container)

The first argument (child) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.


## What are refs in React? When should they be used?

Refs provide a way to access DOM nodes or React elements created in the render method. Refs should be used sparringly, but there are some good use cases for refs, such as:

    Managing focus, text selection, or media playback.
    Triggering imperative animations.
    Integrating with third-party DOM libraries.

Refs are created using React.createRef() method and attached to React elements via the ref attribute. In order to use refs throughout the component, assign the ref to the instance property within the constructor:

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  render() {
    return <div ref={this.myRef} />
  }
}

Refs can also be used in functional components with the help of closures.
Good to hear

    Refs are used to return a reference to an element.

    Refs shouldn't be overused.

    You can create a ref using React.createRef() and attach to elements via the ref attribute.