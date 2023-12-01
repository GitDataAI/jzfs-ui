import {apiRequest, extractError} from "../index"
import { PostStatsEventsParams } from "../interface";

export class Statistics {
    async postStatsEvents({statsEvents}:PostStatsEventsParams) {
        const request = {
            "events": statsEvents,
        }
        const response = await apiRequest(`/statistics`, {
            method: 'POST',
            body: JSON.stringify(request),
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }
}