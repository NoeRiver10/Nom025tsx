// src/app/components/ComponentsReconocimiento/Luminarias.tsx
"use client";

import { useEffect } from 'react';

interface LuminariasProps {
  data: {
    tipoLuminaria: string;
    potencia: number;
    distribucion: string;
    iluminacionLocalizada: string;
    cantidad: number;
  };
  setData: React.Dispatch<React.SetStateAction<{
    tipoLuminaria: string;
    potencia: number;
    distribucion: string;
    iluminacionLocalizada: string;
    cantidad: number;
  }>>;
}

export default function Luminarias({ data, setData }: LuminariasProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePotenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      potencia: Math.max(0, e.target.valueAsNumber),
    }));
  };

  useEffect(() => {
    if (data.iluminacionLocalizada !== 'SÍ') {
      setData((prevData) => ({
        ...prevData,
        cantidad: 0,
      }));
    }
  }, [data.iluminacionLocalizada, setData]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Luminarias
      </h2>
      <form className="space-y-6">
        {/* Tipo de Luminaria */}
        <div>
          <label htmlFor="tipoLuminaria" className="block text-lg font-semibold text-gray-800 mb-2">
            Tipo de Luminaria:
          </label>
          <input
            type="text"
            id="tipoLuminaria"
            name="tipoLuminaria"
            value={data.tipoLuminaria}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Ingrese el tipo de luminaria"
          />
        </div>

        {/* Potencia (W) */}
        <div>
          <label htmlFor="potencia" className="block text-lg font-semibold text-gray-800 mb-2">
            Potencia (W):
          </label>
          <input
            type="number"
            id="potencia"
            name="potencia"
            value={data.potencia}
            onChange={handlePotenciaChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Ingrese la potencia en Watts"
          />
        </div>

        {/* Distribución */}
        <div>
          <label htmlFor="distribucion" className="block text-lg font-semibold text-gray-800 mb-2">
            Distribución:
          </label>
          <select
            id="distribucion"
            name="distribucion"
            value={data.distribucion}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="LINEAL">LINEAL</option>
            <option value="PUNTUAL">PUNTUAL</option>
          </select>
        </div>

        {/* Iluminación Localizada */}
        <div>
          <label htmlFor="iluminacionLocalizada" className="block text-lg font-semibold text-gray-800 mb-2">
            Iluminación Localizada:
          </label>
          <select
            id="iluminacionLocalizada"
            name="iluminacionLocalizada"
            value={data.iluminacionLocalizada}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="SÍ">SÍ</option>
            <option value="NO">NO</option>
          </select>
        </div>

        {/* Cantidad */}
        {data.iluminacionLocalizada === 'SÍ' && (
          <div>
            <label htmlFor="cantidad" className="block text-lg font-semibold text-gray-800 mb-2">
              Cantidad:
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={data.cantidad}
              onChange={(e) => setData((prevData) => ({ ...prevData, cantidad: Math.max(0, e.target.valueAsNumber) }))}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Ingrese la cantidad"
            />
          </div>
        )}
      </form>
    </div>
  );
}
