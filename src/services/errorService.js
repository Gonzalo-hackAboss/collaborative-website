"use strict";

module.exports = {
    // Error de credenciales inválidas
    invalidCredentials: () => {
        const error = new Error("You must enter a valid email and password");
        error.status = 400; 
        error.code = "INVALID_CREDENTIALS"; 
        throw error;
    },

    // Error de correo electrónico no validado
    emailNotValidated: () => {
        const error = new Error("Email has not been validated");
        error.status = 400; 
        error.code = "EMAIL_NOT_VALIDATED"; 
        throw error;
    },

    // Error de correo electrónico ya registrado
    emailAlreadyRegistered: () => {
        const error = new Error("Email already registered");
        error.status = 400; 
        error.code = "EMAIL_ALREADY_REGISTERED"; 
        throw error;
    },

    // Error de no aceptar los términos y condiciones
    didNotAcceptTOS: () => {
        const error = new Error(
            "The user must accept the terms and conditions to register"
        );
        error.status = 403; 
        error.code = "DID_NOT_ACCEPT_TOS"; 
        throw error;
    },

    // Error de no autenticado
    notAuthenticated: () => {
        const error = new Error("You must send a token");
        error.status = 401; 
        error.code = "NOT_AUTHENTICATED"; 
        throw error;
    },

    // Error de usuario no autorizado
    unauthorizedUser: () => {
        const error = new Error("The user is not authorized");
        error.status = 403; 
        error.code = "UNAUTHORIZED"; 
        throw error;
    },

    // Error de recurso no encontrado
    notFound: () => {
        const error = new Error("The requested resource does not exist");
        error.status = 404; 
        error.code = "RESOURCE_NOT_FOUND"; 
        throw error;
    },

    // Error de solicitud fallida
    requestFailed: () => {
        const error = new Error("The request provide cannot be finished");
        error.status = 500; 
        error.code = "INVALID_METHOD"; 
        throw error;
    },
};
