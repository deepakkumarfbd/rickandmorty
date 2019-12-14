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
      species: ""
    };
  }

  getData = () => {
    const { species } = this.state;
    const queryString = qs.stringify(
      {
        species,
        gender: ["male"]
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
        console.log(response.data.results);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
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

  removeFilter = (key, value) => {
    this.setState({
      [key]: ""
    });
  };

  sortCharacterList = e => {
    this.setState({
      characterList: e.target.value === 1 ? this.state.characterList.sort((a, b) => a - b) : this.state.characterList.sort((a, b) => b - a)  
    })
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="App">
        <div className="leftCol">
          <h2>Filters</h2>
          <div className="filterBox">
            <h3>Species</h3>
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
              <input type="checkbox" /> Male
            </label>
            <label>
              <input type="checkbox" /> Female
            </label>
          </div>
          <div className="filterBox">
            <h3>Origin</h3>
            <label>
              <input type="checkbox" /> Unknown
            </label>
            <label>
              <input type="checkbox" /> Post-Apocalyptic Earth
            </label>
            <label>
              <input type="checkbox" /> Nuptia 4
            </label>
            <label>
              <input type="checkbox" /> Other Origins ...
            </label>
          </div>
        </div>
        <div className="rightCol">
          <h2>Selected Filters</h2>
          <div className="SelectedFilterBox">
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
                    <div className="col2">{item.origin.name} </div>
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
