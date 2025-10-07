import React, { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface EOIPageProps {
    session: Session | null;
}

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    companyName: '',
    hasRegisteredBusiness: 'No',
    businessType: '',
    hasPhysicalOffice: 'No',
    businessAddress: '',
    wantsAdditionalOffices: 'No',
    willingToRebrand: 'No',
    yearsOfExperience: '',
    teamSize: '',
    existingClients: '',
    previousPartnerships: '',
    reasonForPartnership: '',
    servicesToOffer: '',
    targetAudience: '',
    specialCapabilities: '',
    additionalComments: '',
    agreedToDisclaimer: false,
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="pt-6 border-t first:pt-0 first:border-t-0 border-border">
        <h2 className="text-xl font-bold text-secondary mb-4">{title}</h2>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const RadioGroup: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean }> = ({ label, name, value, onChange, required = true }) => (
    <div>
        <label className="block text-sm font-medium text-muted mb-2">{label}</label>
        <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} value="Yes" checked={value === 'Yes'} onChange={onChange} className="h-4 w-4 text-primary focus:ring-primary border-muted" required={required} />
                <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={name} value="No" checked={value === 'No'} onChange={onChange} className="h-4 w-4 text-primary focus:ring-primary border-muted" required={required} />
                <span>No</span>
            </label>
        </div>
    </div>
);


