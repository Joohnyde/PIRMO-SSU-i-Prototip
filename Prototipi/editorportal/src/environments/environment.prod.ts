import keycloakConfig from "./keycloak.config";

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  apiUrl: 'nemazasad',
  webSocket: 'ws://localhost:8000/socket'
};
