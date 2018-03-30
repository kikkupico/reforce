import React, { Component } from 'react';
import ReForce from './reforce'
import './App.css';

const N = 50
const nodes = [...Array(N).keys()].map(i=>{return{size:Math.round(Math.random()*100+5), x:0, y:0, id:i, color:`rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`}})
const links = []

nodes.forEach(node => {
	if(Math.random()>0.5) {
		links.push({source:Math.round(Math.random()*(N-1)), target:Math.round(Math.random()*(N-1))})
	}
})

class App extends Component {  
  render() {
    return (
      <ReForce 
      nodes={nodes}
      links={links}      
      />
    );
  }
}

export default App;
