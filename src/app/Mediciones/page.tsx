"use client";

import React, { useState } from 'react';
import { useAreas } from '../context/areascontext';
import MedicionesGeneral from '../components/ComponentsMediciones/medicionesGeneral';
import ResumenMedicion from '../components/ComponentsMediciones/resumenMedicion';

const NIVELES_ILUMINACION = [20, 50, 100, 200, 300, 500, 750, 1000, 2000];

export default function MedicionesPage() {
  const { areas, setAreas } = useAreas();
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [puestosTrabajo, setPuestosTrabajo] = useState<string[]>([]);
  const [selectedPuesto, setSelectedPuesto] = useState<string>('');
  const [identificacion, setIdentificacion] = useState<string>('');
  const [departamento, setDepartamento] = useState<string>('');
  const [nivelIluminacion, setNivelIluminacion] = useState<number | ''>('');
  const [tipoIluminacion, setTipoIluminacion] = useState<string>('');
  const [puntoIndex, setPuntoIndex] = useState<number>(0);
  const [showResumen, setShowResumen] = useState<boolean>(false);

  const handleSelectArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const areaId = event.target.value;
    setSelectedArea(areaId);
    const selectedAreaData = areas.find((area) => area.idArea.toString() === areaId);
    setPuestosTrabajo(selectedAreaData ? selectedAreaData.puestosData.map((puesto) => puesto.nombrePuesto) : []);
    setSelectedPuesto('');
    setPuntoIndex(0);
  };

  const handleSelectPuesto = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPuesto(event.target.value);
    setPuntoIndex(0);
  };

  const handleSelectNivelIluminacion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setNivelIluminacion(isNaN(value) ? '' : value);
  };

  const handleSelectTipoIluminacion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoIluminacion(event.target.value);
  };

  const handleGuardar = () => {
    const updatedAreas = areas.map((area) => {
      if (area.idArea.toString() === selectedArea) {
        const updatedPuestos = area.puestosData.map((puesto) => {
          if (puesto.nombrePuesto === selectedPuesto) {
            const puntoIndex = puesto.puntos.findIndex((punto) => punto.identificacion === identificacion);
            if (puntoIndex !== -1) {
              puesto.puntos[puntoIndex] = {
                identificacion,
                departamento,
                nivelIluminacion,
                tipoIluminacion,
                mediciones: [],
              };
            } else {
              puesto.puntos.push({
                identificacion,
                departamento,
                nivelIluminacion,
                tipoIluminacion,
                mediciones: [],
              });
            }
            return { ...puesto, puntos: [...puesto.puntos] };
          }
          return puesto;
        });
        return { ...area, puestosData: updatedPuestos };
      }
      return area;
    });
    setAreas(updatedAreas);
    alert('Datos guardados con éxito');
  };

  const handleAgregarPunto = () => {
    setPuntoIndex((prevIndex) => prevIndex + 1);
    setIdentificacion('');
  };

  const handleSiguienteDepartamento = () => {
    setDepartamento('');
    setPuntoIndex(0);
  };

  const selectedAreaIndex = areas.findIndex((area) => area.idArea.toString() === selectedArea);
  const selectedPuestoIndex = selectedAreaIndex !== -1
    ? areas[selectedAreaIndex].puestosData.findIndex((puesto) => puesto.nombrePuesto === selectedPuesto)
    : -1;

  const navigateToPoint = (direction: 'next' | 'previous') => {
    const puesto = areas[selectedAreaIndex]?.puestosData[selectedPuestoIndex];
    if (puesto) {
      if (direction === 'next' && puntoIndex < puesto.puntos.length - 1) {
        setPuntoIndex(puntoIndex + 1);
      } else if (direction === 'previous' && puntoIndex > 0) {
        setPuntoIndex(puntoIndex - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      {showResumen ? (
        <>
          {/* Vista del Resumen */}
          <ResumenMedicion />
          <button
            type="button"
            onClick={() => setShowResumen(false)}
            className="bg-blue-600 text-white p-3 rounded-md mt-4"
          >
            Volver a Mediciones
          </button>
        </>
      ) : (
        <>
          {/* Vista principal de Mediciones */}
          <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Mediciones - Área: {selectedArea || 'Sin Seleccionar'} - Departamento: {departamento || 'Sin Seleccionar'} - Punto: {puntoIndex + 1}
          </h1>
          <div className="mb-8">
            <label htmlFor="selectArea" className="block text-lg font-semibold mb-2">
              Área:
            </label>
            <select
              id="selectArea"
              value={selectedArea}
              onChange={handleSelectArea}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="" disabled>Seleccione un área</option>
              {areas.map((area) => (
                <option key={area.idArea} value={area.idArea}>
                  {area.nombreArea} ({area.identificacionData.areaIluminada || 'Sin Nombre'})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="departamento" className="block text-lg font-semibold mb-2">
              Departamento:
            </label>
            <input
              type="text"
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="selectPuesto" className="block text-lg font-semibold mb-2">
              Puesto de Trabajo:
            </label>
            <select
              id="selectPuesto"
              value={selectedPuesto}
              onChange={handleSelectPuesto}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="" disabled>Seleccione un puesto de trabajo</option>
              {puestosTrabajo.map((puesto, index) => (
                <option key={index} value={puesto}>
                  {puesto}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="identificacion" className="block text-lg font-semibold mb-2">
              Identificación:
            </label>
            <input
              type="text"
              id="identificacion"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Ingrese la identificación"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="nivelIluminacion" className="block text-lg font-semibold mb-2">
              Nivel de Iluminación (lux):
            </label>
            <select
              id="nivelIluminacion"
              value={nivelIluminacion}
              onChange={handleSelectNivelIluminacion}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="" disabled>Seleccione un nivel de iluminación</option>
              {NIVELES_ILUMINACION.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel} lux
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="tipoIluminacion" className="block text-lg font-semibold mb-2">
              Tipo de Iluminación:
            </label>
            <select
              id="tipoIluminacion"
              value={tipoIluminacion}
              onChange={handleSelectTipoIluminacion}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="" disabled>Seleccione un tipo de iluminación</option>
              <option value="NATURAL">Natural</option>
              <option value="ARTIFICIAL">Artificial</option>
              <option value="COMBINADA">Combinada</option>
            </select>
          </div>

          {tipoIluminacion && selectedAreaIndex !== -1 && selectedPuestoIndex !== -1 && (
            <MedicionesGeneral
              tipoMedicion={tipoIluminacion}
              numMediciones={tipoIluminacion === 'ARTIFICIAL' ? 1 : 4}
              areaId={areas[selectedAreaIndex].idArea}
              puestoIndex={selectedPuestoIndex}
            />
          )}

          <div className="flex space-x-4 mb-8">
            <button
              type="button"
              onClick={() => navigateToPoint('previous')}
              className="bg-gray-600 text-white p-3 rounded-md"
            >
              Punto Anterior
            </button>
            <button
              type="button"
              onClick={() => navigateToPoint('next')}
              className="bg-gray-600 text-white p-3 rounded-md"
            >
              Siguiente Punto
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              className="bg-blue-600 text-white p-3 rounded-md"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleAgregarPunto}
              className="bg-green-600 text-white p-3 rounded-md"
            >
              Agregar Punto
            </button>
            <button
              type="button"
              onClick={handleSiguienteDepartamento}
              className="bg-purple-600 text-white p-3 rounded-md"
            >
              Siguiente Departamento
            </button>
            <button
              type="button"
              onClick={() => setShowResumen(true)}
              className="bg-yellow-600 text-white p-3 rounded-md"
            >
              Ir a Resumen
            </button>
          </div>
        </>
      )}
    </div>
  );
}
