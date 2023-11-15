export type Location = {
  type: string
  display_name: string
  address: {
    city?: string
    town?: string
    country: string
    state: string
    suburb?: string
    neighbourhood?: string
    road?: string
  }
}

type Coordinates = {
  latitude: number
  longitude: number
}

export class CoordinateService {
  async getLocationFromCoordinates(coordinates: Coordinates) {
    const url = new URL('https://nominatim.openstreetmap.org/reverse')

    url.searchParams.append('format', 'json')
    url.searchParams.append('lat', String(coordinates.latitude))
    url.searchParams.append('lon', String(coordinates.longitude))

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Unable to fetch location')
    }

    return (await response.json()) as Location
  }
}

export const coordinate = new CoordinateService()
