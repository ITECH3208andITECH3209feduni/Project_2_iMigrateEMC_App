import React, { useState, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { UserIcon, LogOutIcon, CogIcon } from './Icons';

interface UserMenuProps {
    user: User;
    onSignOut: () => void;
    onMyBookings: () => void;
    onProfile: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut, onMyBookings, onProfile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }

    return (
        <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center p-1 rounded-full border border-border hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-background ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                >
                    <div className="py-1" role="none">
                        <div className="px-4 py-2 border-b border-border">
                            <p className="text-sm text-muted">Signed in as</p>
                            <p className="text-sm font-medium text-secondary truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={() => { onMyBookings(); setIsOpen(false); }}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-muted hover:bg-surface hover:text-secondary"
                            role="menuitem"
                        >
                            <UserIcon /> My Bookings
                        </button>
                        <button
                            onClick={() => { onProfile(); setIsOpen(false); }}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-muted hover:bg-surface hover:text-secondary"
                            role="menuitem"
                        >
                            <CogIcon /> Profile
                        </button>
                        <button
                            onClick={onSignOut}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-muted hover:bg-surface hover:text-secondary border-t border-border"
                            role="menuitem"
                        >
                            <LogOutIcon /> Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;