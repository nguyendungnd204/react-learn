const API_URL = 'http://localhost:8000/v1/students';

export const getStudents = async () => {
    const response = await fetch(API_URL, {method: 'GET'});
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    const json = await response.json();
    return json;
}