import * as d3 from 'd3-force'
import React from 'react'

const DefaultLinkComponent = props => <line
            x1={props.link.source.x}
            y1={props.link.source.y}
            x2={props.link.target.x}
            y2={props.link.target.y}            
            stroke="#333"            
            strokeWidth="0.5"
            />

const DefaultNodeComponent = props => <div style={{ backgroundColor:props.node.color, borderRadius: '50%', width: `${props.node.size}px`, height: `${props.node.size}px`}} />

const ReForceWrapper = props => <ReForce {...props} timestamp={Date.now()} />

class ReForce extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        nodes: [],
        links: [],
      }

      this.startSimulation = (nodes, links) => {
      
      this.simulation && this.simulation.stop();

      this.setState({ nodes: nodes, links: links }, () => {        
            this.simulation = d3.forceSimulation(this.state.nodes)
                .force("charge",
                    d3.forceManyBody()
                    .strength(this.props.forceStrength)
                )
                .force("link",
                    d3.forceLink().distance(this.props.linkDistance).links(this.state.links)
                )
                .force("x", d3.forceX(this.props.width / 2))
                .force("y", d3.forceY(this.props.height / 2))
                .force('collision', d3.forceCollide().radius(node => node.size/2)
                  );

            this.simulation.on('tick', () => this.setState({
                links: this.state.links,
                nodes: this.state.nodes
            }))
        })
      }
    }

    componentDidMount() {
      this.startSimulation(this.props.nodes, this.props.links)
    }

    componentDidUpdate (prevProps, prevState) {
      if(prevProps.timestamp !== this.props.timestamp)
        this.startSimulation(this.props.nodes, this.props.links)      
    }

    componentWillUnmount() {
      this.simulation && this.simulation.stop();
    }    

    render() {
      return (
      <div style={{position:"relative", width:`${this.props.width}px`, height:`${this.props.height}px`, overflow:"hidden"}}>
      <svg width={`${this.props.width}px`} height={`${this.props.height}px`} style={{position:"absolute"}}>
      {this.state.links.map((link, index) =>
        React.cloneElement(this.props.linkComponent ? this.props.linkComponent:<DefaultLinkComponent />, {link:link, key:`link-${index}`})        
        )
      }
      </svg>
      <div style={{position:"absolute"}}>      
      {
        this.state.nodes.map((node, index) => 
          <div style={{ position:'absolute', top:node.y-node.size/2, left:node.x-node.size/2}} key={index}>
          {            
            React.cloneElement(this.props.nodeComponent?this.props.nodeComponent:<DefaultNodeComponent />, {node:node})
          }
          </div>
        )
      }      
      </div>
      </div>
    )
    }
}

ReForce.defaultProps = {
  width: 1300,
  height: 800,
  linkDistance: 70,
  forceStrength: -300
};

export default ReForceWrapper