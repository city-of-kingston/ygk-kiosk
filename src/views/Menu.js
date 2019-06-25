import React, { Component } from 'react';
import {
	Row
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import ViewWrapper from './ViewWrapper';

export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			entryIn: new Array(this.props.menuEntries.length)
		};
	}

	componentDidMount() {
		for (let i = 0; i < this.props.menuEntries.length; i++) {
			setTimeout(() => {
				let entryIn = [...this.state.entryIn];
				entryIn[i] = true;
				this.setState({ entryIn });
			}, 0);
		}
	}

	onEntryClicked(path, swap=true) {
		if (!path) console.error(`Pushing path "${path}" onto history...`);
		this.props.history.push(path, { swap });
	}

	render() {
		let { menuEntries } = this.props;
		let rowInd = 0;

		return (
			<ViewWrapper backgroundColor="#4c4c4e">
				{ menuEntries.map(({
					label, path,
					swap=true,
					icon='chevron-right',
					buttonStyle={ backgroundColor: '#ffffff' },
					labelStyle={},
					iconStyle={}
				}) => {
					let i = rowInd++;
					return (
						<CSSTransition appear={true} in={true} key={path} timeout={200} classNames="menu-row">
							<Row className="menu-row align-items-center"
								style={{ zIndex: 100 - i, top: `calc(40vh * ${i+1})`, ...buttonStyle }}
								onClick={() => this.onEntryClicked(path, swap)}>
								<h1 className="display-1" style={labelStyle}>{ label }</h1>
								<FontAwesomeIcon icon={icon} style={iconStyle} className="h1 display-1 ml-auto"/>
							</Row>
						</CSSTransition>
					);
				})}
			</ViewWrapper>
		);
	}
}