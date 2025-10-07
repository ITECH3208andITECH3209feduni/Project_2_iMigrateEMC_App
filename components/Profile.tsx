import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Profile } from '../types';

interface ProfilePageProps {
    session: Session;
    profile: Profile;
    onProfileUpdate: (profile: Profile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ session, profile, onProfileUpdate }) => {
    const [fullName, setFullName] = useState(profile.full_name || '');
    const [phone, setPhone] = useState(profile.phone || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFullName(profile.full_name || '');
        setPhone(profile.phone || '');
    }, [profile]);
    
    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const handleUpdateProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const updates = {
                id: session.user.id,
                full_name: fullName,
                phone: phone,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            
            onProfileUpdate(updates as Profile);
            setMessage('Profile updated successfully!');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="bg-background p-6 sm:p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold text-secondary">Personal Information</h2>
                <p className="text-muted mt-1">Update your name and phone number.</p>
                
                 {message && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">{message}</div>}
                 {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

                <form onSubmit={handleUpdateProfile} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={session.user.email}
                            disabled
                            className="w-full p-3 bg-surface border border-border rounded-lg text-muted cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-muted mb-2">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"
                            placeholder="Your full name"
                        />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"
                             placeholder="(123) 456-7890"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:bg-primary/50 flex items-center"
                        >
                            {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;