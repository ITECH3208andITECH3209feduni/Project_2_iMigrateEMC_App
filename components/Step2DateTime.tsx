import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    availableDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, availableDates }) => {
    const [displayDate, setDisplayDate] = useState(selectedDate);
    const [animationClass, setAnimationClass] = useState('');

    const availableDateSet = useMemo(() => new Set(
        availableDates.map(d => d.toDateString())
    ), [availableDates]);

    const today = new Date();

    const changeMonth = (direction: 'next' | 'prev') => {
        const outClass = direction === 'next' ? 'animate-slide-out-left' : 'animate-slide-out-right';
        setAnimationClass(outClass);

        setTimeout(() => {
            setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() + (direction === 'next' ? 1 : -1), 1));
            const inClass = direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left';
            setAnimationClass(inClass);
        }, 150);
    };

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentYear = displayDate.getFullYear();
    const currentMonth = displayDate.getMonth();
    const numDays = daysInMonth(currentYear, currentMonth);
    const startDay = firstDayOfMonth(currentYear, currentMonth);

    const dayCells = [];
    for (let i = 0; i < startDay; i++) {
        dayCells.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= numDays; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateString = date.toDateString();
        const isSelected = dateString === selectedDate.toDateString();
        const isAvailable = availableDateSet.has(dateString);
        const isToday = dateString === today.toDateString();

        let classes = 'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

        if (isSelected) {
            classes += ' bg-primary text-white font-bold shadow-md transform scale-105';
        } else if (isAvailable) {
            classes += ' cursor-pointer text-secondary hover:bg-primary-light';
            if (isToday) {
                classes += ' border-2 border-primary font-bold';
            } else {
                classes += ' font-medium';
            }
        } else {
            classes += ' text-muted/50 cursor-not-allowed';
        }

        dayCells.push(
            <div key={day} className="flex justify-center items-center">
                <button 
                    onClick={() => isAvailable && onDateChange(date)} 
                    className={classes} 
                    disabled={!isAvailable}
                    aria-pressed={isSelected}
                    aria-disabled={!isAvailable}
                    aria-label={date.toDateString()}
                >
                    {day}
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-background p-4 rounded-xl border border-border">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth('prev')} className="p-2 rounded-full hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary" aria-label="Previous month"><ChevronLeftIcon /></button>
                <div className="font-bold text-lg text-secondary">{displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                <button onClick={() => changeMonth('next')} className="p-2 rounded-full hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary" aria-label="Next month"><ChevronRightIcon /></button>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-medium text-muted text-sm" aria-hidden="true">{day}</div>)}
            </div>
            <div className="overflow-hidden mt-2 h-72"> {/* Fixed height container for smooth animation */}
                <div className={`grid grid-cols-7 gap-y-2 text-center ${animationClass}`}>
                    {dayCells}
                </div>
            </div>
        </div>
    );
};

interface TimeSlotWidgetProps {
    timeSlots: string[];
    selectedTimeSlot: string;
    onTimeSlotSelect: (timeSlot: string) => void;
}

const TimeSlotWidget: React.FC<TimeSlotWidgetProps> = ({ timeSlots, selectedTimeSlot, onTimeSlotSelect }) => {
    return (
        <div className="bg-background p-4 rounded-xl border border-border">
             <div className="flex justify-between items-center mb-4">
                <h3 id="timeslot-heading" className="font-bold text-lg text-secondary">Available Slots</h3>
                <span className="text-sm text-muted">EST (UTC-5)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="group" aria-labelledby="timeslot-heading">
                {timeSlots.map(slot => (
                    <button
                        key={slot}
                        onClick={() => onTimeSlotSelect(slot)}
                        aria-pressed={selectedTimeSlot === slot}
                        className={`p-3 rounded-lg text-center font-semibold transition-colors duration-200 ${
                            selectedTimeSlot === slot
                                ? 'bg-primary text-white'
                                : 'bg-surface text-muted hover:bg-primary-light hover:text-primary'
                        }`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
};


interface Step2DateTimeProps extends CalendarProps, TimeSlotWidgetProps {}

const Step2DateTime: React.FC<Step2DateTimeProps> = (props) => {
    const isDateAvailable = useMemo(() => 
        props.availableDates.some(d => d.toDateString() === props.selectedDate.toDateString()),
        [props.availableDates, props.selectedDate]
    );

    const onDateChangeWrapper = (date: Date) => {
        props.onDateChange(date);
        props.onTimeSlotSelect(''); // Reset time slot when date changes
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-secondary">Select Date & Time</h2>
            <p className="text-muted mt-2">Choose your preferred appointment date and time slot.</p>
            <div className="mt-6 space-y-6">
                <Calendar 
                    selectedDate={props.selectedDate}
                    onDateChange={onDateChangeWrapper}
                    availableDates={props.availableDates}
                />
                {isDateAvailable && (
                    <TimeSlotWidget 
                        timeSlots={props.timeSlots}
                        selectedTimeSlot={props.selectedTimeSlot}
                        onTimeSlotSelect={props.onTimeSlotSelect}
                    />
                )}
            </div>
        </div>
    );
};

export default Step2DateTime;