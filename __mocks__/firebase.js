const database = () => {
    const ref = jest.fn(() => {
        return {
            set: jest.fn(() => Promise.resolve()),
            onValue: jest.fn(() => Promise.resolve()),
        };
    });

    return {
        ref,
    };
};

const firebase = {
    messaging: jest.fn(() => {
        return {
            hasPermission: jest.fn(() => Promise.resolve(true)),
            subscribeToTopic: jest.fn(),
            unsubscribeFromTopic: jest.fn(),
            requestPermission: jest.fn(() => Promise.resolve(true)),
            getToken: jest.fn(() => Promise.resolve('myMockToken')),
        };
    }),
    notifications: jest.fn(() => {
        return {
            onNotification: jest.fn(),
            onNotificationDisplayed: jest.fn(),
        };
    }),
    analytics: jest.fn(() => {
        return {
            logEvent: jest.fn(),
        };
    }),
    config: jest.fn(() => {
        return {
            enableDeveloperMode: jest.fn(),
            getValue: jest.fn(() => Promise.resolve({})),
            setDefaults: jest.fn(),
        };
    }),
    // Add the database function to the existing firebase mock object
    database,
};

export default firebase;