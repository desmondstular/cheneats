/**
 * clock.comp.jsx
 */

import React, {useEffect, useState} from "react";

export const Clock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="w-32 h-12 bg-chen-blue mt-2 shadow-lg flex justify-center items-center text-white rounded-lg">
			<p className="font-medium text-xl">
				{String(currentTime.getHours()).padStart(2, '0')}:{String(currentTime.getMinutes()).padStart(2, '0')}:{String(currentTime.getSeconds()).padStart(2, '0')}
			</p>
		</div>
	);
};


