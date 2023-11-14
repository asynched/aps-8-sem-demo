'use client'
import { useFormState } from 'react-dom'
import { createReport } from '@/actions/create-report'
import { useEffect } from 'react'
import { useForm } from '@/hooks/useForm'

function getCurrentPosition() {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position.coords)
    }, reject)
  })
}

export function CreateReportForm() {
  // @ts-ignore
  const [state, action] = useFormState(createReport, {})
  const [, register, setForm] = useForm({
    latitude: '',
    longitude: '',
    severity: 'low',
  })

  useEffect(() => {
    getCurrentPosition().then((position) => {
      setForm((form) => ({
        ...form,
        latitude: String(position.latitude),
        longitude: String(position.longitude),
      }))
    })
  }, [setForm])

  return (
    <form className="grid gap-4 w-full" action={action}>
      <div className="flex flex-col gap-1">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          className="py-2 px-4 border rounded outline-none"
          {...register('latitude')}
        />
        {state.errors?.latitude && (
          <span className="text-sm text-red-600">
            {state.errors.latitude.join(', ')}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          className="py-2 px-4 border rounded outline-none"
          {...register('longitude')}
        />
        {state.errors?.longitude && (
          <span className="text-sm text-red-600">
            {state.errors.longitude.join(', ')}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="severity">Transito:</label>
        <select
          id="severity"
          name="severity"
          className="py-2 px-4 bg-transparent border rounded appearance-none outline-none"
          {...register('severity')}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        {state.errors?.severity && (
          <span className="text-sm text-red-600">
            {state.errors.severity.join(', ')}
          </span>
        )}
      </div>
      <button className="py-2 px-4 text-white bg-blue-600 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed">
        Salvar
      </button>
    </form>
  )
}
