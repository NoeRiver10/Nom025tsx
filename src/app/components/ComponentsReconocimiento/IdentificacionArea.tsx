// src/app/components/ComponentsReconocimiento/IdentificacionArea.tsx
import React from 'react';

function IdentificacionArea({ data, setData }: { data: { idArea: string; areaIluminada: string; descripcionSuperficie: string }; setData: React.Dispatch<React.SetStateAction<{ idArea: string; areaIluminada: string; descripcionSuperficie: string }>> }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData: { idArea: string; areaIluminada: string; descripcionSuperficie: string }) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Identificación del Área
      </h2>
      <form className="space-y-6">
        {/* ID Área - No editable */}
        <div>
          <label htmlFor="idArea" className="block text-lg font-semibold text-gray-800 mb-2">
            ID Área:
          </label>
          <input
            type="text"
            id="idArea"
            name="idArea"
            value={data.idArea}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            placeholder="ID del área generado automáticamente"
          />
        </div>

        {/* Área Iluminada */}
        <div>
          <label htmlFor="areaIluminada" className="block text-lg font-semibold text-gray-800 mb-2">
            Área Iluminada:
          </label>
          <input
            type="text"
            id="areaIluminada"
            name="areaIluminada"
            value={data.areaIluminada}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Ingrese el área iluminada"
          />
        </div>

        {/* Descripción de la Superficie */}
        <div>
          <label htmlFor="descripcionSuperficie" className="block text-lg font-semibold text-gray-800 mb-2">
            Descripción de la Superficie:
          </label>
          <textarea
            id="descripcionSuperficie"
            name="descripcionSuperficie"
            value={data.descripcionSuperficie}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Ingrese una descripción de la superficie"
          />
        </div>
      </form>
    </div>
  );
}

export default IdentificacionArea;
