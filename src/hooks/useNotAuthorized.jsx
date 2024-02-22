import React from "react";
import { useNavigate } from "react-router-dom";

export function useNotAuthorized(param1) {
  const navigation = useNavigate();
  const empresa = localStorage.getItem("empresa");
  const rol = localStorage.getItem("rol");

  if (param1 != empresa) {
    navigation("/notAuthorized");
  }

  return null;
}
