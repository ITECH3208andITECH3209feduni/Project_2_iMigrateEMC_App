import React from 'react';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, stepTitles }) => {
    return (
        <nav aria-label="Booking progress" className="flex items-center">
            {stepTitles.map((title, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex items-center" aria-current={isActive ? 'step' : undefined}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isCompleted ? 'bg-primary text-white' : ''}
                                    ${isActive ? 'bg-primary-light text-primary border-2 border-primary font-bold' : ''}
                                    ${!isCompleted && !isActive ? 'bg-gray-200 text-muted' : ''}
                                `}
                            >
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className={`ml-2 hidden sm:block text-sm transition-colors duration-300 ${isActive ? 'text-primary font-semibold' : 'text-muted'}`}>{title}</div>
                        </div>
                        {index < totalSteps - 1 && (
                            <div className={`flex-1 h-1 mx-2 sm:mx-4 transition-colors duration-300 ${isCompleted ? 'bg-primary' : 'bg-border'}`} role="separator"></div>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default ProgressIndicator;