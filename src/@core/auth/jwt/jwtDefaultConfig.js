export default {
  // Endpoints
  loginEndpoint: process.env.VUE_APP_API_ZERG_BACK + '/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: process.env.VUE_APP_API_ZERG_BACK + '/refresh-token',
  logoutEndpoint: process.env.VUE_APP_API_ZERG_BACK + '/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
