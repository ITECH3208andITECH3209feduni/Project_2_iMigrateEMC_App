
import React, { useState, useCallback, useEffect } from 'react';
import { STEP_TITLES } from '../constants';
import type { ConsultationType, ConsultantInfo, Booking } from '../types';
import ProgressIndicator from '../components/ProgressIndicator';
import Step1Service from '../components/Step1Service';
import Step2DateTime from '../components/Step2DateTime';
import Step3Details from '../components/Step3Details';
import Step4Summary from '../components/Step4Summary';
import SuccessModal from '../components/SuccessModal';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

interface AppointmentPageProps {
    session: Session | null;
    onRequestLogin: () => void;
    onViewBookings: () => void;
}

const AppointmentPage: React.FC<AppointmentPageProps> = ({ session, onRequestLogin, onViewBookings }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4;
    
    // Form State
    const [selectedConsultation, setSelectedConsultation] = useState<ConsultationType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [questions, setQuestions] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card');
    
    // App State
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAwaitingLogin, setIsAwaitingLogin] = useState(false); // New state to manage post-login booking

    // Fetched Data
    const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([]);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [purposeOptions, setPurposeOptions] = useState<string[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
    const [consultantInfo, setConsultantInfo] = useState<ConsultantInfo | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    consultationsRes, datesRes, slotsRes, purposesRes, paymentsRes, consultantRes
                ] = await Promise.all([
                    supabase.from('consultation_type').select('*').order('id'),
                    supabase.from('available_dates').select('date'),
                    supabase.from('time_slots').select('slot').order('id'),
                    supabase.from('purpose_options').select('option').order('id'),
                    supabase.from('payment_methods').select('method').order('id'),
                    supabase.from('consultant_info').select('*').limit(1).single()
                ]);

                if (consultationsRes.error) throw consultationsRes.error;
                if (datesRes.error) throw datesRes.error;
                if (slotsRes.error) throw slotsRes.error;
                if (purposesRes.error) throw purposesRes.error;
                if (paymentsRes.error) throw paymentsRes.error;
                if (consultantRes.error) throw consultantRes.error;

                setConsultationTypes(consultationsRes.data || []);
                // Fix: Parse date strings as local dates to avoid timezone shift issues.
                setAvailableDates((datesRes.data || []).map((d: { date: string }) => new Date(d.date + 'T00:00:00')));
                setTimeSlots((slotsRes.data || []).map((s: { slot: string }) => s.slot));
                setPurposeOptions((purposesRes.data || []).map((p: { option: string }) => p.option));
                setPaymentMethods((paymentsRes.data || []).map((p: { method: string }) => p.method));
                setConsultantInfo(consultantRes.data || null);

            } catch (error: any) {
                setError(`Failed to load appointment data: ${error.message}`);
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };
    
    const validateStep = useCallback(() => {
        switch (currentStep) {
            case 0: if (!selectedConsultation) { setError('Please select a consultation type'); return false; } break;
            case 1: if (!selectedTimeSlot) { setError('Please select a date and time slot'); return false; } break;
            case 2: if (!selectedPurpose) { setError('Please select a consultation purpose'); return false; } break;
            case 3:
                if (selectedConsultation && Number(selectedConsultation.price.replace(/[^0-9.-]+/g,"")) > 0 && !selectedPaymentMethod) {
                    setError('Please select a payment method');
                    return false;
                }
                break;
            default: return true;
        }
        return true;
    }, [currentStep, selectedConsultation, selectedTimeSlot, selectedPurpose, selectedPaymentMethod]);

    const handleNext = () => {
        if (validateStep()) {
            if (currentStep < totalSteps - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                preConfirmCheck();
            }
        }
    };

    const preConfirmCheck = () => {
        if (!session) {
            setIsAwaitingLogin(true); // Set flag to trigger booking after successful login
            onRequestLogin();
        } else {
            confirmBooking();
        }
    };
    
    // This effect handles the booking flow for users who needed to log in.
    useEffect(() => {
        if (session && isAwaitingLogin) {
            setIsAwaitingLogin(false); // Reset flag
            if (currentStep === totalSteps - 1) {
                confirmBooking();
            }
        }
    }, [session, isAwaitingLogin, currentStep]);

    const clearFormState = () => {
        setCurrentStep(0);
        setSelectedConsultation(null);
        setSelectedDate(new Date());
        setSelectedTimeSlot('');
        setSelectedPurpose('');
        setQuestions('');
        setUploadedFiles([]);
        setSelectedPaymentMethod('Credit Card');
    };
    
    const confirmBooking = async () => {
        // Guard to prevent re-entrant calls and duplicate submissions
        if (isLoading) return;

        if (!session) {
            setError('You must be logged in to book an appointment.');
            preConfirmCheck();
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            if (!selectedConsultation) throw new Error("Consultation type not selected.");
            
            const uploadedFileUrls: string[] = [];
            if (uploadedFiles.length > 0) {
                 for (const file of uploadedFiles) {
                    const fileName = `public/${session.user.id}/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('documents')
                        .upload(fileName, file);

                    if (uploadError) throw uploadError;

                    if (uploadData?.path) {
                        const { data: publicUrlData } = supabase.storage
                            .from('documents')
                            .getPublicUrl(uploadData.path);
                        if (publicUrlData?.publicUrl) uploadedFileUrls.push(publicUrlData.publicUrl);
                    }
                }
            }

            const totalCost = Number(selectedConsultation.price.replace(/[^0-9.-]+/g,""));
            
            // Fix: Format date to YYYY-MM-DD string from local date components to avoid timezone shifts.
            const bookingDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

            const bookingData = {
                consultation_type_id: selectedConsultation.id,
                booking_date: bookingDateStr,
                time_slot: selectedTimeSlot,
                purpose: selectedPurpose,
                questions: questions,
                payment_method: totalCost === 0 ? null : selectedPaymentMethod,
                document_urls: uploadedFileUrls,
                total_cost: totalCost,
                user_id: session.user.id,
                client_email: session.user.email,
                status: 'Confirmed',
            };

            const { error: insertError } = await supabase.from('bookings').insert([bookingData]);
            if (insertError) throw insertError;

            setIsSuccessModalOpen(true);
            clearFormState(); // Reset form in background after success
        } catch (err: any) {
            setError(`Booking failed: ${err.message || 'Please try again.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const resetBooking = () => {
        // Now this only closes the modal, as the form state is already reset.
        setIsSuccessModalOpen(false);
    };

    if (isInitialLoading) {
        return (
            <div className="flex items-center justify-center py-10" role="status">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <Step1Service consultationTypes={consultationTypes} selectedType={selectedConsultation} onSelectType={setSelectedConsultation} />;
            case 1: return <Step2DateTime selectedDate={selectedDate} onDateChange={setSelectedDate} availableDates={availableDates} timeSlots={timeSlots} selectedTimeSlot={selectedTimeSlot} onTimeSlotSelect={setSelectedTimeSlot} />;
            case 2: return <Step3Details purposeOptions={purposeOptions} selectedPurpose={selectedPurpose} onPurposeChange={setSelectedPurpose} questions={questions} onQuestionsChange={setQuestions} uploadedFiles={uploadedFiles} onFilesChange={setUploadedFiles} />;
            case 3:
                if (!consultantInfo || !selectedConsultation) return <div className="text-center p-6 bg-background rounded-xl"><p className="text-red-500">Could not load summary. Please go back.</p></div>;
                return <Step4Summary consultantInfo={consultantInfo} selectedDate={selectedDate} selectedTime={selectedTimeSlot} selectedConsultation={selectedConsultation} selectedPaymentMethod={selectedPaymentMethod} paymentMethods={paymentMethods} onPaymentMethodChange={setSelectedPaymentMethod} />;
            default: return null;
        }
    };

    return (
        <div className="animate-fade-in">
             {error && (
                <div role="alert" className="fixed top-20 right-5 bg-primary text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-down">
                    {error}
                </div>
            )}
            <>
                <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitles={STEP_TITLES} />
                <div className="mt-8">{renderStep()}</div>
            </>
           
            <div className="bg-background/95 backdrop-blur-sm border-t border-border p-4 sticky bottom-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex gap-4">
                    {currentStep > 0 && (
                        <button onClick={handleBack} disabled={isLoading} className="flex-1 py-3 px-4 border border-primary text-primary font-semibold rounded-xl hover:bg-primary-light disabled:opacity-50">Previous</button>
                    )}
                    <button onClick={handleNext} disabled={isLoading} className="flex-auto bg-primary text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 disabled:bg-primary/50 flex justify-center items-center" style={{ flexGrow: currentStep > 0 ? 1 : 2 }}>
                        {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (currentStep === totalSteps - 1 ? 'Confirm Booking' : 'Next')}
                    </button>
                </div>
            </div>

            {isSuccessModalOpen && <SuccessModal 
                onBookAnother={resetBooking} 
                onViewBookings={() => {
                    setIsSuccessModalOpen(false);
                    onViewBookings();
                }} 
            />}
        </div>
    );
};

export default AppointmentPage;
