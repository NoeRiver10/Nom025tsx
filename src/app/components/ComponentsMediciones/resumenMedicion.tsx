"use client";

import React, { useState } from 'react';
import { useAreas } from '../../context/areascontext';

const ResumenMedicion: React.FC = () => {
  const { areas } = useAreas();
  const [expandedIndex, setExpandedIndex] = useState<{ areaIndex: number; puestoIndex: number; puntoIndex: number } | null>(null);

  const toggleExpand = (areaIndex: number, puestoIndex: number, puntoIndex: number) => {
    if (
      expandedIndex &&
      expandedIndex.areaIndex === areaIndex &&
      expandedIndex.puestoIndex === puestoIndex &&
      expandedIndex.puntoIndex === puntoIndex
    ) {
      setExpandedIndex(null); // Colapsa si ya está expandido
    } else {
      setExpandedIndex({ areaIndex, puestoIndex, puntoIndex });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
        Resumen de Mediciones
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, areaIndex) => (
          area.puestosData.map((puesto, puestoIndex) =>
            puesto.puntos?.map((punto, puntoIndex) => (
              <div key={`${area.idArea}-${puestoIndex}-${puntoIndex}`} className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500">
                <button
                  onClick={() => toggleExpand(areaIndex, puestoIndex, puntoIndex)}
                  className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-2xl font-bold text-gray-700">
                    Punto {puntoIndex + 1} - Área {area.nombreArea}
                  </span>
                  <span className="text-xl text-blue-600">{expandedIndex?.areaIndex === areaIndex && expandedIndex.puestoIndex === puestoIndex && expandedIndex.puntoIndex === puntoIndex ? '-' : '+'}</span>
                </button>
                {expandedIndex?.areaIndex === areaIndex && expandedIndex.puestoIndex === puestoIndex && expandedIndex.puntoIndex === puntoIndex && (
                  <div className="p-6 bg-white">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles del Punto:</h3>
                      <p><strong>Área:</strong> {area.nombreArea}</p>
                      <p><strong>Departamento:</strong> {punto.departamento}</p>
                      <p><strong>Puesto:</strong> {puesto.nombrePuesto}</p>
                      <p><strong>Identificación:</strong> {punto.identificacion}</p>
                    </div>

                    {/* Contenedor con scroll horizontal para la tabla de mediciones */}
                    <div className="mb-4 overflow-x-auto">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Mediciones:</h3>
                      {punto.mediciones && punto.mediciones.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border p-2">Hora</th>
                              <th className="border p-2">P. DE TRABAJO E1</th>
                              <th className="border p-2">P. DE TRABAJO E2</th>
                              <th className="border p-2">PAREDES E1</th>
                              <th className="border p-2">PAREDES E2</th>
                            </tr>
                          </thead>
                          <tbody>
                            {punto.mediciones.map((medicion, medicionIndex) => (
                              <tr key={medicionIndex}>
                                <td className="border p-2">{medicion.hora}</td>
                                <td className="border p-2">{medicion.trabajoE1}</td>
                                <td className="border p-2">{medicion.trabajoE2}</td>
                                <td className="border p-2">{medicion.paredesE1}</td>
                                <td className="border p-2">{medicion.paredesE2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No hay mediciones registradas para este punto.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )
        ))}
      </div>
    </div>
  );
};

export default ResumenMedicion;
