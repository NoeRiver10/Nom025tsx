// src/app/reconocimiento/page.tsx
"use client";
import { useState } from 'react';
import IdentificacionArea from '../components/ComponentsReconocimiento/IdentificacionArea';
import DimensionesArea from '../components/ComponentsReconocimiento/DimensionesArea';
import Luminarias from '../components/ComponentsReconocimiento/Luminarias';
import Percepcion from '../components/ComponentsReconocimiento/Percepcion';
import Puestos from '../components/ComponentsReconocimiento/Puestos';

export default function ReconocimientoPage() {
  const [identificacionData, setIdentificacionData] = useState({
    idArea: '',
    areaIluminada: '',
    descripcionSuperficie: '',
  });

  const [dimensionesData, setDimensionesData] = useState({
    altura: '',
    largo: '',
    ancho: '',
    indiceArea: 0,
  });

  const [luminariasData, setLuminariasData] = useState({
    tipoLuminaria: '',
    potencia: 0,
    distribucion: 'LINEAL',
    iluminacionLocalizada: 'SÍ',
    cantidad: 0,
  });

  const [percepcionData, setPercepcionData] = useState({
    nombreTrabajador: '',
    descripcion: '',
    puesto: '',
  });

  const [puestosData, setPuestosData] = useState([
    {
      indice: 1,
      puesto: '',
      numTrabajadores: 0,
      descripcionActividades: '',
      nivelSeleccionado: undefined as number | undefined,
    },
  ]);

  const handleGuardar = () => {
    console.log('Identificación Área:', identificacionData);
    console.log('Dimensiones Área:', dimensionesData);
    console.log('Luminarias:', luminariasData);
    console.log('Percepción:', percepcionData);
    console.log('Puestos:', puestosData);
    alert('Guardado con éxito');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">
        Página de Reconocimiento
      </h1>
      <IdentificacionArea data={identificacionData} setData={setIdentificacionData} />
      <DimensionesArea data={dimensionesData} setData={setDimensionesData} />
      <Luminarias data={luminariasData} setData={setLuminariasData} />
      <Percepcion data={percepcionData} setData={setPercepcionData} />
      <Puestos puestos={puestosData} setPuestos={setPuestosData} />
      <button
        type="button"
        onClick={handleGuardar}
        className="bg-blue-600 text-white p-3 rounded-md mt-4"
      >
        Guardar
      </button>
    </div>
  );
}
