// src/bot/faqBot.ts
export type Sender = "user" | "robot";
export type ChatMessage = { id: string; message: string; sender: Sender };

export const ROOT_QUESTIONS: string[] = [
  "Booking consultation",
  "Where is home",
  "What visa should I apply for",
  "How long does processing take",
  "Fees and costs",
  "What documents do I need",
  "Can you help with refusals",
];

// Follow-up chips per root question (edit text here to your liking)
export const FOLLOW_UPS: Record<string, string[]> = {
  "Booking consultation": [
    "Book by phone",
    "Book by email",
    "What to bring",
    "Consult length & cost",
  ],
  "Where is home": [
    "Office location",
    "Parking info",
    "Closest station",
  ],
  "What visa should I apply for": [
    "Study goal",
    "Work goal",
    "PR goal",
    "Family/partner goal",
  ],
  "How long does processing take": [
    "Student visa time",
    "Visitor visa time",
    "Skilled visa time",
    "Partner visa time",
  ],
  "Fees and costs": [
    "Dept fee",
    "Health checks",
    "Police checks",
    "Our professional fee",
  ],
  "What documents do I need": [
    "Student checklist",
    "Skilled checklist",
    "Partner checklist",
  ],
  "Can you help with refusals": [
    "Upload refusal letter",
    "AAT vs re-apply",
    "Eligibility review",
  ],
};

// Main canned replies
const RESPONSES: Record<string, string> = {
  "Booking consultation":
    "You can book a consultation by calling (0061) 490 549 001 or emailing info@imigrateemc.com.au. Typical consults ~30 minutes. Bring passport, current visa details, and any refusals.",
  "Where is home":
    "Our main office is in Melbourne, Australia. Tell me your suburb for the best route or parking tips.",
  "What visa should I apply for":
    "It depends on your goal (study, work, PR, family). Common options: Student (500), TSS (482), Graduate (485), Partner (820/801). Share your current visa status and goal to narrow it down.",
  "How long does processing take":
    "Varies by stream and caseload. Visitors/students: weeks; skilled/partner: months. Tell me your visa type for a tighter estimate.",
  "Fees and costs":
    "Expect Dept fee, possible health checks, police checks, translations, and our professional fee. Share your visa type for an estimate.",
  "What documents do I need":
    "Common: passport, ID, English test, health checks, police clearances. Specific lists depend on visa type.",
  "Can you help with refusals":
    "Yes. We review refusal letters, advise on merits, and support AAT appeals or re-applications.",
  // Follow-up examples
  "Book by phone": "Call us on (0061) 490 549 001 to book a consultation.",
  "Book by email": "Email info@imigrateemc.com.au with your name, visa type, and preferred time.",
  "What to bring": "Bring your passport, current visa details, COE (if student), and any refusal letters.",
  "Consult length & cost": "Consults are ~30 minutes. Fees vary—ask when booking.",
  "Office location": "We’re in Melbourne, Australia. Share your suburb for directions.",
  "Parking info": "Street and nearby paid parking are available. Arrive 10 minutes early.",
  "Closest station": "Tell me your line, and I’ll suggest the nearest stop.",
  "Study goal": "Student visa (500) is typical. Do you have a COE yet?",
  "Work goal": "Look at TSS (482) or Skilled pathways. Do you have a sponsor or skills assessment?",
  "PR goal": "Consider skilled migration or partner pathways. What’s your current occupation and points?",
  "Family/partner goal": "Partner (820/801) is common. How long have you lived together?",
  "Student visa time": "Often weeks, but varies. Month/time of year affects queue.",
  "Visitor visa time": "Often weeks. Travel history and purpose can affect time.",
  "Skilled visa time": "Often months. Skills assessment and points matter.",
  "Partner visa time": "Often months. Strong relationship evidence helps.",
  "Dept fee": "Each visa has a set Dept of Home Affairs fee; amount varies by stream.",
  "Health checks": "Medical exams may be required depending on visa and your history.",
  "Police checks": "AFP or overseas checks are common; timing varies by country.",
  "Our professional fee": "We quote per case once we understand your situation.",
  "Student checklist": "Passport, COE, GTE statement, funds evidence, English test, health, police checks.",
  "Skilled checklist": "Skills assessment, English test, work references, degree transcripts, ID docs.",
  "Partner checklist": "Relationship evidence (photos, bills, lease), statements, ID docs, health/police.",
  "Upload refusal letter": "You can upload the letter and we’ll assess your next steps.",
  "AAT vs re-apply": "Depends on refusal reasons and timelines. We can advise after review.",
  "Eligibility review": "Book a quick review so we can check merits and deadlines.",
};

const FALLBACK =
  "I don’t have a saved answer for that yet. Try the buttons below, or tell me your visa type and goal (study, work, PR).";

export const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export function getCannedReply(text: string): string {
  return RESPONSES[text] ?? FALLBACK;
}

export function getFollowUps(rootKey: string): string[] {
  return FOLLOW_UPS[rootKey] ?? [];
}

export async function getReplyWithDelay(text: string, ms = 350): Promise<string> {
  await new Promise((r) => setTimeout(r, ms));
  return getCannedReply(text);
}
