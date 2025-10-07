import React from 'react';
import { HeartIcon, LightbulbIcon, UsersIcon } from '../components/Icons';

const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-12 md:space-y-16">
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-secondary">About iMigrateEMC</h1>
                        <p className="text-lg text-muted mt-4 leading-relaxed">
                            We are more than just a consultancy; we are architects of new beginnings. Our firm was built on the belief that everyone deserves a chance to pursue their dreams, no matter where they lead.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" alt="Professional and friendly team" className="rounded-lg object-cover" />
                    </div>
                </div>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-secondary">Our Story</h2>
                    <p className="text-muted mt-4 leading-relaxed">
                        iMigrateEMC was founded by former immigrants who experienced the challenges of the visa process firsthand. Frustrated by the lack of clear, honest, and personalized guidance, we set out to create the service we wished we had. We've turned our personal journeys into professional expertise, dedicating ourselves to demystifying immigration and empowering our clients with the knowledge and support they need to succeed.
                    </p>
                 </div>
            </div>

           

            <div className="text-center">
                <h2 className="text-3xl font-bold text-secondary">Our Core Values</h2>
                <p className="text-muted mt-2 max-w-2xl mx-auto">These principles are the bedrock of our practice and guide every client interaction.</p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-background p-6 rounded-lg border border-border">
                        <UsersIcon className="mx-auto" />
                        <h3 className="font-semibold text-secondary mt-3 text-lg">Integrity First</h3>
                        <p className="text-sm text-muted mt-2">We operate with unwavering transparency and ethical standards. Your trust is our most valued asset, and we earn it through honesty.</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg border border-border">
                        <LightbulbIcon className="mx-auto" />
                        <h3 className="font-semibold text-secondary mt-3 text-lg">Unmatched Expertise</h3>
                        <p className="text-sm text-muted mt-2">Our team relentlessly pursues knowledge, staying ahead of changing laws to provide you with the most accurate and effective advice.</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg border border-border">
                        <HeartIcon className="mx-auto" />
                        <h3 className="font-semibold text-secondary mt-3 text-lg">Client-Centric Heart</h3>
                        <p className="text-sm text-muted mt-2">You are at the center of our universe. We listen to your story, understand your goals, and build strategies that are as unique as you are.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;