import { CreateStudent } from "../types/createStudent";

const API_URL = 'http://localhost:8000/v1/students';

export const getStudents = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    const json = await response.json();
    return json;
}

export const createStudent = async (data: CreateStudent) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to create student');
    }
    const json = await response.json();
    return json;
}

export const updateStudent = async (id: string | number, data: CreateStudent) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to update student');
    }
    const json = await response.json();
    return json;
}

export const deleteStudent = async (id: string | number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to delete student');
    }

    if (response.status === 204) return {};

    return response.json().catch(() => ({}));
}

export const searchStudent = async (value: string) => {
    const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ 
            student_code: value,
            first_name: value,
            last_name: value })
    })
    if (!response.ok) {
        throw new Error('Failed to search students');
    }
    const json = await response.json();
    return json;
}
