import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GiCarWheel } from "react-icons/gi";
import { ListItems2 } from "../../../../hooks/crudhooks";
import { VehicleTypeURL } from "../../../../api/apiurl";
import Swal from "sweetalert2";

export function VehicleModal({ show, onHide, guardar, editar, datosaEditar }) {
  const company = +localStorage.getItem("empresa");
  const rol = +localStorage.getItem("rol");
  const [vehiclesTypes, setVehiclesTypes] = useState();

  useEffect(() => {
    ListItems2(`${VehicleTypeURL}?companyId=${company}`, setVehiclesTypes);
  }, [company]);

  const initialValues = {
    id: datosaEditar ? datosaEditar.id : "",
    placa: datosaEditar ? datosaEditar.placa : "",
    vehicleType: datosaEditar ? datosaEditar.vehicleType.id : "",
    standardTemperature: datosaEditar ? datosaEditar.standardTemperature : "",
    standardPressure: datosaEditar ? datosaEditar.standardPressure : "",
  };

  const handleSave = (dto) => {
    let errors = [];

    if (dto.vehicleType != "") {
      if (dto.standardTemperature === "") {
        errors.push("Por favor agrega la temperatura estandar para el sensor.");
      }

      if (dto.standardPressure === "") {
        errors.push("Por favor agrega la presion estandar para el sensor.");
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


  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <GiCarWheel /> Agregar Vehiculos
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await handleSave(values);
            }}
          >
            {({ values }) => (
              <Form>
                <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "50%" }}>
                    <h5>Placa</h5>
                    <Field type="text" name="placa" style={{ width: "90%" }} />
                    <ErrorMessage name="placa" component="div" className="error" />
                  </div>

                  <div style={{ width: "50%" }}>
                    <h5>VEHICULO</h5>
                    <Field as="select" name="vehicleType" style={{ width: "90%" }} className="inp2-form">
                      <option value="">Seleccione un vehículo</option>
                      {vehiclesTypes &&
                        vehiclesTypes.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} {/* Suponiendo que 'placa' es el atributo que quieres mostrar */}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage name="vehicleType" component="div" className="error" />
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "50%" }}>
                    <h5>TEMPERATURA ESTANDAR</h5>
                    <Field type="text" name="standardTemperature" style={{ width: "90%" }} />
                    <ErrorMessage name="standardTemperature" component="div" className="error" />
                  </div>

                  <div style={{ width: "50%" }}>
                    <h5>TEMPERATURA ESTANDAR</h5>
                    <Field type="text" name="standardPressure" style={{ width: "90%" }} />
                    <ErrorMessage name="standardPressure" component="div" className="error" />
                  </div>
                </div>

                <Button type="submit" variant="primary">
                  Guardar
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
