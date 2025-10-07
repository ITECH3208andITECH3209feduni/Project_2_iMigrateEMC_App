export interface ConsultationType {
    id: number;
    title: string;
    duration: string;
    price: string;
    description: string;
}

export interface ConsultantInfo {
    name: string;
    specialization: string;
    avatar: string;
    rating: number;
    reviews: number;
}

export interface Booking {
    id: number;
    created_at: string;
    booking_date: string;
    time_slot: string;
    purpose: string;
    total_cost: number;
    status: string;
    consultation_type: {
        title: string;
    };
}

export interface Profile {
    id: string;
    full_name: string | null;
    phone: string | null;
}

export interface ChatMessage {
    id: number;
    created_at: string;
    user_id: string;
    content: string;
    sender_is_admin: boolean;
}