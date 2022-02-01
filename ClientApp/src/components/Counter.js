import React, { Component, useState } from 'react'

function Counter() {
	const [count ,setCount] = useState(0)

	return (
		<div>
			<h1>Counter</h1>
			<p>The current count is: {count}</p>
			<button 
				className='blue-button'
				onClick={() => setCount(prev => prev + 1)}
			>Increment</button>
    	</div>
	)
}
export default Counter; 

/*export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}*/
