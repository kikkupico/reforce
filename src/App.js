import React, { Component } from 'react';
import ReForce from './reforce'
import './App.css';

const N = 100
const nodes = [...Array(N).keys()].map(i=>{return{r:Math.round(Math.random()*20)+3, x:0, y:0, id:i, color:`rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`}})
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
      linkComponent={<CurvedLink />}
      />
    );
  }
}

const CurvedLink = props => <path d={positionLink(props.link)} stroke="#333" strokeWidth="0.5" fill="transparent"/>

function positionLink(d) {
        var offset = 25;

        var midpoint_x = (d.source.x + d.target.x) / 2;
        var midpoint_y = (d.source.y + d.target.y) / 2;

        var dx = (d.target.x - d.source.x);
        var dy = (d.target.y - d.source.y);

        var normalise = Math.sqrt((dx * dx) + (dy * dy));

        var offSetX = midpoint_x + offset*(dy/normalise);
        var offSetY = midpoint_y - offset*(dx/normalise);

        return "M" + d.source.x + "," + d.source.y +
            "S" + offSetX + "," + offSetY +
            " " + d.target.x + "," + d.target.y;
    }

export default App;
