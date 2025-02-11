"use client";

import BarChart from "./components/BarChart";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

async function fetchData(): Promise<ChartData> {
  const res = await fetch("http://10.7.0.124:3000/funcoes");
  const data = await res.json();

  return {
    labels: data.data.map((item: { tipo_funcao: string }) => item.tipo_funcao),
    datasets: [
      {
        label: "Quantidade de Funções",
        data: data.data.map((item: { quantidade: number }) => item.quantidade),
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        borderWidth: 1,
      },
    ],
  };
}

export default async function Home() {
  const chartData = await fetchData();

  return (
    <div>
      <h1>Gráfico de Funções</h1>
      <BarChart data={chartData} />
    </div>
  );
}
