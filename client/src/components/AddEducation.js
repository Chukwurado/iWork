import React from "react";
import { RegionDropdown } from "react-country-region-selector";

const AddEducation = props => {
  return (
    <div className="addEducation">
      <div>
        <form>
          <div id="school">
            <label>
              School
              <input type="text" name="school" />
            </label>
          </div>
          <div id="degree">
            <label>
              Degree
              <input type="text" name="degree" />
            </label>
          </div>

          <div id="fieldOfStudy">
            <label>
              Field of Study
              <input type="text" name="fieldOfStudy" />
            </label>
          </div>
          <div id="fromDate">
            <label>
              From
              <input type="date" name="fromDate" />
            </label>
          </div>
          <div id="toDate">
            <label>
              To
              <input type="date" name="toDate" />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
