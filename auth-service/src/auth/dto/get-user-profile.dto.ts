export class GetUserProfileDto {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    bio?: string | null;
    gender?: string | null;
    avatar_url?: string | null;
    is_verified: boolean;
    created_at: Date;
    updated_at: Date;
}

