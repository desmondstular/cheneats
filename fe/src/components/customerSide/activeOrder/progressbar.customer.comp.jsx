import React from 'react';
import './ProgressBar.css'; // Import custom styles for ProgressBar (ProgressBar.css)

const ProgressBar = ({ stage }) => {
    const calculateProgress = () => {
        if (stage === 'ordered') {
            return 30; // 0% progress for 'Ordered'
        } else if (stage === 'in-progress') {
            return 65; // 66% progress for 'In-Progress'
        } else if (stage === 'awaiting pickup' || stage === "awaiting-pickup") {
            return 100; // 100% progress for 'Awaiting Pickup'
        } else {
            return 0; // Default to 0% progress
        }
    };

    const progress = calculateProgress(); // Calculate progress based on stage

    const progressStyle = {
        width: `${progress}%`, // Set the width dynamically based on the calculated progress
        backgroundColor: '#007bff', // Blue color for the progress indicator
        borderRadius: '5px', // Match the border-radius of the container
        transition: 'width 0.3s ease-in-out', // Smooth transition effect for width changes
        position: 'absolute',
        top: 0,
        left: 0
    };

    return (
        <div className="progress-bar">
            {/* Progress Indicator Container */}
            <div className="progress-indicator-container">
                {/* Progress Indicator (Filled Bar) */}
                <div className="progress-indicator" style={progressStyle}></div>
            </div>

            {/* Stage Labels */}
            <div className="stage-labels">
                <div className="stage-label">Ordered</div>
                <div className="stage-label">In Progress</div>
                <div className="stage-label">Ready!</div>
            </div>
        </div>
    );
};

export default ProgressBar;
