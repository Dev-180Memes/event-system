

const decodeToken = (token) => {
  if (!token) return null;
    
  try {
    const parts = token.split(".");
      if (parts.length !== 3) {
      throw new Error("token is invalid");
    }

    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/_/g, '/').replace(/-/g, '+'));

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export default decodeToken;