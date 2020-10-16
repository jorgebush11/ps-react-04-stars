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
		</div>
	);
};

const colors = {
	available: "lightgray",
	used: "lightgreen",
	wrong: "lightcoral",
	candidate: "deepskyblue"
};

ReactDom.render(<StarMatch />, root);
