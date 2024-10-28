"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definición de Tipos Específicos
type IdentificacionData = {
  idArea: string;
  areaIluminada: string;
  descripcionSuperficie: string;
};

type DimensionesData = {
  altura: string;
  largo: string;
  ancho: string;
  indiceArea: number;
};

type LuminariasData = {
  tipoLuminaria: string;
  potencia: number;
  distribucion: string;
  iluminacionLocalizada: string;
  cantidad: number;
};

type PercepcionData = {
  nombreTrabajador: string;
  descripcion: string;
  puesto: string;
};

type Punto = {
  identificacion: string;
  departamento: string;
  nivelIluminacion: number | '';
  tipoIluminacion: string;
  mediciones: Medicion[];
};

type Medicion = {
  hora: string;
  trabajoE1: string;
  trabajoE2: string;
  paredesE1: string;
  paredesE2: string;
};


// Tipo de cada puesto en un área
// Asegúrate de que el tipo Puesto tenga el campo nivelSeleccionado definido como `number | undefined`
export type Puesto = {
  indice: number;
  nombrePuesto: string;
  numTrabajadores: number;
  descripcionActividades: string;
  nivelSeleccionado: number | undefined;
  puntos: Punto[];
};




// Tipo de un área completa
type Area = {
  idArea: number;
  nombreArea: string;
  identificacionData: IdentificacionData;
  dimensionesData: DimensionesData;
  luminariasData: LuminariasData;
  percepcionData: PercepcionData;
  puestosData: Puesto[];
};

// Definición del contexto de áreas
type AreasContextType = {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
};

// Creación del contexto
const AreasContext = createContext<AreasContextType | undefined>(undefined);

export const AreasProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial de las áreas
  const [areas, setAreas] = useState<Area[]>([
    {
      idArea: 1,
      nombreArea: 'Área 1',
      identificacionData: {
        idArea: '1',
        areaIluminada: '',
        descripcionSuperficie: '',
      },
      dimensionesData: {
        altura: '',
        largo: '',
        ancho: '',
        indiceArea: 0,
      },
      luminariasData: {
        tipoLuminaria: '',
        potencia: 0,
        distribucion: 'LINEAL',
        iluminacionLocalizada: 'SÍ',
        cantidad: 0,
      },
      percepcionData: {
        nombreTrabajador: '',
        descripcion: '',
        puesto: '',
      },
      puestosData: [
        {
          indice: 1,
          nombrePuesto: '',
          numTrabajadores: 0,
          descripcionActividades: '',
          nivelSeleccionado: undefined,
          puntos: [], // Inicializamos los puntos como un array vacío
        },
      ],
    },
  ]);

  return (
    <AreasContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreasContext.Provider>
  );
};

// Hook personalizado para usar el contexto de áreas
export const useAreas = () => {
  const context = useContext(AreasContext);
  if (!context) {
    throw new Error('useAreas debe ser utilizado dentro de un AreasProvider');
  }
  return context;
};