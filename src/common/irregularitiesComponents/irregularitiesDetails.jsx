import React, { useState } from "react";
import { ListItems } from "../../hooks/crudhooks";
import { ITTURL, ITTbyIrregularityURL, ITTiURL, IrregularitiesTiredBaseURL } from "../../api/apiurl";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PerformancePanel } from "../vehicleComponents/performancePanel";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { LogoutToken } from "../../hooks/logoutToken";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";

export function IrregularitiesDetails() {
  const navigation = useNavigate();
  const { id, b } = useParams();
  const [data, setData] = useState();
  const [images, setImages] = useState();

  ListItems(`${IrregularitiesTiredBaseURL}/${id}`, setData);
  ListItems(`${ITTbyIrregularityURL}/${id}`, setImages);

  console.log(images);

  const vehicleId = +localStorage.getItem("vehicleId");

  const handleBack = () => {
    if (b == "r") {
      return navigation(`/detalles/${vehicleId}`);
    } else {
      return navigation(`/incidencias/${b}`);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [imagesData, setImagesData] = useState();
  const [imagesId, setImagesId] = useState();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("irregularitiesTireModelId", id);
    formData.append("companyModelId", 1);
    formData.append("details", "NO");

    try {
      const token = await localStorage.getItem("token");
      const response = await axios.post(ITTURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire("Imagen cargada con éxito");
        setPreviewUrl(null);
        setSelectedFile(null);
      } else {
        Swal.fire("Error al cargar la imagen");
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      Swal.fire("Error al cargar la imagen");
    }
  };

  const rol = +localStorage.getItem("rol");

  return (
    <div style={{ border: "2px solid", width: "100%" }}>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <Button className="button-back" onClick={() => handleBack()}>
        Atras
      </Button>
      {data ? (
        <div style={{ margin: "2rem auto", width: "80%", fontSize: "1.5rem", color: "white" }}>
          <h2>Detalle de Irregularidad </h2>
          <p>
            <strong>Nombre:</strong> {data.nameIrregularity}
          </p>
          <p>
            <strong>Detalles:</strong> {data.detailsIrregularity}
          </p>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>
                  <strong>Dia en que se registro la incidencia: </strong>
                </th>
                <th>
                  {" "}
                  <strong>Hora en que se registro la incidencia: </strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                <td>{new Date(data.createdAt).toLocaleTimeString()}</td>
              </tr>
            </tbody>
          </Table>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>
                  <strong>Placa del Vehículo:</strong>{" "}
                </th>
                <th>
                  <strong>Compañía:</strong>
                </th>
                <th>
                  <strong>Tipo de Vehículo:</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.vehicleModel.placa}</td>
                <td>{data.company.name}</td>
                <td>{data.vehicleModel.vehicleType.name}</td>
              </tr>
            </tbody>
          </Table>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Temperatura registrada en incidencia</th>
                <th>Presion registrada en la incidencia</th>
                <th>Bateria del dispositivo registrada en la incidencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.recordedTemperature ? `${data.recordedTemperature} °C` : "NO registrado"} </td>
                <td>{data.recordedPressure ? `${data.recordedPressure} PSI` : "No registrado"}</td>
                <td>{data.recordedBatteryLevel ? `${data.recordedBatteryLevel} %` : "No registrado"}</td>
              </tr>
            </tbody>
          </Table>

          <Button onClick={() => document.getElementById("fileInput").click()}>
            {" "}
            <CiCamera style={{ fontSize: "50px" }} /> Agregar Foto
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
          </Button>

          <div style={{ width: "100%", height: "100%", alignItems: "center", alignContent: "center" }}>
            {previewUrl && (
              <div style={{ width: "40%", height: "40%", margin: "0% 30%" }}>
                <img src={previewUrl} alt="Preview" style={{ width: "100%", margin: "5% 0%", height: "100%", objectFit: "cover" }} />
                <Button onClick={() => uploadImage()}>Enviar Imagen</Button>
              </div>
            )}
          </div>

          {/* Ajustar Visibilidad */}
          {data.status !== true && (
            <div>
              <p>
                <strong>Incidencia Revisada por:</strong> Supervisor Marco
              </p>
              <p>
                <strong>Dia de Revision:</strong> {new Date(data.updatedAt).toLocaleDateString()}
              </p>
              <Button>Marcar como revisada</Button>
            </div>
          )}

          <div style={{ width: "100%", border: "2px solid" }}>
            <Modal show={showModal} onHide={() => setShowModal(false)} style={{ width: "100%" }}>
              <Modal.Header closeButton style={{ width: "150%", backgroundColor: "white", color: "white" }}></Modal.Header>
              <Modal.Body style={{ width: "150%", backgroundColor: "black" }}>
                <div style={{ alignItems: "center", justifyItems: "center", justifyItems: "center", display: "flex", flexDirection: "row" }}>
                  <FaAngleLeft style={{ color: "white", cursor: "pointer", width: "25%", height: "100px", fontSize: "200px" }} />

                  <img
                    style={{ width: "50%", height: "50%" }}
                    src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                    alt="Descripción de la imagen"
                    onClick={() => setShowModal(true)}
                  />

                  <FaAngleRight style={{ color: "white", cursor: "pointer", width: "25%", height: "100px", fontSize: "200px" }} />
                </div>
              </Modal.Body>
            </Modal>
          </div>

          <div className="menu-container">
            <div className="panel-container">
              <PerformancePanel vehicleId={data.vehicleModel.id} />
            </div>

            <div className="panel-container">
              <h1>Imagenes asociadas</h1>
              <div className="menu-container-border" style={{ overflow: "scroll", cursor: "pointer" }}>

              {images &&
              images.map((incidencia, index) => (
                <img
                style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                src="https://i.pinimg.com/564x/02/fc/b8/02fcb811b1098c13c20f49e48cf336aa.jpg"
                alt="Descripción de la imagen"
                onClick={() => setShowModal(true)}
                key={index}
              />
              ))}
          
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
                <img
                  style={{ width: "30%", height: "30%", margin: "0% 10%" }}
                  src="https://i.pinimg.com/564x/e4/1e/69/e41e69cc589d2143144da845b872a2bc.jpg"
                  alt="Descripción de la imagen"
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando detalles de la irregularidad...</p>
      )}
    </div>
  );
}
