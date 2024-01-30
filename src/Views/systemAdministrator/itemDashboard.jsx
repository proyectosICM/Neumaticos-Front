import React from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

/**
 * Dashboard item component displaying title, icon, and description.
 * @param {string} title - Title of the dashboard item.
 * @param {React.Component} icon - Icon component for the dashboard item.
 * @param {string} description - Description of the dashboard item.
 */
export function ItemDashboard({ title, icon, description }) {
  return (
    <>
      {/* Card component for displaying the dashboard item */}
      <Card className="item-card">
        {/* Title of the dashboard item */}
        <CardTitle>{title}</CardTitle>

        {/* Icon component rendered dynamically */}
        {React.createElement(icon, {
          className: "item-card",
        })}

        {/* Body section containing the description of the dashboard item */}
        <CardBody>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </>
  );
}
