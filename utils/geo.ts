export function getMapImageFromPosition(
  latitude: number,
  longitude: number,
  zoom: number,
) {
  let xTile = Math.floor(((longitude + 180) / 360) * (1 << zoom))
  let yTile = Math.floor(
    ((1 -
      Math.log(
        Math.tan((latitude * Math.PI) / 180) +
          1 / Math.cos((latitude * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      (1 << zoom),
  )
  return `https://tile.openstreetmap.org/${zoom}/${xTile}/${yTile}.png`
}

export function formatCoordinates(latitude: number, longitude: number) {
  // Degrees minutes and seconds
  const latDeg = Math.floor(latitude)
  const latMin = Math.floor((latitude - latDeg) * 60)
  const latSec = Math.floor(((latitude - latDeg) * 60 - latMin) * 60)
  const longDeg = Math.floor(longitude)
  const longMin = Math.floor((longitude - longDeg) * 60)
  const longSec = Math.floor(((longitude - longDeg) * 60 - longMin) * 60)

  return `${latDeg}°${latMin}'${latSec}" ${longDeg}°${longMin}'${longSec}"`
}
