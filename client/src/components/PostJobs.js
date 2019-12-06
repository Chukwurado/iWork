import React from "react";
import StateDropDown from "../components/StateDropDown";

const PostJobs = props => {
  return (
    <div className="postJobs">
      <div>
        <form>
          <div id="jobTitle">
            <label>
              Job Title
              <input type="text" name="jobTitle" />
            </label>
          </div>
          <div id="jobDescription">
            <label>
              Description
              <input type="text" name="jobDescription" />
            </label>
          </div>
          <div id="jobType">
            <label>
              Job type
              <select>
                <option value="Internship">Internship</option>
                <option value="Full Time">Full Time</option>
                <option selected value="Contractor">
                  Contractor
                </option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div id="primaryRole">
            <label>
              Primary Role
              <input type="text" name="jobPrimaryRole" />
            </label>
          </div>
          <div id="location">
            <div>
              <label>
                State
                <StateDropDown
                  value={props.state}
                  onChange={props.selectState}
                />
              </label>
            </div>
            <div>
              <label>
                City
                <input type="text" name="city" />
              </label>
            </div>
          </div>
          <div id="jobWebsite">
            <label>
              Website
              <input type="text" name="website" />
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
