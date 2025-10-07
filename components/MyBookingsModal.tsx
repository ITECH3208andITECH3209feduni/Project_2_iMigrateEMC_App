import React from 'react';
import type { Session } from '@supabase/supabase-js';
import MyBookings from './MyBookings';
import { XIcon } from './Icons';

interface MyBookingsModalProps {
    session: Session;
    onClose: () => void;
}

const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ session, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="bookings-modal-title"
        >
            <div className="bg-surface rounded-2xl p-6 sm:p-8 max-w-2xl w-full h-full max-h-[90vh] flex flex-col animate-fade-in-up">
                <header className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                    <h2 id="bookings-modal-title" className="text-2xl font-bold text-secondary">My Bookings</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-border" aria-label="Close my bookings">
                        <XIcon />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto -mr-4 pr-4">
                    <MyBookings session={session} />
                </main>
            </div>
        </div>
    );
};

export default MyBookingsModal;