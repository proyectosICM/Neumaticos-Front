import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GiCarWheel, GiTentacleStrike } from "react-icons/gi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ListItems2 } from "../../../../hooks/crudhooks";
import { VehicleCompanyURL } from "../../../../api/apiurl";
import Swal from "sweetalert2";

export function SensorModal({ show, onHide, guardar, editar, datosaEditar }) {
  const company = +localStorage.getItem("empresa");
  const rol = +localStorage.getItem("rol");
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    ListItems2(`${VehicleCompanyURL}?companyId=${company}`, setVehicles);
  }, [company]);

  const initialValues = {
    id: datosaEditar ? datosaEditar.id : "",
    identificationCode: datosaEditar ? datosaEditar.identificationCode : "",
    vehicle: datosaEditar && datosaEditar.vehicleModel ? datosaEditar.vehicleModel.id : "",
    posicionamiento: datosaEditar && datosaEditar.positioning ? datosaEditar.positioning.id : "",
    empresa: datosaEditar && datosaEditar.companyModel ? datosaEditar.companyModel.id : "",
  };

  const handleSave = (dto) => {
    let errors = [];

    if (dto.identificationCode === "") {
      errors.push("Por favor agrega el IDENTIFICATION-CODE del neumático.");
    }
    /*
    if (dto.vehicle === "") {
      errors.push("Por favor agrega el vehículo asociado al neumático.");
    }
    */
    if (dto.vehicle === "") {
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

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <GiCarWheel /> Agregar Sensores
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
                    <h5>IDENTIFICATION-CODE</h5>
                    <Field type="text" name="identificationCode" style={{ width: "90%" }} />
                    <ErrorMessage name="identificationCode" component="div" className="error" />
                  </div>

                  <div style={{ width: "50%" }}>
                    <h5>VEHICULO</h5>
                    <Field as="select" name="vehicle" style={{ width: "90%" }} className="inp2-form">
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
                </div>
                {values.vehicle != "" && (
                  <div style={{ width: "50%" }}>
                    <h5>POSICIONAMIENTO</h5>
                    <Field type="text" name="posicionamiento" style={{ width: "90%" }} />
                    <ErrorMessage name="posicionamiento" component="div" className="error" />
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
      </Modal>
    </>
  );
}
