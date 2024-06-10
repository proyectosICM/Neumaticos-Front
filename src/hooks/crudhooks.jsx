import axios from "axios";
import { useEffect, useState } from "react";
import { TiresByVehicleAndPositionURL, TiresSensorByVehicleAndPositionURL } from "../api/apiurl";

export const useTireDetails = (vehicleId, positioning) => {
  const [tireDetails, setTireDetails] = useState("");
  const [tireCode, setTireCode] = useState();
  const [sensorCode, setSensorCode] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tireId, setTireId] = useState();
  const [sensorId, setSensorId] = useState();
  const posSel = localStorage.getItem("tireSelected");
  useEffect(() => {
    if (!vehicleId || !positioning) return; // Evita efectos innecesarios

    if (posSel != null) {
      const fetchTireDetails = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.get(`${TiresSensorByVehicleAndPositionURL}?vehicleId=${vehicleId}&positioningCode=${positioning}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const response2 = await axios.get(`${TiresByVehicleAndPositionURL}?vehicleId=${vehicleId}&positioning=${positioning}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data2 = response2.data;
          if (data && data.length > 0) {
            const {
              pressure,
              temperature,
              batteryLevel,
              positioning: { locationCode },
              identificationCode,
              id,
            } = data[0];
            setTireDetails(`${locationCode} : ${pressure} PSI - ${temperature} º C - ${batteryLevel} %`);
            setSensorCode(`${identificationCode}`);
            setTireId(id);
          }
          if (data2 && data2.codname) {
            const { codname, id } = data2;
            setTireCode(codname);
            //setTireCode(`${codname}`);
            setSensorId(id);
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
    } else {
      setTireDetails("");
      setSensorCode("");
      setTireId("");
    }
  }, [vehicleId, positioning]); // Dependencias del efecto

  return { tireDetails, tireCode, sensorCode, tireId, sensorId, loading, error };
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
        console.log("2");
      } catch (error) {
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
    } catch (error) {
      const token = await localStorage.getItem("token");
    }
  };

  fetchData();
}

export function ListItemsTimed(url, setData) {
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
      } catch (error) {
        const token = await localStorage.getItem("token");
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);
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
      }
    };

    fetchData(); // Primera ejecución

    const intervalId = setInterval(fetchData, 1000); // Ejecutar cada 1 segundo

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
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
  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error
    console.error("Error al actualizar el elemento:", error);
  }
}

export function GuardarElementos(url, requestData) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
        reject(error);
      });
  });
}
