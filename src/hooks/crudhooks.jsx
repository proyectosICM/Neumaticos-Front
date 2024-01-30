import axios from "axios";
import { useEffect } from "react";

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