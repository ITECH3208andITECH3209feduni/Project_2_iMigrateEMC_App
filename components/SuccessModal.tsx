import React from 'react';
import { CheckCircleIcon } from './Icons';

interface SuccessModalProps {
    onViewBookings: () => void;
    onBookAnother: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onViewBookings, onBookAnother }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div 
                className="bg-background rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in-up"
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-modal-title"
            >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon />
                </div>
                <h2 id="success-modal-title" className="text-2xl font-bold mt-6 text-secondary">Booking Confirmed!</h2>
                <p className="text-muted mt-2">
                    Your appointment has been successfully booked. You can view it in your bookings list.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={onViewBookings}
                        className="w-full py-3 px-4 border border-border text-muted font-semibold rounded-xl hover:bg-surface transition-colors"
                    >
                        View My Bookings
                    </button>
                    <button 
                        onClick={onBookAnother}
                        className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Book Another
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;