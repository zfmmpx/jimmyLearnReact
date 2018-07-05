import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
	// 因为已经不需要保存state了，因此可以不要下面的代码，隐式创建constructor
	// constructor(props) {
	// 	super(props); // super作为函数时，代表父类的构造函数，但是this指向子类，
	// 	// super(props)即相当于：React.Component.prototype.constructor.call(this, props);
	// 	this.state = {
	// 		value: null,
	// 	};
	// }
	
	render() {
		return (
			<button 
				className="square" 
				onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares: squares});
	}

	renderSquare(i) {
		return (
			<Square 
				value={this.state.squares[i]} 
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		const status = 'Next player: X';

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
