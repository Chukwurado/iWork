import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function VerticalModal(props) {
  const website = props.job && "http://" + props.job.website;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.job && props.job.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <span style={{ fontWeight: "bold" }}>Title:</span>{" "}
          {props.job && props.job.title}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Primary Role:</span>{" "}
          {props.job && props.job.primaryrole}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Type:</span>{" "}
          {props.job && props.job.typeofposition}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
          {props.job && props.job.city + " , " + props.job.state}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
          {props.job && props.job.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <a
          class="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          href={website}
        >
          Apply
        </a>
        <button class="btn btn-dark" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
