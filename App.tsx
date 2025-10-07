
import React, { useState, useEffect } from 'react';
import type { Profile } from './types';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
import ChatWidget from './components/ChatWidget';
import BottomNav from './components/BottomNav';
import { supabase } from './lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

import HomePage from './pages/Home';
import VisaPage from './pages/Visa';
import AppointmentPage from './pages/Appointment';
import EOIPage from './pages/EOI';
import AboutPage from './pages/About';
import { ChatBubbleIcon, XIcon } from './components/Icons';
import MyBookingsModal from './components/MyBookingsModal';
import ProfilePage from './components/Profile';

export type Tab = 'Home' | 'Visa' | 'Appointment' | 'EOI' | 'About';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Home');
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const fetchProfile = async (user_id: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, full_name, phone')
                .eq('id', user_id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            setProfile(data);
        } catch (error: any) {
            console.error('Error fetching profile:', error.message);
        }
    };

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setIsChatOpen(false);
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                fetchProfile(session.user.id);
            }
            setIsInitialLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setActiveTab('Home');
    };

    const handleProfileUpdate = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
    };

    const renderActivePage = () => {
        switch (activeTab) {
            case 'Home':
                return <HomePage onBookAppointment={() => setActiveTab('Appointment')} />;
            case 'Visa':
                return <VisaPage />;
            case 'Appointment':
                return <AppointmentPage
                    session={session}
                    onRequestLogin={() => setAuthModalOpen(true)}
                    onViewBookings={() => setIsMyBookingsModalOpen(true)}
                />;
            case 'EOI':
                return <EOIPage session={session} />;
            case 'About':
                return <AboutPage />;
            default:
                return <HomePage onBookAppointment={() => setActiveTab('Appointment')} />;
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center" role="status">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface font-sans text-secondary flex flex-col">
            <header className="bg-background/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-20">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center">
                        <img
                            src="https://imigrateemc.com/web/image/website/1/logo/imigrateemc?unique=6d04d39"
                            alt="iMigrate EMC Logo"
                            className="h-10 w-auto"
                        />
                    </a>

                    <div>
                        {session ? (
                            <UserMenu
                                user={session.user}
                                onSignOut={handleSignOut}
                                onMyBookings={() => setIsMyBookingsModalOpen(true)}
                                onProfile={() => setIsProfileModalOpen(true)}
                            />
                        ) : (
                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    {renderActivePage()}
                </div>
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

            {isAuthModalOpen && <AuthModal supabaseClient={supabase} onSuccess={() => setAuthModalOpen(false)} onClose={() => setAuthModalOpen(false)} />}

            {isMyBookingsModalOpen && session && (
                <MyBookingsModal session={session} onClose={() => setIsMyBookingsModalOpen(false)} />
            )}

            {isProfileModalOpen && session && profile && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
                    <div className="max-w-2xl w-full relative animate-fade-in-up">
                        <ProfilePage
                            session={session}
                            profile={profile}
                            onProfileUpdate={handleProfileUpdate}
                        />
                        <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100" aria-label="Close profile settings">
                            <XIcon />
                        </button>
                    </div>
                </div>
            )}

            {session && (
                <>
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="fixed bottom-24 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:opacity-90 flex items-center justify-center z-40 transition-transform hover:scale-110"
                        aria-label="Open chat"
                    >
                        <ChatBubbleIcon />
                    </button>
                    {isChatOpen && <ChatWidget session={session} onClose={() => setIsChatOpen(false)} />}
                </>
            )}
        </div>
    );
};

export default App;