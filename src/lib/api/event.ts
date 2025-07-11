import type { EventInfo } from './types';

export const getEventInfo = async (
  id: string,
  laps: string,
  signal: AbortSignal,
): Promise<EventInfo> => {
  try {
    const response = await fetch(
      `https://server.aseanmotorclub.com/api/route_info/${id}/laps/${laps}`,
      {
        signal: signal,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as EventInfo;

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Fetch aborted');
      return {
        route: { waypoints: [] },
        best_times: [],
      };
    }
    throw error;
  }
};
