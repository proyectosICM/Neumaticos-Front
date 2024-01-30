// Importing icons from react-icons library
import { BsBuildingsFill } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { AiOutlineWarning } from "react-icons/ai";

/**
 * Constant array representing dashboard items.
 * @param {string} title - Title of the dashboard item.
 * @param {React.Component} icon - Icon component for the dashboard item.
 * @param {string} description - Description of the dashboard item.
 */

export const DASHBOARD_ITEMS = [
  {
    title: "Tablas de administracion (CRUD)",
    icon: BsBuildingsFill,
    description: "Administre recursos del sistema, empresas asociadas, usuarios, camiones, etc",
  },
  {
    title: "Mensajes de empresas",
    icon: TiMessages,
    description: "Lea los mensajes enviados por empresas",
  },
  {
    title: "Incidencias Recientes",
    icon: AiOutlineWarning,
    description: "Revise las incidencias recientes de las empresas asociadas",
  },
];
