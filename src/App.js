/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import axios from "axios";
import qs from "query-string";
import "./index.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      characterList: [],
      status: "",
      species: "",
      gender: "",
      filter: false,
    };
  }

  getData = () => {
    const { species, gender, status } = this.state;
    const queryString = qs.stringify(
      {
        species,
        gender,
        status
      },
      { arrayFormat: "comma" }
    );
    console.log(queryString);
    axios
      .get(`https://rickandmortyapi.com/api/character/?${queryString}`)
      .then(response => {
        // handle success
        this.setState({
          characterList: response.data.results
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  addStatusFilter = e => {
    this.setState(
      {
        status: e.target.checked ? e.target.value : ''
      },
      () => {
        this.getData();
      }
    );
  };

  addSpeciesFilter = e => {
    this.setState(
      {
        species: e.target.checked ? e.target.value : ''
      },
      () => {
        this.getData();
      }
    );
  };

  addGenderFilter = e => {
    this.setState(
      {
        gender: e.target.checked ? e.target.value : ''
      },
      () => {
        this.getData();
      }
    );
  };

  removeFilter = (key) => {
    this.setState({
      [key]: ""
    },
      () => {
        this.getData();
      }
    );
  };

  sortCharacterList = e => {
    this.setState({
      characterList: Number(e.target.value) === 1 ? this.state.characterList.sort((a, b) => a.id - b.id) : this.state.characterList.sort((a, b) => b.id - a.id)  
    })
  }

  openFilter = () => {
    this.setState({
      filter: true
    })
  }
  closeFilter = () => {
    this.setState({
      filter: false
    })
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="App">
        <div className={`leftCol ${this.state.filter && 'active'}`}>
          <div>
          <span className="close-filter" onClick={this.closeFilter} />
          <h2> Filters</h2>
          <div className="filterBox">
            <h3>Status</h3>
            <label>
              <input 
                type="checkbox" 
                checked={this.state.status === "alive"}
                value="alive"
                onClick={this.addStatusFilter}
              /> 
              Alive
            </label>
            <label>
            <input 
                type="checkbox" 
                checked={this.state.status === "dead"}
                value="dead"
                onClick={this.addStatusFilter}
              /> 
              Dead
            </label>
            <label>
            <input 
                type="checkbox" 
                checked={this.state.status === "unknown"}
                value="unknown"
                onClick={this.addStatusFilter}
              /> 
              Unknown
            </label>
          </div>
          <div className="filterBox">
            <h3>Species</h3>
            <label>
              <input
                checked={this.state.species === "alien"}
                type="checkbox"
                value="alien"
                onClick={this.addSpeciesFilter}
              />{" "}
              Alien
            </label>
            <label>
              <input
                checked={this.state.species === "human"}
                type="checkbox"
                value="human"
                onClick={this.addSpeciesFilter}
              />{" "}
              Human
            </label>
            <label>
              <input
                checked={this.state.species === "mytholog"}
                type="checkbox"
                value="mytholog"
                onClick={this.addSpeciesFilter}
              />{" "}
              Mytholog
            </label>
            <label>
              <input
                checked={this.state.species === "humanoid"}
                type="checkbox"
                value="humanoid"
                onClick={this.addSpeciesFilter}
              />{" "}
              Humanoid
            </label>
            <label>
              <input
                checked={this.state.species === "unknown"}
                type="checkbox"
                value="unknown"
                onClick={this.addSpeciesFilter}
              />{" "}
              Other Species ...
            </label>
          </div>
          <div className="filterBox">
            <h3>Gender</h3>
            <label>
              <input 
                type="checkbox" 
                checked={this.state.gender === "male"}
                value="male"
                onClick={this.addGenderFilter}
              /> 
              Male
            </label>
            <label>
              <input
                type="checkbox" 
                checked={this.state.gender === "female"}
                value="female"
                onClick={this.addGenderFilter}                
              /> 
              Female
            </label>
          </div>
          </div>
        </div>
        <div className="rightCol">
          <div className="filterBtn" onClick={this.openFilter}><i className="filter-icon" /> Filter</div>
          {(this.state.status.length > 0 || this.state.species.length > 0 || this.state.gender.length > 0) && <h2>Selected Filters</h2>}
          <div className="SelectedFilterBox">
          {this.state.status && (
              <div className="selectedFilter">
                {this.state.status}{" "}
                <span
                  onClick={() =>
                    this.removeFilter("status", this.state.status)
                  }
                >
                  X
                </span>
              </div>
            )}
            {this.state.species && (
              <div className="selectedFilter">
                {this.state.species}{" "}
                <span
                  onClick={() =>
                    this.removeFilter("species", this.state.species)
                  }
                >
                  X
                </span>
              </div>
            )}
            {this.state.gender && (
              <div className="selectedFilter">
                {this.state.gender}{" "}
                <span
                  onClick={() =>
                    this.removeFilter("gender", this.state.gender)
                  }
                >
                  X
                </span>
              </div>
            )}
          </div>
          <div className="sort">
            <select onChange={this.sortCharacterList} >
              <option value={1}>Ascending</option>
              <option value={2}>Descending</option>
            </select>
          </div>
          {this.state.characterList.map((item, index) => (
            <div className="tile-outer" key={index}>
              <div className="tile">
                <div className="imgbox">
                  <img src={item.image}></img>
                  <div className="nameIdBox">
                    <h2>
                      {item.name}
                      <span>id: {item.id} - created 2 years ago</span>
                    </h2>
                  </div>
                </div>
                <div className="textbox">
                  <div className="row">
                    <div className="col1">STATUS</div>
                    <div className="col2">{item.status} </div>
                  </div>
                  <div className="row">
                    <div className="col1">SPECIES</div>
                    <div className="col2">{item.species} </div>
                  </div>
                  <div className="row">
                    <div className="col1">GENDER</div>
                    <div className="col2">{item.gender} </div>
                  </div>
                  <div className="row">
                    <div className="col1">ORIGIN</div>
                    <div className="col2 ellipsis1">{item.origin.name} </div>
                  </div>
                  <div className="row">
                    <div className="col1">LAST LOCATION</div>
                    <div className="col2">{item.location.name} </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
