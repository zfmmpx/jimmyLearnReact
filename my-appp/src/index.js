import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
// 	// 因为已经不需要保存state了，因此可以不要下面的代码，隐式创建constructor
// 	// constructor(props) {
// 	// 	super(props); // super作为函数时，代表父类的构造函数，但是this指向子类，
// 	// 	// super(props)即相当于：React.Component.prototype.constructor.call(this, props);
// 	// 	this.state = {
// 	// 		value: null,
// 	// 	};
// 	// }
	
// 	render() {
// 		return (
// 			<button 
// 				className="square"
// 				onClick={() => this.props.onClick()}
// 			>
// 				{this.props.value}
// 			</button>
// 		);
// 	}
// }

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}


class Board extends React.Component {
	// constructor() {
	// 	super(); // super作为函数时，代表父类的构造函数，但是this指向子类，
	// 	// super(props)相当于：React.Component.prototype.constructor.call(this, props);
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true,
	// 	};
	// }


	renderSquare(i) {
		return (
			<Square 
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		// const winner = calculateWinner(this.state.squares);
		// let status;
		// if (winner) {
			// status = 'Winner: ' + winner;
		// } else {
			// status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		// }

		return (
			<div>
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
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}
	
	handleClick(i) {
		// const history = this.state.history; // 浅拷贝
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1]; // 浅拷贝
		const squares = current.squares.slice(); // 深拷贝

		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false :true,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ? 'Move #' + move : 'Game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			)
		})

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>

				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
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


function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
