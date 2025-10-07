import React from 'react';

const VisaCard: React.FC<{ title: string; description: string; requirements: string[] }> = ({ title, description, requirements }) => (
    <div className="bg-background p-6 rounded-xl border border-border mb-4 transition-shadow hover:shadow-md">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-muted mt-2">{description}</p>
        <div className="mt-4">
            <h4 className="font-semibold text-secondary">Key Requirements:</h4>
            <ul className="list-disc list-inside text-sm text-muted mt-2 space-y-1">
                {requirements.map((req, index) => <li key={index}>{req}</li>)}
            </ul>
        </div>
    </div>
);

const VisaPage: React.FC = () => {
    const visaTypes = [
        {
            title: 'Student Visa',
            description: 'For individuals who wish to pursue academic studies in a foreign country. This visa allows you to live and study for the duration of your course.',
            requirements: ['Offer letter from a designated learning institution', 'Proof of financial support', 'Language proficiency test scores (e.g., IELTS, TOEFL)'],
        },
        {
            title: 'Skilled Worker Visa',
            description: 'Aimed at professionals with specific skills and work experience needed in the host country. This is often a direct path to permanent residency.',
            requirements: ['Valid job offer from an approved employer', 'Proof of relevant work experience and qualifications', 'Language proficiency'],
        },
        {
            title: 'Family Sponsorship & Spousal Visa',
            description: 'Allows citizens or permanent residents to sponsor their spouse, partner, children, or other eligible relatives to immigrate.',
            requirements: ['Proof of relationship (marriage certificate, etc.)', 'Sponsor must meet minimum income requirements', 'Medical and character checks'],
        },
        {
            title: 'Permanent Residency (PR)',
            description: 'Grants the right to live, work, and study anywhere in the country indefinitely. It is the final step before applying for citizenship.',
            requirements: ['Points-based system eligibility (age, education, experience)', 'Successful skills assessment', 'Medical and character clearances'],
        },
    ];

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-secondary">Visa Categories</h1>
            <p className="text-muted mt-2">
                We specialize in a wide range of visa types to suit your immigration goals. Explore our main categories below.
            </p>
            <div className="mt-8">
                {visaTypes.map(visa => <VisaCard key={visa.title} {...visa} />)}
            </div>
        </div>
    );
};

export default VisaPage;