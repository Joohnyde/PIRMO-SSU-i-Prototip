/**
 * Here you can add the configuration related to keycloak
 * So we can use this common config for diffrent environment
 */
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
    url: 'http://prototype.pir-mo.com:8080/',
    realm: 'iportal-realm',
    clientId: 'iportal-client',
};

export default keycloakConfig;
