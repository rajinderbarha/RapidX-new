const GOOGLE_API_kEY = 'AIzaSyAFtCeCUYm6K1QXujT_m17aRvbC9hRxr2k'    


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
