import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import ViewWrapper from './ViewWrapper'

export default class Dashboard extends Component {
	componentDidMount() {
		this.navigationTimeout = setTimeout(
			() => this.props.history.push('/', { prev: true }),
			30000);
	}

	componentWillUnmount() {
		clearTimeout(this.navigationTimeout);
	}

	render() {
		return (
			<ViewWrapper>
				<Link className="main-button" to={{
					pathname: "/kingstonairport",
					// state: { prev: true }
				}}>YGK Airport Site</Link>
				<Link className="main-button" to={{
					pathname: "/possiblemadehere",
					// state: { prev: true }
				}}>Possible Made Here</Link>
				<Link className="main-button" to={{
					pathname: "/seontario",
					// state: { prev: true }
				}}>South Eastern Ontario</Link>
			</ViewWrapper>
		);
	}
}
