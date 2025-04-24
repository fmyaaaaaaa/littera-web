/**
 * Calculate the distance between two points on the earth in km
 * @param lat1 The latitude of the first point
 * @param lon1 The longitude of the first point
 * @param lat2 The latitude of the second point
 * @param lon2 The longitude of the second point
 */
export function calculateDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // The radius of the earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number) {
  return (degrees * Math.PI) / 180;
}
