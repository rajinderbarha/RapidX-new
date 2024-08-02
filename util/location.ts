const GOOGLE_API_KEY = "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q";

interface GeocodeResponse {
  results: { formatted_address: string; geometry: { location: { lat: number; lng: number } } }[];
  status: string;
}

export default async function getAddress(lat: number, lng: number): Promise<string> {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch address: ${response.statusText}`);
    }

    const data: GeocodeResponse = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Geocode error: ${data.status}`);
    }

    const address = data.results[0]?.formatted_address;
    if (!address) {
      throw new Error("Address not found");
    }

    console.log(address);
    return address;
  } catch (error : any) {
    console.error(`Error fetching address: ${error.message}`);
    throw error;
  }
}

export async function getCoords(placeId: string): Promise<{ lat: number; lng: number }> {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
    }

    const data: GeocodeResponse = await response.json();

    if (data.results.length === 0) {
      throw new Error("No results found");
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } catch (error : any) {
    console.error(`Error fetching coordinates: ${error.message}`);
    throw new Error("Failed to fetch coordinates");
  }
}
