

import React, { Component } from "react"

class Home extends Component {
  state = {
    data: [],
    launchYear: [],
    baseURL: 'https://api.spaceXdata.com/v3/launches?limit=100',
    selectrdYear: null,
    isLaunch: false,
    isLanding: false,
    isLoading: true,
    isError: false,
    isActive:false
  }

  componentWillMount() {
    this.getInitialData()
  }
  // initil api call for getting ID and data
  getInitialData = () => {
    const { baseURL } = this.state;
    let url = baseURL;
    let newYear = [];
    this.setState({ isError: false })
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json, isLoading: false, })
        for (var i = 0; i < json.length; i++) {
          // Extracting and removing duplicate id for filter 
          if (json[i + 1] !== undefined && json[i].launch_year !== json[i + 1].launch_year) {
            newYear.push(json[i])
          }
          // setting last id 
          if (i === json.length - 1) {
            newYear.push(json[i])
          }
        }     // pushinf id array 
        this.setState({ launchYear: newYear })
      }).catch((error) => {
        this.setState({ isError: true, isLoading: false })
        console.log('error', error)
      })
  }
  // call's when user select year
  yearHandler = (year, event) => {
    this.toggleClass(event)
    this.setState({ selectrdYear: year, isLoading: true }, () => {
      this.getDataFormApi();
    })

  }
  // Active class
  toggleClass(event){
    let el = document.getElementsByClassName("true-data");
    for(let i=0; i <el.length; i++){
      el[i].classList.remove("active")
    }
    event.currentTarget.classList.add('active')
  }
  // call's when user selects successful Launch
  successfulLaunch = (selectedLaunch, event) => {
    
    this.setState({ isLaunch: selectedLaunch, isLoading: true, isActive:true }, () => {
      this.getDataFormApi();
    })
  }
  // call's when user selects successful Landing
  successfulLanding = (isLanding, event) => {
  
    this.setState({ isLanding: isLanding, isLoading: true, isActive:true }, () => {
      this.getDataFormApi();
    })
  }
  resetFilter = () => {
    this.setState({ isLaunch: false, selectrdYear: null, isLanding: false }, () => {
      this.getDataFormApi();
    })
  }
  // Api call
  getDataFormApi = () => {
    this.setState({ isError: false })
    let { isLaunch, selectrdYear, isLanding, baseURL } = this.state;
    let url = '';
    if (selectrdYear !== null && isLaunch === true && isLanding === true) {
      url = `${baseURL}&launch_success=true&land_success=true&launch_year=${selectrdYear}`
    } else if (selectrdYear !== null && isLanding === true) {
      url = `${baseURL}&land_success=true&launch_year=${selectrdYear}`
    } else if (selectrdYear !== null && isLaunch === true) {
      url = `${baseURL}&launch_success=true&launch_year=${selectrdYear}`
    } else if (selectrdYear !== null) {
      url = `${baseURL}&launch_year=${selectrdYear}`
    }
    else {
      url = `${baseURL}`
    }
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoading: false,
          isError: false,
          data: json
        })
      })
      .catch((error) => {
        this.setState({ isError: true, isLoading: false })
        console.log('error', error)
      })

  }

  render() {
    const { data, launchYear, isLoading, isError, isActive } = this.state;

    return (
      <div className="container-fluid service-container">

        
            <div className="assiment-api">
              <h3>SpaceX Launch Programs</h3>
              <div className="row m-2">
                <div className="col-sm-2 col-md-2 col-xl-2 lunch-year">
                  <h5>Filter</h5>
                  <button className="reset-button" onClick={this.resetFilter}>Reset filter</button>
                  <p className="launch-year-text text-center">Launch Year</p>
                  {
                    launchYear && launchYear.length > 0 ? launchYear.map((item, index) => {
                      return (
                        <div  className={"true-data"}  key={index} onClick={(event) => this.yearHandler(item.launch_year, event)}>
                           {item.launch_year} 
                        </div>
                      )
                    }) : null
                  }

                  <div className="launch-year-text text-center">
                    
                    <button className={ "true-data"}  onClick={(event) => this.successfulLaunch(true, event)}>True </button>   <button className="true-data" onClick={(event) => this.successfulLaunch(false, event)}> False</button>
                  </div>

                  <div className="launch-year-text text-center">
                    <h5> Successful Landing </h5>
                    <button className={ "true-data"} onClick={(event) => this.successfulLanding(true, event)}>True </button>   <button className="true-data" onClick={(event) => this.successfulLanding(false, event)}> False</button>
                  </div>
                </div>
                {isError ? <div style={{ textAlign: "center", fontSize: "20px", position: "absolute", top: "300px", left: 0, right: 0 }}>Error in loading data please reload the page</div>

                : isLoading ?

                  <div style={{ textAlign: "center", fontSize: "20px", position: "absolute", top: "300px", left: 0, right: 0 }}>Loading...</div>
                  :


                  
                <div className="col-sm-12 col-md-10 col-xl-10 launch-data">
                  {
                    
                    data && data.length && data.map((item, index) => {
                      return (
                        <div className="api-item" key={item.mission_id + index}>
                          <p><img src={item.links.mission_patch} /></p>
                          <p>{item.mission_name} # {item.flight_number}</p>
                          <p><strong>Mission Ids:</strong> {item.mission_id}</p>
                          <p><strong>Lunch Year :</strong>{item.launch_year} </p>
                          <p><strong>Sucessful Lanch :</strong>{item.launch_success ? 'True' : 'False'} </p>
                          <p><strong>Sucessful Landing :</strong>{item.mission_name} </p>
                        </div>
                      )
                    })
                    
                  }
                </div>               

                }
              </div>
            </div>
        
      </div>
    )
  }
}

export default Home;
