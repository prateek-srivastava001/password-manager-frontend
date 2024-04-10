const BASE_URL = 'https://password-manager-backend-mbw3.onrender.com';

export const login = async (req) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return true;
  } catch (error) {
    console.error('Some error occurred:', error.message);
    throw error;
  }
};

export const signup = async (req) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Some error occured:', error.message);
      throw error;
    }
};        

const getToken = () => {
  return localStorage.getItem('token');
};

export const fetchPasswords = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/all/credentials`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch passwords');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching passwords:', error.message);
    throw error;
  }
};

export const addPassword = async (newPassword) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/credential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newPassword),
    });
    if (!response.ok) {
      throw new Error('Failed to add password');
    }
    return true;
  } catch (error) {
    console.error('Error adding password:', error.message);
    throw error;
  }
};

export const deletePassword = async (id) => {
    try {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/api/credential/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
      if (!response.ok) {
            throw new Error('Failed to delete password');
        }
        return true;
    } catch (error) {
        console.error('Error deleting password:', error.message);
        throw error;
    }
};

export const editPassword = async (id, updatedPassword) => {
    try{
        const token = getToken();
        const response = await fetch(`${BASE_URL}/api/credential/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
            },
            body: JSON.stringify(updatedPassword),
        });
      if (!response.ok) {
            throw new Error('Failed to add password');
        }
        return true;
    } catch (error) {
        console.error('Error adding password:', error.message);
        throw error;
    }
};
        