"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, Briefcase, UserCheck } from "lucide-react";

interface FuncaoData {
  tipo_funcao: string;
  quantidade: number;
}

const formatFuncaoName = (name: string) => {
  const formatMap: { [key: string]: string } = {
    COMISSIONADO: "Comissionado",
    EFETIVO: "Efetivo",
    ESTAGIARIO: "Estagiário",
    REEDUCANDO: "Reeducando",
    TEMPORARIOS: "Temporários",
    VOLUNTARIO: "Voluntário",
  };
  return formatMap[name] || name;
};

export default function FuncoesChart() {
  const [data, setData] = useState<FuncaoData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.7.0.124:3000/funcoes");
        const formattedData = response.data.data.map((item: FuncaoData) => ({
          ...item,
          tipo_funcao: formatFuncaoName(item.tipo_funcao),
        }));
        setData(formattedData);
        setTotal(response.data.total);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Error: {error}
      </div>
    );

  const maiorCategoria = data.reduce((prev, current) =>
    prev.quantidade > current.quantidade ? prev : current
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-teal-600 font-semibold">
            {payload[0].value} funcionários
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Funcionários</p>
              <h3 className="text-2xl font-bold text-gray-900">{total}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <Briefcase className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Maior Categoria</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {maiorCategoria.tipo_funcao}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <UserCheck className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Quantidade</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {maiorCategoria.quantidade}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Distribuição de Funções
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="tipo_funcao"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fill: "#4b5563" }}
            />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="quantidade" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
