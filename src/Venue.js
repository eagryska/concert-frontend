/* eslint-disable */
import React from 'react';
import Section from './Section';

class Venue extends React.Component {
  constructor() {
    super();
    this.state = { sections: [] };
    this.typeList = [];
    this.update = this.update.bind(this);
    this.createSection = this.createSection.bind(this);
  }

  componentWillMount() {
    console.log('will');
    const v = this;
    fetch('//localhost:3333/sections',{
      method: 'get',
      credentials: "same-origin"
    }).then( function(r){ return r.json() })
    .then( function(data){
      v.setState({sections: data})
    });
  }

  componentDidMount() {
    console.log('did');
    // $.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=692d9840933cc93352daaab2d7bb4ac7&units=imperial')
    // .then((rsp) => {
    //   this.setState({ temp: rsp.main.temp });
    // });
  }

  update() {
    // $.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.refs.city.value + '&appid=692d9840933cc93352daaab2d7bb4ac7&units=imperial')
    // .then((rsp) => {
    //   this.se tState({ temp: rsp.main.temp, city: this.refs.city.value });
    // });
  }

  createSection(){
    let newSections = this.state.sections;
    const sectionType = this.refs.sectionType.value;
    const price = this.refs.price.value;
    const totalSeats = this.refs.totalSeats.value;
    let jsonData = {sectionType, seatPrice: price, seatsTaken: 0, totalSeats, totalSales: 0}
    const v = this;
    fetch('//localhost:3333/sections/create',{
      method: 'post',
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then( function(r){ return r.json(); })
    .then( function(data){
      newSections.push(data);
      v.setState({sections: newSections})
    });
  }

  render() {
    console.log('render');
    return (
      <div className="row">
        <div className="col-xs-4">
          <h2>Section</h2>
          <div className="form-group">
            <label>Seats Available:</label>
            <input className="form-control" ref='totalSeats' type='number'></input>
          </div>
          <div className="form-group">
            <label>Seat Type:</label>
            <select className="form-control" ref='sectionType'>
              <option>Floor</option>
              <option>Balcony</option>
              <option>Mezzanine</option>
              <option>General</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input className="form-control" ref='price' type='number'></input>
          </div>
          <button className="btn btn-success" onClick={this.createSection}>Create</button>
        </div>
        {this.state.sections.map( (s, idx) => <Section key={idx} sectionID={s._id} sectionType={s.sectionType} seatPrice={s.seatPrice} totalSeats={s.totalSeats} seats={s.seats} seatsTaken={s.seatsTaken} />)}
      </div>
    );
  }

}

export default Venue;
