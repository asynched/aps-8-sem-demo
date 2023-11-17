import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { db } from '@/db/client'
import { reports } from '@/db/schemas/report'
import { desc } from 'drizzle-orm'
import { formatCoordinates, getMapImageFromPosition } from '@/utils/geo'

export default async function Home() {
  const entries = await db
    .select()
    .from(reports)
    .orderBy(desc(reports.createdAt))

  return (
    <div className="p-8 max-w-screen-sm mx-auto">
      <h1 className="text-4xl font-bold tracking-tighter">
        Report
        <span className="text-blue-600">It</span>
      </h1>
      <p className="mb-2">Compartilhe pontos de trânsito na sua cidade</p>
      <Link
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded grid place-items-center"
        href="/criar"
      >
        <PlusIcon className="w-6 h-6" />
      </Link>
      <ul className="grid gap-4">
        {entries.map((entry) => (
          <li key={entry.reportId} className="border rounded overflow-hidden">
            <img
              src={getMapImageFromPosition(entry.latitude, entry.longitude, 14)}
              alt="Location"
              className="w-full object-cover h-32"
            />
            <div className="p-4">
              <h2 className="mb-2 text-2xl font-bold tracking-tighter">
                {entry.city}
              </h2>
              <p>Bairro: {entry.suburb}</p>
              <p>
                {entry.state} - {entry.country}
              </p>
              <p>
                Transito:{' '}
                {entry.severity === 'low'
                  ? 'Baixo'
                  : entry.severity === 'medium'
                  ? 'Médio'
                  : 'Alto'}
              </p>
              <p>
                Coordenadas:{' '}
                {formatCoordinates(entry.latitude, entry.longitude)}
              </p>
              <p>Criado em: {entry.createdAt.toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
