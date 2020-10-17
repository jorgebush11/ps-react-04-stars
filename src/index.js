import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import "./styles.scss";

const root = document.querySelector("#root");

const StarsDisplay = (props) => {
	return (
		<>
			{utils.range(1, props.count).map((starId) => (
				<div key={starId} className="star"></div>
			))}
		</>
	);
};

const PlayNumber = (props) => {
	return (
		<button
			className="num"
			style={{ backgroundColor: colors[props.status] }}
			onClick={() => props.onClick(props.number, props.status)}
		>
			{props.number}
		</button>
	);
};

const PlayAgain = (props) => {
	return (
		<div className="game-done">
			<div
				className="message"
				style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
			>
				{props.gameStatus === "lost" ? "Game Over.." : "Good job..."}
			</div>
			<button onClick={props.onClick}>Play Again</button>
		</div>
	);
};

const StarMatch = () => {
	const [stars, setStars] = useState(utils.random(1, 9));

	const [availableNumbers, setAvailableNums] = useState(utils.range(1, 9));
	const [candidateNums, setCandidateNums] = useState([]);
	const [secondsLeft, setSecondsLeft] = useState(10);

	//Set timeout, use another hook
	useEffect(() => {
		if (secondsLeft > 0) {
			const timerId = setTimeout(() => {
				setSecondsLeft(secondsLeft - 1);
			}, 1000);
			return () => clearTimeout(timerId);
		}
	});

	const candidateWrong = utils.sum(candidateNums) > stars;

	const gameStatus =
		availableNumbers.length === 0
			? "won"
			: secondsLeft === 0
			? "lost"
			: "active";

	const resetGame = () => {
		setStars(utils.random(1, 9));
		setAvailableNums(utils.range(1, 9));
		setCandidateNums([]);
	};

	const numberStatus = (number) => {
		if (!availableNumbers.includes(number)) {
			return "used";
		}
		if (candidateNums.includes(number)) {
			return candidateWrong ? "wrong" : "candidate";
		}
		return "available";
	};

	const onNumberClick = (number, currentStatus) => {
		if (currentStatus === "used") {
			return;
		}

		const newCandidateNums =
			currentStatus === "available"
				? candidateNums.concat(number)
				: candidateNums.filter((cn) => cn !== number);

		if (utils.sum(newCandidateNums) !== stars) {
			setCandidateNums(newCandidateNums);
		} else {
			const newAvailableNums = availableNumbers.filter(
				(n) => !newCandidateNums.includes(n)
			);
			setStars(utils.randomSumIn(newAvailableNums, 9));

			setAvailableNums(newAvailableNums);
			setCandidateNums([]);
		}
	};

	return (
		<div className="container">
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="box">
				<div className="stars">
					{gameStatus !== "active" ? (
						<PlayAgain onClick={resetGame} gameStatus={gameStatus} />
					) : (
						<StarsDisplay count={stars} />
					)}
				</div>
				<div className="nums">
					{utils.range(1, 9).map((number) => (
						<PlayNumber
							key={number}
							status={numberStatus(number)}
							number={number}
							onClick={onNumberClick}
						/>
					))}
				</div>
			</div>
			<div className="timer">Time remaining: {secondsLeft}s</div>
		</div>
	);
};

const colors = {
	available: "lightgray",
	used: "lightgreen",
	wrong: "lightcoral",
	candidate: "deepskyblue"
};

const utils = {
	// Sum an array
	sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

	// create an array of numbers between min and max (edges included)
	range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

	// pick a random number between min and max (edges included)
	random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

	// Given an array of numbers and a max...
	// Pick a random sum (< max) from the set of all available sums in arr
	randomSumIn: (arr, max) => {
		const sets = [[]];
		const sums = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0, len = sets.length; j < len; j++) {
				const candidateSet = sets[j].concat(arr[i]);
				const candidateSum = utils.sum(candidateSet);
				if (candidateSum <= max) {
					sets.push(candidateSet);
					sums.push(candidateSum);
				}
			}
		}
		return sums[utils.random(0, sums.length - 1)];
	}
};

ReactDom.render(<StarMatch />, root);
