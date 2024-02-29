import axios from "axios";
import { useEffect, useState } from "react";
import { TiresByVehicleAndPositionURL, TiresSenorByVehicleAndPositionURL } from "../api/apiurl";

export const useTireDetails = (vehicleId, positioning) => {
  const [tireDetails, setTireDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vehicleId || !positioning) return; // Evita efectos innecesarios

    const fetchTireDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${TiresSenorByVehicleAndPositionURL}?vehicleId=${vehicleId}&positioningCode=${positioning}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data && data.length > 0) {
          const {
            pressure,
            temperature,
            batteryLevel,
            positioning: { locationCode },
          } = data[0];
          setTireDetails(`${locationCode} : ${pressure} PSI - ${temperature} º C - ${batteryLevel} %`);
        }
      } catch (error) {
        console.error("Error fetching tire details", error.message); // Solo muestra el mensaje de error
        setError("Could not fetch tire details."); // Mensaje genérico para el usuario
        setTireDetails(""); // Limpia los detalles en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchTireDetails();
  }, [vehicleId, positioning]); // Dependencias del efecto

  return { tireDetails, loading, error };
};

export function ListItems(url, setData) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log("Data updated");
      } catch (error) {
        console.error("Error listing items", error);
        const token = await localStorage.getItem("token");
      }
    };

    fetchData();
  }, [url, setData]);
}

export function ListItems2(url, setData) {
  const fetchData = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("Data updated");
    } catch (error) {
      console.error("Error listing items", error);
      const token = await localStorage.getItem("token");
    }
  };
  fetchData();
}

export function ListItemsPaginated(url, setData) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.content);
        console.log("Data updated");
      } catch (error) {
        console.error("Error listing items", error);
        const token = await localStorage.getItem("token");
      }
    };

    fetchData();
  }, [url, setData]);
}

export async function editarElemento(url, requestData) {
  try {
    const token = localStorage.getItem("token");
    await axios.put(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Lógica para cerrar el modal o para acciones después de la actualización exitosa
    console.log("Elemento actualizado con éxito");

  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error
    console.error("Error al actualizar el elemento:", error);
  }
}
