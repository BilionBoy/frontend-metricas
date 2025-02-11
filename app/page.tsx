import FuncoesChart from "./components/FuncoesChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/20">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Funções Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Visualização da distribuição de funções na organização
          </p>
        </div>
        <FuncoesChart />
      </div>
    </main>
  );
}
