

import React, { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { XIcon } from './Icons';

interface AuthModalProps {
    supabaseClient: SupabaseClient;
    onSuccess: () => void;
    onClose: () => void;
}

type AuthView = 'signIn' | 'signUp' | 'forgotPassword';

const AuthModal: React.FC<AuthModalProps> = ({ supabaseClient, onSuccess, onClose }) => {
    const [view, setView] = useState<AuthView>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // New state for OTP flow
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleAuth = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (view === 'signUp') {
                const { error } = await supabaseClient.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            } else { // 'signIn'
                const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onSuccess();
            }
        } catch (error: any) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordResetRequest = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            // This sends an email based on the "Reset Password" template in Supabase.
            // For this to work with an OTP, the template must show the {{ .Token }}.
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
            if (error) throw error;
            setMessage('A password reset code has been sent to your email.');
            setOtpSent(true);
        } catch (error: any) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleVerifyAndResetPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
             // Verify the recovery token. This also signs the user in.
            const { data: verifyData, error: verifyError } = await supabaseClient.auth.verifyOtp({
                email,
                token: otp,
                type: 'recovery',
            });
            if (verifyError) throw verifyError;
            if (!verifyData.session) throw new Error("Could not verify OTP. Please try again.");

            // The user is now authenticated, so we can update their password.
            const { error: updateError } = await supabaseClient.auth.updateUser({
                password: newPassword,
            });
            if (updateError) throw updateError;
            
            // Sign out to complete the flow, so they must log in with the new password.
            await supabaseClient.auth.signOut();
            
            setMessage('Password updated successfully! You can now sign in with your new password.');
            setOtpSent(false);
            setView('signIn');

        } catch (error: any) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };


    const switchView = (newView: AuthView) => {
        setView(newView);
        setError(null);
        setMessage(null);
        // Don't reset email when moving from sign-in to forgot password
        if (newView !== 'forgotPassword') {
            setEmail('');
        }
        setPassword('');
        setOtpSent(false);
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-background rounded-2xl p-8 max-w-sm w-full relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface" aria-label="Close authentication form">
                    <XIcon />
                </button>
                
                {view !== 'forgotPassword' && (
                    <div className="flex border-b border-border mb-6">
                        <button onClick={() => switchView('signIn')} className={`flex-1 py-2 font-semibold ${view === 'signIn' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}>
                            Sign In
                        </button>
                        <button onClick={() => switchView('signUp')} className={`flex-1 py-2 font-semibold ${view === 'signUp' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}>
                            Sign Up
                        </button>
                    </div>
                )}

                {view === 'forgotPassword' ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-1 text-secondary">Reset Password</h2>
                         {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm my-4">{error}</p>}
                         {message && <p className="bg-green-100 text-green-700 p-3 rounded-lg text-sm my-4">{message}</p>}

                        {!otpSent ? (
                             <form onSubmit={handlePasswordResetRequest} className="space-y-4">
                                <p className="text-muted text-center mb-6">Enter your email to receive a password reset code.</p>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">Email</label>
                                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="you@example.com" />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:bg-primary/50 flex justify-center items-center">
                                    {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Send Reset Code'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyAndResetPassword} className="space-y-4">
                                <p className="text-muted text-center mb-6">Enter the code from your email and set a new password.</p>
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-muted mb-1">Reset Code</label>
                                    <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="123456" />
                                </div>
                                <div>
                                    <label htmlFor="new-password">New Password</label>
                                    <input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-new-password">Confirm New Password</label>
                                    <input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="••••••••" />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:bg-primary/50 flex justify-center items-center">
                                     {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Reset Password'}
                                </button>
                            </form>
                        )}
                        <div className="text-center mt-4">
                            <button onClick={() => switchView('signIn')} className="text-sm text-primary hover:underline">
                                Back to Sign In
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-1 text-secondary">{view === 'signUp' ? 'Create an Account' : 'Welcome Back'}</h2>
                        <p className="text-muted text-center mb-6">Please {view === 'signUp' ? 'sign up' : 'sign in'} to continue.</p>

                        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">{error}</p>}
                        {message && <p className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4">{message}</p>}

                        <form onSubmit={handleAuth} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">Email</label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="password"  className="block text-sm font-medium text-muted mb-1">Password</label>
                                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" placeholder="••••••••" />
                            </div>
                             {view === 'signIn' && (
                                <div className="text-right">
                                    <button type="button" onClick={() => switchView('forgotPassword')} className="text-sm font-medium text-primary hover:underline">
                                        Forgot your password?
                                    </button>
                                </div>
                            )}
                            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:bg-primary/50 flex justify-center items-center">
                                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (view === 'signUp' ? 'Sign Up' : 'Sign In')}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthModal;