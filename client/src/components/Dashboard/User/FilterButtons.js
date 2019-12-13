import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup
} from "reactstrap";

export default function FilterButtons(props) {
  const buttonType = props.filterType;
  const buttonItems = props.filterItems;

  return (
    <ButtonGroup>
      <Dropdown
        size="sm"
        style={{ padding: 20, backgroundColor: "white", color: "black" }}
        isOpen={props.dropdownOpen}
        toggle={props.toggle}
      >
        <DropdownToggle caret>{buttonType}</DropdownToggle>
        <DropdownMenu>
          {buttonItems.map(item => (
            <DropdownItem>{item}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
