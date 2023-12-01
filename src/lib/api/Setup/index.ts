import {apiRequest, extractError} from "../index"

export class Setup {
    async getState() {
        const response = await apiRequest('/setup_lakefs', {
            method: 'GET',
        });
        switch (response.status) {
            case 200:
                return response.json();
            default:
                throw new Error(`Could not get setup state: ${await extractError(response)}`);
        }
    }

    async lakeFS(username:string) {
        const response = await apiRequest('/setup_lakefs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username}),
        });
        switch (response.status) {
            case 200:
                return response.json();
            case 409:
                throw new Error('Setup is already complete.');
            default:
                throw new Error('Unknown');
        }
    }

    async commPrefs(email:string, updates:any, security:boolean) {
        const response = await apiRequest('/setup_comm_prefs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                featureUpdates: updates,
                securityUpdates: security,
            }),
        });

        switch (response.status) {
            case 200:
                return;
            case 409:
                throw new Error('Setup is already complete.');
            default:
                throw new Error('Unknown');
        }
    }
}