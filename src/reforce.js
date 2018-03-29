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

const DefaultNodeComponent = props => <div style={{ backgroundColor:props.node.color, borderRadius: '50%', width: `${props.node.r*2}px`, height: `${props.node.r*2}px`}} />

export default class ReForce extends React.Component {
    state = {
        nodes: [],
        links: [],
    }

    componentWillMount() {    	
        this.setState({ nodes: this.props.nodes, links: this.props.links }, () => {        
            this.force = d3.forceSimulation(this.state.nodes)
                .force("charge",
                    d3.forceManyBody()
                    .strength(this.props.forceStrength)
                )
                .force("link",
                    d3.forceLink().distance(this.props.linkDistance).links(this.state.links)
                )
                .force("x", d3.forceX(this.props.width / 2))
                .force("y", d3.forceY(this.props.height / 2));


            this.force.on('tick', () => this.setState({
                links: this.state.links,
                nodes: this.state.nodes
            }))
        })
    }

    render() {
    	return (
      <div style={{position:"relative", width:`${this.props.width}px`, height:`${this.props.height}px`, overflow:"hidden"}}>
      <svg width={`${this.props.width}px`} height={`${this.props.height}px`} style={{position:"absolute"}}>
      {this.state.links.map((link, index) =>
        {
          if(this.props.linkComponent) {
            let newLinkComponent = Object.assign({}, this.props.linkComponent)
            newLinkComponent.props = {link:link, key:`link-index`, ...this.props.linkComponent.props}          
            return newLinkComponent
          }
          else return <DefaultLinkComponent link={link} key={`link-index`} />
        }
            )
      }
      </svg>
      <div style={{position:"absolute"}}>      
      {
        this.state.nodes.map((node, index) => {
          if(this.props.nodeComponent) {
            let newNodeComponent = Object.assign({}, this.props.nodeComponent)
            newNodeComponent.props = {node:node, key:index, ...this.props.nodeComponent.props}          
            return <div style={{ position:'absolute', top:node.y-node.r, left:node.x-node.r}}>{newNodeComponent}</div>
          }
          else return <div style={{ position:'absolute', top:node.y-node.r, left:node.x-node.r}}><DefaultNodeComponent node={node} key={index} /></div>
        })
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
