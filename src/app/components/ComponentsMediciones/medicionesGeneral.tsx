"use client";

import React, { useState, useEffect } from 'react';
import { useAreas } from '../../context/areascontext';

interface MedicionProps {
  tipoMedicion: string;
  numMediciones: number;
  areaId: number;
  puestoIndex: number;
}

const MedicionesGeneral: React.FC<MedicionProps> = ({ tipoMedicion, numMediciones, areaId, puestoIndex }) => {
  const { areas, setAreas } = useAreas();
  const [mediciones, setMediciones] = useState(
    Array.from({ length: numMediciones }, () => ({
      hora: '',
      trabajoE1: '',
      trabajoE2: '',
      paredesE1: 'N/A',
      paredesE2: 'N/A',
    }))
  );

  // Sincroniza el número de mediciones cuando cambia `numMediciones`
  useEffect(() => {
    setMediciones(
      Array.from({ length: numMediciones }, () => ({
        hora: '',
        trabajoE1: '',
        trabajoE2: '',
        paredesE1: 'N/A',
        paredesE2: 'N/A',
      }))
    );
  }, [numMediciones]);

  const handleInputChange = (index: number, field: keyof typeof mediciones[0], value: string) => {
    const newMediciones = [...mediciones];
    newMediciones[index] = { ...newMediciones[index], [field]: value };
    setMediciones(newMediciones);
  };

  const guardarMediciones = () => {
    console.log("Guardando mediciones...");

    const updatedAreas = areas.map((area) => {
      if (area.idArea === areaId) {
        const updatedPuestos = area.puestosData.map((puesto, idx) => {
          if (idx === puestoIndex) {
            const lastPuntoIndex = puesto.puntos.length - 1;
            const updatedPuntos = puesto.puntos.map((punto, index) => {
              if (index === lastPuntoIndex) {
                console.log("Guardando mediciones en el último punto:", mediciones);
                return {
                  ...punto,
                  mediciones: [...punto.mediciones, ...mediciones], // Agrega las nuevas mediciones
                };
              }
              return punto;
            });
            return {
              ...puesto,
              puntos: updatedPuntos,
            };
          }
          return puesto;
        });
        return { ...area, puestosData: updatedPuestos };
      }
      return area;
    });

    setAreas(updatedAreas);
    console.log("Mediciones guardadas en el estado actualizado:", updatedAreas);
    alert('Mediciones guardadas con éxito');
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Medición {tipoMedicion}</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-red-600 text-white">
            {numMediciones > 1 && <th className="border p-3">Medición No.</th>}
            <th className="border p-3">Hora</th>
            <th className="border p-3">P. DE TRABAJO E1</th>
            <th className="border p-3">P. DE TRABAJO E2</th>
            <th className="border p-3">PAREDES E1</th>
            <th className="border p-3">PAREDES E2</th>
          </tr>
        </thead>
        <tbody>
          {mediciones.map((medicion, index) => (
            <tr key={index}>
              {numMediciones > 1 && (
                <td className="border p-3 text-center font-bold text-blue-600">
                  Medición No. {index + 1}
                </td>
              )}
              <td className="border p-3">
                <input
                  type="time"
                  value={medicion.hora}
                  onChange={(e) => handleInputChange(index, 'hora', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </td>
              <td className="border p-3">
                <input
                  type="number"
                  min="0"
                  value={medicion.trabajoE1}
                  onChange={(e) => handleInputChange(index, 'trabajoE1', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </td>
              <td className="border p-3">
                <input
                  type="number"
                  min="0"
                  value={medicion.trabajoE2}
                  onChange={(e) => handleInputChange(index, 'trabajoE2', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </td>
              <td className="border p-3">
                <input
                  type="number"
                  min="0"
                  value={medicion.paredesE1}
                  onChange={(e) => handleInputChange(index, 'paredesE1', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="N/A"
                />
              </td>
              <td className="border p-3">
                <input
                  type="number"
                  min="0"
                  value={medicion.paredesE2}
                  onChange={(e) => handleInputChange(index, 'paredesE2', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="N/A"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={guardarMediciones}
        className="bg-blue-600 text-white p-3 rounded-md mt-4"
      >
        Guardar Mediciones
      </button>
    </div>
  );
};

export default MedicionesGeneral;
