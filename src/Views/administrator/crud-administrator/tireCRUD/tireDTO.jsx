export const TireRequestData = (dto) => {
    return {
      codname: dto.codname,
      status: dto.estado,
      vehicleModel: dto.vehicle === "" ? null : { id: dto.vehicle },
      positioning: dto.posicionamiento === "" ? null : { id: dto.posicionamiento },
      companyModel: { id: 1 }, // Asume siempre id 1, ajusta según tu lógica
    };
  };
  