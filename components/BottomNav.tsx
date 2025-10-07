import React from 'react';
import type { Tab } from '../App';
import { HomeIcon, VisaIcon, AppointmentIcon, EOIIcon, AboutIcon } from './Icons';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const NavItem: React.FC<{
    label: Tab;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    const activeClass = isActive ? 'text-primary' : 'text-muted';
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 hover:text-primary/80 ${activeClass}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {icon}
            <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const iconClass = "h-6 w-6";
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-30">
            <div className="max-w-4xl mx-auto flex justify-around">
                <NavItem 
                    label="Home"
                    icon={<HomeIcon className={iconClass} />}
                    isActive={activeTab === 'Home'}
                    onClick={() => onTabChange('Home')}
                />
                <NavItem 
                    label="Visa"
                    icon={<VisaIcon className={iconClass} />}
                    isActive={activeTab === 'Visa'}
                    onClick={() => onTabChange('Visa')}
                />
                <NavItem 
                    label="Appointment"
                    icon={<AppointmentIcon className={iconClass} />}
                    isActive={activeTab === 'Appointment'}
                    onClick={() => onTabChange('Appointment')}
                />
                <NavItem 
                    label="EOI"
                    icon={<EOIIcon className={iconClass} />}
                    isActive={activeTab === 'EOI'}
                    onClick={() => onTabChange('EOI')}
                />
                <NavItem 
                    label="About"
                    icon={<AboutIcon className={iconClass} />}
                    isActive={activeTab === 'About'}
                    onClick={() => onTabChange('About')}
                />
            </div>
        </nav>
    );
};

export default BottomNav;