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
		<div className='rounded-box w-28 h-12 bg-base-100 shadow-sm flex justify-center items-center text-lg'>
			<p className='font-medium font-sans'>
				{String(currentTime.getHours()).padStart(2, '0')}:{String(currentTime.getMinutes()).padStart(2, '0')}:{String(currentTime.getSeconds()).padStart(2, '0')}
			</p>
		</div>
	)
}
