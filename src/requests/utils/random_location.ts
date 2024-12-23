function getRandomInRange(from: number, to: number, fixed: number): number {
    return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  }
  
  export function generateRandomLocation(latitude: number, longitude: number, radiusInKm: number): { latitude: number, longitude: number } {
    const radiusInDegrees = radiusInKm / 111; // 1 degree is approximately 111 km
  
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
  
    // Adjust the x-coordinate for the shrinking of the east-west distances
    const new_x = x / Math.cos(latitude * (Math.PI / 180));
  
    const newLatitude = latitude + y;
    const newLongitude = longitude + new_x;
  
    return { latitude: newLatitude, longitude: newLongitude };
  }