import { CreateReportForm } from '@/app/criar/CreateReportForm'

export default function Criar() {
  return (
    <div className="p-8 max-w-screen-sm mx-auto">
      <h1 className="text-4xl font-bold tracking-tighter">Criar report</h1>
      <p className="mb-4">Preencha o formulário para criar um report</p>
      <CreateReportForm />
    </div>
  )
}
