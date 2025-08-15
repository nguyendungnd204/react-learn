const API_URL = 'http://localhost:8000/v1';

export interface LoginResponse {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    data?: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}