const EOIPage: React.FC<EOIPageProps> = ({ session }) => {
    const [formData, setFormData] = useState({ ...initialFormData, email: session?.user?.email || '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
     const resetForm = () => {
        setFormData({ ...initialFormData, email: session?.user?.email || '' });
        setSuccess(false);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
             // Map frontend camelCase state to backend snake_case columns
            const submissionData = {
                user_id: session?.user?.id || null,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                company_name: formData.companyName || null,
                has_registered_business: formData.hasRegisteredBusiness,
                business_type: formData.businessType,
                has_physical_office: formData.hasPhysicalOffice,
                business_address: formData.businessAddress,
                wants_additional_offices: formData.wantsAdditionalOffices,
                willing_to_rebrand: formData.willingToRebrand,
                years_of_experience: Number(formData.yearsOfExperience),
                team_size: Number(formData.teamSize),
                existing_clients: formData.existingClients || null,
                previous_partnerships: formData.previousPartnerships,
                reason_for_partnership: formData.reasonForPartnership,
                services_to_offer: formData.servicesToOffer,
                target_audience: formData.targetAudience,
                special_capabilities: formData.specialCapabilities || null,
                additional_comments: formData.additionalComments || null,
                agreed_to_disclaimer: formData.agreedToDisclaimer,
            };

            const { error } = await supabase.from('partner_eoi').insert([submissionData]);
            
            if (error) {
                throw error;
            }
            
            setSuccess(true);

        } catch(err: any) {
             setError(`Failed to submit your form: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };
    
    if (success) {
        return (
            <div className="animate-fade-in text-center bg-background p-8 rounded-xl border border-border">
                <h1 className="text-2xl font-bold text-green-600">Thank You for Your Interest!</h1>
                <p className="text-muted mt-2 max-w-lg mx-auto">Your partnership application has been received. Our team will carefully review your information and will be in touch with you shortly to discuss potential collaboration.</p>
                 <button 
                    onClick={resetForm}
                    className="mt-6 px-6 py-2 border border-border text-muted font-semibold rounded-xl hover:bg-surface transition-colors"
                >
                    Submit Another Application
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-secondary">Partnership Expression of Interest (EOI)</h1>
            <p className="text-muted mt-2">
                Interested in partnering with iMigrateEMC? Complete the form below to help us understand your business and explore how we can work together.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 bg-background p-6 sm:p-8 rounded-xl border border-border space-y-6">
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</p>}
                
                <FormSection title="1. Basic Contact Information">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-muted mb-2">First Name</label>
                            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-muted mb-2">Last Name</label>
                            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email Address</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">Phone Number</label>
                            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-muted mb-2">Country / City / State</label>
                        <input id="location" name="location" type="text" value={formData.location} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                    </div>
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-muted mb-2">Company Name (if applicable)</label>
                        <input id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleChange} className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                    </div>
                </FormSection>

                <FormSection title="2. Business Details">
                    <RadioGroup label="Do you have a registered business?" name="hasRegisteredBusiness" value={formData.hasRegisteredBusiness} onChange={handleChange} />
                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-muted mb-2">Business Type / Category</label>
                        <input id="businessType" name="businessType" type="text" placeholder="e.g., consultancy, travel, education services" value={formData.businessType} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                    </div>
                    <RadioGroup label="Physical office available?" name="hasPhysicalOffice" value={formData.hasPhysicalOffice} onChange={handleChange} />
                    <div>
                        <label htmlFor="businessAddress" className="block text-sm font-medium text-muted mb-2">Business Address</label>
                        <textarea id="businessAddress" name="businessAddress" rows={3} value={formData.businessAddress} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                    <RadioGroup label="Are you interested in opening additional offices?" name="wantsAdditionalOffices" value={formData.wantsAdditionalOffices} onChange={handleChange} />
                    <RadioGroup label='Are you willing to incorporate "iMigrate" into your business name as a franchise model?' name="willingToRebrand" value={formData.willingToRebrand} onChange={handleChange} />
                </FormSection>

                <FormSection title="3. Experience and Capabilities">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                             <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-muted mb-2">Years of experience in visa consultancy / related services</label>
                            <input id="yearsOfExperience" name="yearsOfExperience" type="number" min="0" value={formData.yearsOfExperience} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                        <div>
                             <label htmlFor="teamSize" className="block text-sm font-medium text-muted mb-2">Number of staff / team members</label>
                            <input id="teamSize" name="teamSize" type="number" min="0" value={formData.teamSize} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="existingClients" className="block text-sm font-medium text-muted mb-2">Existing clients (optional, e.g., number or type)</label>
                        <input id="existingClients" name="existingClients" type="text" value={formData.existingClients} onChange={handleChange} className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30" />
                    </div>
                    <div>
                        <label htmlFor="previousPartnerships" className="block text-sm font-medium text-muted mb-2">Previous partnerships or collaborations</label>
                        <textarea id="previousPartnerships" name="previousPartnerships" rows={3} value={formData.previousPartnerships} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                </FormSection>

                <FormSection title="4. Interest & Goals">
                     <div>
                        <label htmlFor="reasonForPartnership" className="block text-sm font-medium text-muted mb-2">Why are you interested in partnering with iMigrateEMC?</label>
                        <textarea id="reasonForPartnership" name="reasonForPartnership" rows={4} value={formData.reasonForPartnership} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                     <div>
                        <label htmlFor="servicesToOffer" className="block text-sm font-medium text-muted mb-2">What services do you want to offer under the partnership?</label>
                        <textarea id="servicesToOffer" name="servicesToOffer" rows={3} value={formData.servicesToOffer} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                    <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-muted mb-2">Expected market reach / target audience</label>
                        <textarea id="targetAudience" name="targetAudience" rows={3} value={formData.targetAudience} onChange={handleChange} required className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                </FormSection>

                 <FormSection title="5. Additional Information">
                    <div>
                        <label htmlFor="specialCapabilities" className="block text-sm font-medium text-muted mb-2">Any special capabilities (languages, software, marketing expertise)</label>
                        <textarea id="specialCapabilities" name="specialCapabilities" rows={3} value={formData.specialCapabilities} onChange={handleChange} className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                    <div>
                        <label htmlFor="additionalComments" className="block text-sm font-medium text-muted mb-2">Additional comments or questions (optional)</label>
                        <textarea id="additionalComments" name="additionalComments" rows={3} value={formData.additionalComments} onChange={handleChange} className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary transition-colors focus:bg-primary-light/30"></textarea>
                    </div>
                </FormSection>

                 <FormSection title="6. Agreement / Disclaimer">
                     <div className="bg-surface p-4 rounded-lg border border-border text-sm text-muted space-y-2">
                        <p>By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.</p>
                        <p>You understand that any misrepresentation may lead to the rejection of your application. You grant iMigrateEMC permission to contact you to evaluate this application further.</p>
                     </div>
                     <div className="flex items-start">
                        <input
                            id="agreedToDisclaimer"
                            name="agreedToDisclaimer"
                            type="checkbox"
                            checked={formData.agreedToDisclaimer}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-muted rounded mt-1"
                        />
                        <label htmlFor="agreedToDisclaimer" className="ml-3 block text-sm text-secondary">
                            I have read and agree with the disclaimer.
                        </label>
                    </div>
                </FormSection>
               
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading || !formData.agreedToDisclaimer}
                        className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EOIPage;