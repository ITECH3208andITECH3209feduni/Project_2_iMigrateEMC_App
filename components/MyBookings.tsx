import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Booking } from '../types';
import { CalendarIcon, ClockIcon } from './Icons';

interface MyBookingsProps {
    session: Session;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const baseClasses = "text-xs font-semibold px-2.5 py-1 rounded-full inline-block";
    let colorClasses = "bg-gray-100 text-gray-800"; // Default

    switch (status?.toLowerCase()) {
        case 'confirmed':
            colorClasses = "bg-green-100 text-green-800";
            break;
        case 'pending':
            colorClasses = "bg-yellow-100 text-yellow-800";
            break;
        case 'cancelled':
            colorClasses = "bg-red-100 text-red-800";
            break;
    }

    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


const MyBookings: React.FC<MyBookingsProps> = ({ session }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (!session.user) throw new Error("No user session found.");

                const { data, error } = await supabase
                    .from('bookings')
                    .select(`
                        id,
                        created_at,
                        booking_date,
                        time_slot,
                        purpose,
                        total_cost,
                        status,
                        consultation_type (
                            title
                        )
                    `)
                    .eq('user_id', session.user.id)
                    .order('booking_date', { ascending: false });

                if (error) throw error;
                
                // FIX: The type error indicates that Supabase returns `consultation_type` as an array
                // instead of an object. This can happen if the client library cannot determine the
                // relationship cardinality. We'll map the data to ensure `consultation_type` is an
                // object, as expected by the `Booking` type.
                const bookingsData = data?.map(b => ({
                    ...b,
                    consultation_type: Array.isArray(b.consultation_type) ? b.consultation_type[0] : b.consultation_type,
                })) || [];
                setBookings(bookingsData as unknown as Booking[]);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [session]);

    const formatDate = (dateStr: string) => new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    if (loading) {
        return (
            <div className="text-center p-8" role="status">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="sr-only">Loading bookings...</p>
            </div>
        );
    }
    
    if (error) {
        return <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg" role="alert">{error}</div>;
    }

    return (
        <div className="animate-fade-in space-y-4">
            {bookings.length > 0 ? (
                bookings.map(booking => (
                    <div key={booking.id} className="bg-background p-4 sm:p-6 rounded-xl border border-border transition-shadow hover:shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start border-b pb-3 mb-3 border-border">
                             <h3 className="text-lg font-bold text-secondary">{booking.consultation_type.title}</h3>
                             <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                <p className="text-xl font-bold text-primary">${booking.total_cost.toFixed(2)}</p>
                                <StatusBadge status={booking.status} />
                             </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted">
                             <div className="flex items-center">
                                <CalendarIcon />
                                <span className="ml-2">{formatDate(booking.booking_date)}</span>
                            </div>
                             <div className="flex items-center">
                                <ClockIcon />
                                <span className="ml-2">{booking.time_slot}</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-semibold text-muted">Purpose:</p>
                            <p className="text-sm text-secondary">{booking.purpose}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center p-8 bg-surface rounded-lg">
                    <h3 className="text-xl font-semibold text-secondary">No Appointments Yet</h3>
                    <p className="text-muted mt-2">You haven't booked any appointments. Get started by selecting a service.</p>
                </div>
            )}
        </div>
    );
};

export default MyBookings;