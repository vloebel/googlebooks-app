//take directly from module 21 without modification

import decode from 'jwt-decode';

// AuthService.getProfile 
// decodes user data from the token
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // Checks if there is a saved token that is still valid
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
