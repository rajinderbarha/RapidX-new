const GOOGLE_API_kEY = 'AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q'    


export default async function getAddress(lat: any , lng : any){
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_kEY}`
 
 try{
    const response = await fetch(URL);
  if(!response.ok){
    throw new Error(`Failed to fetch address: ${response.statusText}`)
    
  }

  const data =  await response.json()

  if (data.status !== 'OK') {
    throw new Error(`Geocode error: ${data.status}`);
  }

  const address = data.results[0].formatted_address
  console.log(address)
  if (!address) {
    throw new Error('Address not found');
  }

  return address;
} catch(error){
    console.error(error);
    throw error; 
}
};


export async function getCoords(placeId : string){
const URL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_kEY}`
try{
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  if(results.length > 0){
    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
  }else {
    throw new Error('No results found');
  }

}catch(error){
  console.log(error)
  throw new Error('Failed to fetch coordinates');
}

}




// export async function getRoute(pickedLocation , DropLocation){
//   const response = await fetch()
// };
