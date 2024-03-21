import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillBusFrontFill } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { GuardarElementos, ListItems2 } from "../../../../hooks/crudhooks";
import { PositioningvehicleType, VehicleCompanyURL } from "../../../../api/apiurl";
import Swal from "sweetalert2";

export function TireModal({ show, onHide, guardar, editar, datosaEditar }) {
  const company = +localStorage.getItem("empresa");
  const rol = +localStorage.getItem("rol");

  const [vehicles, setVehicles] = useState([]);
  const [posiciones, setPosiciones] = useState([]);
  const [noVehicle, setNoVehicle] = useState(false);

  const handleSave = (dto) => {
    let errors = [];

    if (dto.codname === "") {
      errors.push("Por favor agrega el CODNAME del neumático.");
    }

    if (dto.estado === "IN_USE") {
      if (dto.vehicle === "") {
        errors.push("Por favor agrega el vehículo asociado al neumático.");
      }

      if (dto.posicionamiento === "") {
        errors.push("Por favor agrega el posicionamiento del neumático.");
      }
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops... faltan algunos datos",
        html: `<ul>${errors.map((error) => `<li>${error}</li>`).join("")}</ul>`,
        confirmButtonText: "Aceptar",
      });
    } else {
      if (datosaEditar) {
        editar(dto);
      } else {
        guardar(dto);
      }
    }
  };

  useEffect(() => {
    ListItems2(`${VehicleCompanyURL}?companyId=${company}`, setVehicles);
  }, [company]);

  const handleVehicleChange = (e, setFieldValue) => {
    const selectedValue = parseInt(e.target.value, 10);
    console.log(selectedValue);

    if (Array.isArray(vehicles.content)) {
      const vehicleType = vehicles.content.find((v) => v.id === selectedValue);
      if (vehicleType) {
        setFieldValue("vehicle", e.target.value);
        ListItems2(`${PositioningvehicleType}?vehicleTypeId=${vehicleType.vehicleType.id}`, setPosiciones);
      } else {
        setPosiciones("");
      }
    }
  };

  useEffect(() => {
    if (datosaEditar) {
      ListItems2(`${PositioningvehicleType}?vehicleTypeId=${datosaEditar.vehicleModel.vehicleType.id}`, setPosiciones);
    }
  }, [datosaEditar]);

  const initialValues = {
    id: datosaEditar ? datosaEditar.id : "",
    codname: datosaEditar ? datosaEditar.codname : "",
    estado: datosaEditar ? datosaEditar.status : "",
    posicionamiento: datosaEditar && datosaEditar.positioningModel ? datosaEditar.positioningModel.id : "",
    vehicle: datosaEditar && datosaEditar.vehicleModel ? datosaEditar.vehicleModel.id : "",
    empresa: datosaEditar ? datosaEditar.companyModel.id : "",
  };

  return (
    <>
      <Modal show={show} onHide={onHide} style={{ width: "100%" }}>
        <Modal.Header closeButton style={{ width: "100%", border: "3px solid blue" }}>
          <Modal.Title>
            <GiCarWheel /> Agregar Neumaticos
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ width: "100%", border: "3px solid blue" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await handleSave(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "50%" }}>
                    <h5>CODNAME</h5>
                    <Field type="text" name="codname" style={{ width: "90%" }} />
                    <ErrorMessage name="codname" component="div" className="error" />
                  </div>
                  <div style={{ width: "50%" }}>
                    <h5>ESTADO</h5>
                    <Field as="select" name="estado" style={{ width: "90%" }} className="inp2-form">
                      <option value="">Seleccione un estado</option>
                      <option value="FREE">FREE</option>
                      <option value="IN_USE">IN_USE</option>
                      <option value="DAMAGED">DAMAGED</option>
                    </Field>
                    <ErrorMessage name="estado" component="div" className="error" />
                  </div>
                </div>

                {values.estado == "IN_USE" && (
                  <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "50%" }}>
                      <h5>VEHICULO</h5>
                      <Field
                        as="select"
                        name="vehicle"
                        style={{ width: "90%" }}
                        className="inp2-form"
                        onChange={(e) => handleVehicleChange(e, setFieldValue)}
                      >
                        <option value="">Seleccione un vehículo</option>
                        {vehicles &&
                          vehicles.content.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.placa} {/* Suponiendo que 'placa' es el atributo que quieres mostrar */}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage name="vehicle" component="div" className="error" />
                    </div>

                    {values.estado === "IN_USE" && values.vehicle != "" && posiciones && (
                      <div style={{ width: "50%" }}>
                        <h5>POSICIONAMIENTO</h5>
                        <Field as="select" name="posicionamiento" style={{ width: "90%" }} className="inp2-form">
                          <option value="">Seleccione un posicionamiento</option>
                          {posiciones &&
                            posiciones.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.locationCode} {p.description}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name="posicionamiento" component="div" className="error" />
                      </div>
                    )}
                  </div>
                )}
                {rol == 4 && (
                  <div className="input-column" style={{ width: "100%" }}>
                    <h5>EMPRESA</h5>
                    <Field type="text" name="empresa" className="inp2-form" />
                    <ErrorMessage name="empresa" component="div" className="error" />
                  </div>
                )}

                <Button type="submit" variant="primary">
                  Guardar
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer> </Modal.Footer>
      </Modal>
    </>
  );
}
