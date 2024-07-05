import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

// Fetch users
export const Tableapi = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (err) {
        console.log("Error fetching users:", err);
    }
};

// Delete user by ID
export const DeleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (err) {
        console.log("Error deleting user:", err);
        throw err;  // Rethrow the error to handle it in the calling function
    }
};
