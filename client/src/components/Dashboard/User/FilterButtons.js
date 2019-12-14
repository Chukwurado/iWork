import React from "react";
import {
  Dropdown,
  ButtonDropdown,
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
      <ButtonDropdown
        size="sm"
        className="primary"
        style={{ padding: 20 }}
        isOpen={props.dropdownOpen}
        toggle={props.toggle}
      >
        <DropdownToggle color="primary" caret>
          {buttonType}
        </DropdownToggle>
        <DropdownMenu>
          {buttonItems.map(item => (
            <DropdownItem onClick={() => props.filter(buttonType, item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </ButtonGroup>
  );
}
