import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ListItems } from "../../hooks/crudhooks";
import { RecentIrregularitiesTiredURL } from "../../api/apiurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * IrregularitiesPanel component is designed to display a list of recent irregularities related to a specific vehicle.
 * It dynamically fetches and renders the irregularities using the vehicleId as a filter criterion.
 * Each irregularity item is interactive, leading to detailed views upon click.
 *
 * @param {number} vehicleId - The unique identifier for the vehicle to fetch related irregularities.
 * This ID is used to make an API call that retrieves the recent irregularities specific to the vehicle.
 */
export function IrregularitiesPanel({ vehicleId }) {
  // Hook to programmatically navigate to different routes.
  const navigation = useNavigate();
  // State to hold the fetched irregularities data.
  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  // Fetches the recent irregularities for the specified vehicleId and updates the state.
  useEffect(() => {
    const fetchIrregularities = async () => {
      if (!vehicleId) return; // Ensure vehicleId is present before attempting to fetch
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${RecentIrregularitiesTiredURL}/${vehicleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching irregularities data:", error);
        setError("Failed to fetch data");
        setData("")
      } finally {
        setLoading(false);
      }
    };

    fetchIrregularities();
  }, [vehicleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  /**
   * Renders the list of recent irregularities. Each item is clickable, leading to a detailed view of the irregularity.
   * The detailed view route is dynamically constructed based on the irregularity's ID.
   */

  return (
    <div className="menu-container">
      <h1 className="title-center">Irregularidades Recientes</h1>
      {data &&
        data.content.map((irregularity, index) => (
          <div key={index} className="irregularity-block" onClick={() => navigation(`/incidencia-detalles/${irregularity.id}/r`)}>
            {irregularity.nameIrregularity} 
          </div>
        ))}
      <Button onClick={() => navigation(`/incidencias/v`)} style={{ margin: "1.5rem auto" }}>Ver mas detalles</Button>
    </div>
  );
}
