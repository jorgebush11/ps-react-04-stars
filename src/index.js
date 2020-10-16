import React from "react";
import ReactDom from "react-dom";

import "./styles.scss";

const root = document.querySelector("#root");

function addStars() {
	const num = 9;

	const elems = [];
	for (let i = 0; i < num; i++) {
		elems.push(<div className="star" key={i}></div>);
	}

	return elems;
}

function addNums() {
	const num = 9;

	const nums = [];
	for (let i = 0; i < num; i++) {
		nums.push(
			<div className="num" key={i}>
				{i + 1}
			</div>
		);
	}

	return nums;
}

const StarMatch = () => {
	const elems = addStars();
	const nums = addNums();

	return (
		<div className="container">
			<p>Pick 1 or more numbers that sum to the number of stars</p>
			<div className="box">
				<div className="stars">{elems}</div>
				<div className="nums">{nums}</div>
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
