import React from "react";
import ReactDom from "react-dom";

import "./styles.scss";

const root = document.querySelector("#root");

const StarMatch = () => {
	const stars = utils.random(1, 9);

	return (
		<div className="container">
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="box">
				<div className="stars">
					{utils.range(1, stars).map((starId) => (
						<div key={starId} className="star"></div>
					))}
				</div>
				<div className="nums">
					{utils.range(1, 9).map((number) => (
						<button key={number} className="num">
							{number}
						</button>
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
