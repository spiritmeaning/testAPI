function getFirebaseUsers() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'http://127.0.0.1:3100'; // Replace with your API URL

        async function getToken(username, email) {
            try {
                const response = await fetch(`${apiUrl}/login`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Failed to retrieve token');
                }

                const data = await response.json();
                return data.token;
            } catch (error) {
                reject(error);
            }
        }

        async function makeAuthenticatedRequest(
            endpoint,
            method = 'GET',
            body = {},
            token
        ) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            };

            const options = {
                method,
                headers
            };

            if (method !== 'GET') {
                options.body = JSON.stringify(body);
            }

            try {
                const response = await fetch(`${apiUrl}/${endpoint}`, options);
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                reject(error);
            }
        }

        getToken()
            .then(token => {
                console.log('Token retrieved:', token);
                makeAuthenticatedRequest('profile', 'GET', null, token)
                    .then(data => {
                        resolve(data); // Resolve with the data
                    })
                    .catch(error => {
                        reject(error); // Reject with the error
                    });
            })
            .catch(error => {
                reject(error); // Reject with the error
            });
    });
}
