export const sensorRequestData = (dto) => {
    return {
      identificationCode: dto.identificationCode,
      status: true,
      vehicleModel: dto.vehicle === "" ? null : { id: dto.vehicle },
      positioning: dto.posicionamiento === "" ? null : { id: dto.posicionamiento },
      companyModel: { id: 1 }, // Aquí supongo que siempre es 1, ajusta según tu lógica
    };
  };