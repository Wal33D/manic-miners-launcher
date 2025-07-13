import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const INITIAL_REQUEST_DELAY = 750; // First attempt delay in milliseconds
const MAX_RETRIES = 5;

/*
   Delay calculation:
   Attempt 1: 750ms * 1.5^1 = 1125ms
   Attempt 2: 750ms * 1.5^2 = 1687.5ms
   Attempt 3: 750ms * 1.5^3 = 2531.25ms
   Attempt 4: 750ms * 1.5^4 = 3796.875ms
   Attempt 5: 750ms * 1.5^5 = 5695.3125ms
*/

export const fetchWithRetries = async (url: string, retries: number = MAX_RETRIES) => {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await axios.get(url);
			return response;
		} catch (error: any) {
			if (attempt === retries) {
				throw error;
			}
			console.warn(`Attempt ${attempt} failed: ${error.message}. Don't worry, we're trying again soon!`);
			const delay = INITIAL_REQUEST_DELAY * Math.pow(1.5, attempt);
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}
};
