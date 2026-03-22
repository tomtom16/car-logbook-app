export const APP_CONSTANTS = {
    ROUTES: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        DASHBOARD: '/dashboard',
        VEHICLES: {
            CREATE: '/vehicle/create',
            LIST: '/vehicle'
        },
        LOGBOOK: {
            CREATE: '/logbook/create',
            LIST: '/logbook'
        },
        REFUELING: {
            CREATE: '/logbook/fuel/create',
            LIST: '/logbook/fuel'
        }
    },
    MISC: {
        DATEFORMAT_EXTENDED: 'dd.MM.yyyy HH:mm Z',
        DATEFORMAT_SIMPLE: 'dd.MM.yyyy',
        CURRENT_VEHICLE_ID: 'currentVehicleId',
        TOKEN: 'token',
        REFRESH_TOKEN: 'refreshToken',
        USERNAME: 'username'
    }
}