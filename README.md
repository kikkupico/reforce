ReForce
=============
Network and hierarchy diagrams for React using d3-force.

[![reforce sample](https://github.com/vramakin/reforce/blob/dev/sample.PNG?raw=true "reforce sample")](https://github.com/vramakin/reforce/blob/dev/sample.PNG?raw=true "reforce sample")

```js
npm install --save reforce
```

## Basic Usage

ReForce renders network diagrams from arrays of nodes and links. Each node is an object with a couple of mandatory parameters - id and size. Each link is a object with two mandatory parameters - source and target. The link source and target reference the id of the nodes. The size parameter of the node is used for collision detection and node position calculation.

```js
import React from 'react';
import ReForce from 'reforce'

class NetworkGraph extends React.Component {
	state = {
		nodes:[{id:1, size:10}], {id:2, size:10}, {id:3, size:10}]],
		links:[{source:1, target:2}]
	}

	render() {
		return <ReForce nodes={this.state.nodes} links={this.state.links} />
	}
}

```
## Customization

The node and link components can be customized. Any HTML element or any React component rendering a HTML element can be used as a node. Any SVG element or any React component rendering an SVG element can be used as a link, though it makes sense to use line or arc elements for links. 

Note that while custom node elements are positioned automatically, you are expected to manually position link elements. For providing complete control over the rendering of custom components, ReForce injects node/link data as a prop into your custom component.

```js
import React from 'react';
import ReForce from 'reforce'

class FancyNetworkGraph extends React.Component {
	state = {
		nodes:[{id:1, size:10}], {id:2, size:10}, {id:3, size:10}]],
		links:[{source:1, target:2}]
	}

	render() {
		return <ReForce nodes={this.state.nodes} links={this.state.links} nodeComponent={<FancyNodeElement />} linkComponent={<FancyLinkElement />} />
	}
}

const FancyNodeElement = props => {
	return props.node.size < 5 ? <SmallNode />:<BigNode />
}

```

## License

MIT