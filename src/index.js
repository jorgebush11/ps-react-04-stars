import React, { useState } from "react";
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
			onClick={() => console.log("Number:", props.number)}
		>
			{props.number}
		</button>
	);
};

const StarMatch = () => {
	const [stars, setStars] = useState(utils.random(1, 9));

	const [availableNumbers, setAvailableNums] = useState([1, 2, 3, 4, 5]);
	const [candidateNums, setCandidateNums] = useState([2, 3]);

	const candidateWrong = utils.sum(candidateNums) > stars;

	function numberStatus(number) {
		if (!availableNumbers.includes(number)) {
			return "used";
		}
		if (candidateNums.includes(number)) {
			return candidateWrong ? "wrong" : "candidate";
		}
		return "available";
	}

	return (
		<div className="container">
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="box">
				<div className="stars">
					<StarsDisplay count={stars} />
				</div>
				<div className="nums">
					{utils.range(1, 9).map((number) => (
						<PlayNumber
							key={number}
							status={numberStatus(number)}
							number={number}
						/>
					))}
				</div>
			</div>
			<div className="timer">Time remaining: 10s</div>
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
