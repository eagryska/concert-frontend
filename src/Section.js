/* eslint-disable */
import React from 'react';
class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sectionID: this.props.sectionID, totalSeats: this.props.totalSeats, seatsTaken: this.props.seatsTaken, sectionType: this.props.sectionType, price: this.props.seatPrice, totalSales: 0, seats: this.props.seats };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    console.log('will');
    //populate totalSeats, seatsTaken, price, seats
    //calculate total sales
    //populate from database
    let total = this.state.totalSales;
    total = this.state.seatsTaken * this.state.price;
    console.log(this.state);
    this.setState({totalSales: total})
  }

  componentDidMount() {
    console.log('did');
    // $.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=692d9840933cc93352daaab2d7bb4ac7&units=imperial')
    // .then((rsp) => {
    //   this.setState({ temp: rsp.main.temp });
    // });
  }

  update(idx) {
    // $.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.refs.city.value + '&appid=692d9840933cc93352daaab2d7bb4ac7&units=imperial')
    // .then((rsp) => {
    //   this.se tState({ temp: rsp.main.temp, city: this.refs.city.value });
    // });
    let seats2 = this.state.seats;
    let newSeatsTaken = this.state.seatsTaken;
    seats2[idx] = !seats2[idx];
    if(seats2[idx]){
      newSeatsTaken++;
    }
    else{
      newSeatsTaken--;
    }
    let total = this.state.totalSales;
    total = newSeatsTaken * this.state.price;
    const section = this;
    let jsonData = { seatsTaken: newSeatsTaken, seatType: this.props.seatType, totalSales: total,  seats: seats2, idx};
    fetch('//localhost:3333/sections/' + this.state.sectionID + '/update',{
      method: 'post',
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then( function(r){ return r.json(); })
    .then( function(data){
      section.setState({ seatsTaken: newSeatsTaken, totalSales: total,  seats: seats2});
    });
  }

  render() {
    console.log('render');
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h2>Section Type: {this.state.sectionType}</h2>
            <h4>Price Per Seat: ${this.state.price}</h4>
            <h4>Total Sales: ${this.state.totalSales}</h4>
          </div>
        </div>
        {this.state.seats.map((seat, idx) => {
          if(seat){ return <button key={idx} className="btn" onClick={this.update.bind(this, idx)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/2000px-Disc_Plain_red.svg.png" style={{width:'20px'}, {height:'20px'} }></img></button> }
          else {
            return <button key={idx} className="btn btn-default" onClick={this.update.bind(this, idx)}><img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg" style={{width:'20px'}, {height:'20px'} }></img></button>
          }
        })

        }
      </div>
    );
  }

}

export default Section;
