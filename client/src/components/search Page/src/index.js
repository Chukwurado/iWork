import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Part Time" },
        { title: "Learn some code", role: "Full Time" },
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Internship" },
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Full Time" },
        { title: "Go to the store", role: "Internship" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Part Time" },
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Part Time" },
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Part Time" },
        { title: "Learn some code", role: "Internship" },
        { title: "Go to the store", role: "Full Time" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Internship" },
        { title: "Go to the store", role: "Part Time" },
        { title: "Wash the dishes", role: "Full Time" },
        { title: "Learn some code", role: "Full Time" }
      ]
    };
  }

  render() {
    return (
      <section className="section">
        <SearchPage items={this.state.list} />
      </section>
    );
  }
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      filteredBySearch: [],
      filteredByForm: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFilterType = this.handleChangeFilterType.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items,
      filteredBySearch: this.props.items,
      filteredByForm: []
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items,
      filteredBySearch: nextProps.items,
      filteredByForm: nextProps.items
    });
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.items;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.title.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
      filteredBySearch: newList
    });
  }

  handleChangeFilterType(e) {
    let currentList = [];
    if (e.target.checked === true) {
      if (
        e.target.value === "Full Time" ||
        e.target.value === "Part Time" ||
        e.target.value === "Internship"
      ) {
        currentList = this.state.filteredBySearch;
        for (var x = 0; x < currentList.length; x++) {
          if (
            currentList[x].role.toLowerCase() === e.target.value.toLowerCase()
          ) {
            this.state.filteredByForm.push(currentList[x]);
          }
        }
        this.setState({
          filtered: this.state.filteredByForm
        });
      }
    }
    if (e.target.checked === false) {
      if (
        e.target.value === "Full Time" ||
        e.target.value === "Part Time" ||
        e.target.value === "Internship"
      ) {
        var filters = [];
        filters = this.state.filtered.filter(function(value, index, arr) {
          return value.role !== e.target.value;
        });
        this.setState({
          filteredByForm: filters,
          filtered: filters
        });
      }

      if (filters.length === 0) {
        let resetList = this.state.filteredBySearch;
        this.setState({
          filtered: resetList
        });
      }
    }
  }

  render() {
    return (
      <div class="container-fluid">
        <header>
          <div class="row">header Call</div>
        </header>
        <br />

        <div class="search row">
          <div class="col-sm-3" />
          <div class=" text-center col-sm-6">
            <input
              type="text"
              className="input"
              onChange={this.handleChange}
              placeholder="Search Jobs Titles..."
            />
          </div>
          <div class="col-sm-3 " />
        </div>
        <br />

        <div class=" filter row">
          <div class="Type col-sm-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Full Time"
                id="FullTime"
                onClick={this.handleChangeFilterType}
              />
              <label class="form-check-label" for="defaultCheck1">
                Full Time
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Part Time"
                id="PartTime"
                onClick={this.handleChangeFilterType}
              />
              <label class="form-check-label" for="defaultCheck1">
                Part Time
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Internship"
                id="Internship"
                onClick={this.handleChangeFilterType}
              />
              <label class="form-check-label" for="defaultCheck1">
                Internship
              </label>
            </div>
          </div>

          <div class="Location col-sm-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                New York
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Brooklyn
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Queens
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Bronx
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Staten Island
              </label>
            </div>
          </div>

          <div class="Role col-sm-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Web Developer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Desktop Developer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Mobile Developer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Game Developer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Data Scientist
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Embedded Systems Development
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Cloud Computing
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                Machine Learning / AI
              </label>
            </div>
          </div>
        </div>
        <br />

        <div class=" render row">
          {this.state.filtered.map(item => (
            <div class="card col-sm-3">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Job title</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  Job Type {item.role}
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">Job Location</h6>
                <p class="card-text"> Job describtion {item.title}</p>
                <a href=".com" class="card-link">
                  Company link
                </a>
                <a href=".com" class="card-link">
                  Apply link
                </a>
              </div>
            </div>
          ))}
        </div>
        <br />

        <footer class="page-footer font-small blue pt-4">
          <div class="row">footer call</div>
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
