import { CreateStudent } from "../types/createStudent";

const API_URL = 'http://localhost:8000/v1/students';

export const getStudents = async () => {
    const response = await fetch(API_URL, {method: 'GET'});
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
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to create student');
    }
    const json = await response.json();
    return json;
}