import React, { Component } from 'react';
import ReForce from './reforce'
import './App.css';

class App extends Component {  
  state = {
    nodes:[],
    links:[]
  }

  componentDidMount() {
    this.randomizeData()
    this.interval = setInterval(this.randomizeData,10000)
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  randomizeData = () => {
    const N = 50
    let nodes = [...Array(N).keys()].map(i=>{return{size:Math.round(Math.random()*100+5), x:0, y:0, id:i, color:`rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`}})
    let links = []

    nodes.forEach(node => {
      if(Math.random()>0.5) {
        links.push({source:Math.round(Math.random()*(N-1)), target:Math.round(Math.random()*(N-1))})
      }
    })

    this.setState({nodes:nodes, links:links})
  }

  render() {
    return (
      <ReForce 
      nodes={this.state.nodes}
      links={this.state.links}
      />
    );
  }
}

export default App;
