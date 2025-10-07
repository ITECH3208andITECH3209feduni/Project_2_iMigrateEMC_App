

import React from 'react';
import type { ConsultantInfo, ConsultationType } from '../types';
import { StarIcon, CalendarIcon, ClockIcon, CreditCardIcon } from './Icons';

interface Step4SummaryProps {
    consultantInfo: ConsultantInfo;
    selectedDate: Date;
    selectedTime: string;
    selectedConsultation: ConsultationType;
    selectedPaymentMethod: string;
    paymentMethods: string[];
    onPaymentMethodChange: (method: string) => void;
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const Step4Summary: React.FC<Step4SummaryProps> = ({
    consultantInfo,
    selectedDate,
    selectedTime,
    selectedConsultation,
    selectedPaymentMethod,
    paymentMethods,
    onPaymentMethodChange,
}) => {
    const isFree = Number(selectedConsultation.price.replace('$', '')) === 0;
    
    const handleKeyDown = (event: React.KeyboardEvent, method: string) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            onPaymentMethodChange(method);
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-secondary">Booking Summary</h2>
            <p className="text-muted mt-2">Review your appointment details and complete the booking.</p>
            
            <div className="mt-6 space-y-6">
                {/* Consultant Info
                <div className="bg-background p-4 rounded-xl border border-border flex items-center space-x-4">
                    <img src={consultantInfo.avatar} alt={consultantInfo.name} className="w-20 h-20 rounded-full object-cover"/>
                    <div>
                        <h3 className="text-lg font-bold text-secondary">{consultantInfo.name}</h3>
                        <p className="text-sm text-muted">{consultantInfo.specialization}</p>
                        <div className="flex items-center mt-1">
                            <StarIcon />
                            <span className="ml-1 text-sm font-semibold">{consultantInfo.rating}</span>
                            <span className="ml-2 text-sm text-muted">({consultantInfo.reviews} reviews)</span>
                        </div>
                    </div>
                </div> */}

                {/* Appointment Details */}
                <div className="bg-background p-4 rounded-xl border border-border space-y-3">
                    <h3 className="font-bold text-lg mb-2 text-secondary">Appointment Details</h3>
                    <div className="flex items-center text-muted">
                        <CalendarIcon />
                        <span className="ml-3">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex items-center text-muted">
                        <ClockIcon />
                        <span className="ml-3">{selectedTime}</span>
                    </div>
                     <div className="border-t my-3 border-border"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted">{selectedConsultation.title}</span>
                        <span className="font-semibold text-secondary">{selectedConsultation.price}</span>
                    </div>
                     <div className="border-t my-3 border-border"></div>
                     <div className="flex justify-between items-center text-lg font-bold text-secondary">
                        <span>Total Cost</span>
                        <span>{selectedConsultation.price}</span>
                    </div>
                </div>

                {/* Payment Method */}
                {!isFree && (
                    <div className="bg-background p-4 rounded-xl border border-border">
                        <h3 id="payment-heading" className="font-bold text-lg mb-4 text-secondary">Payment Method</h3>
                        <div className="space-y-3" role="radiogroup" aria-labelledby="payment-heading">
                            {paymentMethods.map(method => (
                                <div 
                                    key={method}
                                    onClick={() => onPaymentMethodChange(method)}
                                    onKeyDown={(e) => handleKeyDown(e, method)}
                                    role="radio"
                                    aria-checked={selectedPaymentMethod === method}
                                    tabIndex={0}
                                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedPaymentMethod === method ? 'border-primary bg-primary-light' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selectedPaymentMethod === method ? 'border-primary' : 'border-muted'}`} aria-hidden="true">
                                        {selectedPaymentMethod === method && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                    <CreditCardIcon />
                                    <span className="ml-3 font-medium text-secondary">{method}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step4Summary;