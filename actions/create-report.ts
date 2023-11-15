'use server'

import { headers } from 'next/headers'
import { coordinate } from '@/services/coordinate'
import { db } from '@/db/client'
import { reports } from '@/db/schemas/report'
import { object, number, union, literal } from 'zod'
import { redirect } from 'next/navigation'

const createReportSchema = object({
  latitude: number()
    .min(-90, {
      message: 'Latitude precisa ser maior ou igual a -90',
    })
    .max(90, {
      message: 'Latitude precisa ser menor ou igual a 90',
    }),
  longitude: number()
    .min(-180, {
      message: 'Longitude precisa ser maior ou igual a -180',
    })
    .max(180, {
      message: 'Longitude precisa ser menor ou igual a 180',
    }),
  severity: union([literal('low'), literal('medium'), literal('high')]),
})

export async function createReport(_: any, form: FormData) {
  try {
    const data = {
      latitude: Number(form.get('latitude')),
      longitude: Number(form.get('longitude')),
      severity: form.get('severity'),
    }

    const result = createReportSchema.safeParse(data)

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      }
    }

    const { latitude, longitude, severity } = result.data
    const ip = headers().get('x-forwarded-for') || 'unknown'

    const { address } = await coordinate.getLocationFromCoordinates({
      latitude,
      longitude,
    })

    console.log(address)

    await db.insert(reports).values({
      latitude,
      longitude,
      severity,
      ip,
      city: address.city || address.town || 'desconhecido',
      country: address.country,
      state: address.state,
      suburb:
        address.suburb ||
        address.neighbourhood ||
        address.road ||
        'desconhecido',
    })
  } catch (err) {
    console.error(err)

    return {
      error: {
        message: 'Não foi possível criar o report',
        code: (err as Error)?.message || 'unknown',
      },
    }
  }

  redirect('/')
}
