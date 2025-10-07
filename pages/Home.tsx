import React from "react";
import {
  StarIcon
} from "../components/Icons";

interface HomePageProps {
  onBookAppointment: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookAppointment }) => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="https://r2-pub.rork.com/attachments/kyii67650u383nz2xi3rq"
          alt="Hero background"
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4">Bridging Trust</h1>
          <p className="text-lg text-white mb-2">From Dreams to Reality</p>
          <p className="text-base text-gray-200 mb-6">
            Your Visa Journey Begins Here
          </p>
          <button
            onClick={onBookAppointment}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90"
          >
            Contact us
          </button>
        </div>
      </div>

      {/* About Section */}
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-4xl font-bold text-secondary">12</p>
          <p className="text-muted">Countries</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-secondary">15</p>
          <p className="text-muted">Partners</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-secondary">8</p>
          <p className="text-muted">Head Offices</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-secondary">107</p>
          <p className="text-muted">Trusted Clients</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-secondary mb-6">
          What Our Clients Say
        </h2>
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-700">
          4.9 out of 5 – Based on 247+ reviews
        </p>
        <div className="flex gap-6 overflow-x-auto mt-8 pb-4">
          {[
            {
              name: "Ahmed Hassan",
              location: "Dubai, UAE",
              text: "Exceptional service! The team guided me through my Australian student visa process seamlessly.",
              date: "2 weeks ago",
              initial: "A",
            },
            {
              name: "Sarah Khan",
              location: "Karachi, Pakistan",
              text: "Professional, reliable, and incredibly knowledgeable. They helped me secure my Canadian work visa.",
              date: "1 month ago",
              initial: "S",
            },
            {
              name: "Raj Patel",
              location: "Mumbai, India",
              text: "Outstanding support from start to finish. The team’s dedication and expertise helped me achieve my dream.",
              date: "3 weeks ago",
              initial: "R",
            },
            {
              name: "Fatima Ali",
              location: "Dhaka, Bangladesh",
              text: "Truly impressed with their professionalism. They made my UK visa application process stress-free and successful.",
              date: "2 months ago",
              initial: "F",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-white border border-border rounded-xl shadow-sm p-6 w-80 flex-shrink-0 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {review.initial}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted">{review.location}</p>
                </div>
              </div>
              <p className="italic text-muted mb-3">&quot;{review.text}&quot;</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-secondary text-center">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Dr. Aftab Ahmed, Industrial Mentor",
              image:
                "https://r2-pub.rork.com/attachments/qt1emyxobca1qmbox5n1p",
              description:
                "An Industrial Mentor with 17 years of experience in IT and academia. Provides expert guidance to students on international education and career pathways.",
            },
            {
              name: "Dr. Asif Noor, Academic Mentor",
              image:
                "https://r2-pub.rork.com/attachments/j2xi691k76ptdd6uv096d",
              description:
                "Senior Scientist and Scholar at the University of Melbourne. Passionate about mentoring students from developing countries.",
            },
            {
              name: "Ghulam Mohaiudin, CTO",
              image:
                "https://r2-pub.rork.com/attachments/0k7cgdhgqjeaeuxvji952",
              description:
                "CTO of iMigrateEMC, driving digital transformation to enhance innovative visa consultancy services.",
            },
            {
              name: "Dr. Babar Peters (MARA)",
              image:
                "https://r2-pub.rork.com/attachments/4z9br6frnuzy12ah1q2n4",
              description:
                "Registered Migration Agent with deep expertise in Australian immigration matters.",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-background border border-border rounded-xl shadow-md p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full border-4 border-primary object-cover mb-4"
              />
              <h3 className="font-semibold text-lg text-secondary">
                {member.name}
              </h3>
              <p className="text-sm text-muted mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-background border border-border rounded-xl shadow p-8 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Ready to Start Your Immigration Journey?
        </h2>
        <p className="text-lg text-muted mb-6 max-w-2xl mx-auto">
          Let's turn your aspirations into reality. Schedule your consultation
          today and take the first step towards your new life.
        </p>
        <button
          onClick={onBookAppointment}
          className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
