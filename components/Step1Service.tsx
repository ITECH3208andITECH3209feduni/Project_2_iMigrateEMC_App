import React from 'react';
import type { ConsultationType } from '../types';

interface ConsultationTypeCardProps {
    type: ConsultationType;
    isSelected: boolean;
    onTap: () => void;
}

const ConsultationTypeCard: React.FC<ConsultationTypeCardProps> = ({ type, isSelected, onTap }) => {
    return (
        <button
            role="radio"
            aria-checked={isSelected}
            onClick={onTap}
            className={`w-full text-left p-4 mb-4 border-2 rounded-xl transition-all duration-300 ${isSelected ? 'border-primary bg-primary-light' : 'border-border bg-background hover:border-primary'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        >
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-secondary">{type.title}</h3>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary bg-primary' : 'border-muted'}`} aria-hidden="true">
                    {isSelected && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>}
                </div>
            </div>
            <div className="flex items-center text-sm text-muted mt-2">
                <span>{type.duration}</span>
                <span className="mx-2" aria-hidden="true">|</span>
                <span className="font-semibold text-secondary">{type.price}</span>
            </div>
            <p className="text-muted mt-2 text-sm">{type.description}</p>
        </button>
    );
};


interface Step1ServiceProps {
    consultationTypes: ConsultationType[];
    selectedType: ConsultationType | null;
    onSelectType: (type: ConsultationType) => void;
}

const Step1Service: React.FC<Step1ServiceProps> = ({ consultationTypes, selectedType, onSelectType }) => {
    return (
        <div className="animate-fade-in">
            <h2 id="step1-heading" className="text-2xl font-bold text-secondary">Select Consultation Type</h2>
            <p className="text-muted mt-2">Choose the type of consultation that best fits your needs.</p>
            <div className="mt-6" role="radiogroup" aria-labelledby="step1-heading">
                {consultationTypes.length > 0 ? (
                    consultationTypes.map((type) => (
                        <ConsultationTypeCard 
                            key={type.id}
                            type={type}
                            isSelected={selectedType?.id === type.id}
                            onTap={() => onSelectType(type)}
                        />
                    ))
                ) : (
                    <div className="text-center p-6 bg-surface rounded-xl border border-border">
                        <p className="text-muted">No consultation types are available at the moment. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step1Service;