import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ViewWrapper from './ViewWrapper';
import Defs from '../Defs';

class InactivityModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			secondsRemaining: 10
		}
	}

	componentDidMount() {
		this.timerInterval = setInterval(() => {
			let secondsRemaining = this.state.secondsRemaining - 1;
			if (secondsRemaining < 0) {
				this.props.onInactivityCallback(true);
			} else {
				this.setState({ secondsRemaining });
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerInterval);
	}

	render() {
		return (
			<div className="inactivity-modal">
				<div>
					<h1>Are you still there?</h1>
					<p>Returning to the homepage in {this.state.secondsRemaining} seconds</p>
					<hr/>
					<Button size="lg" color="primary"
						onClick={() => this.props.onInactivityCallback(false)}>
						I'm Still Here
					</Button>
					<Button size="lg" color="secondary" className="ml-3"
						onClick={() => this.props.onInactivityCallback(true)}>
						<FontAwesomeIcon icon="home" className="mr-2" /> Home
					</Button>
				</div>
			</div>
		)
	}
}

export default class WebView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInactivityModal: false
		}
	}

	componentDidMount() {
		this.startInactivityTimer();
	}

	startInactivityTimer() {
		this.inactivityTimer = setTimeout(
			this.showInactivityModal.bind(this),
			90000);
	}

	componentWillUnmount() {
		clearTimeout(this.inactivityTimer);
	}

	showInactivityModal() {
		this.setState({ showInactivityModal: true });
	}

	onInactivityCallback(inactive) {
		if (inactive) {
			this.props.history.push('/', { prev: true });
		} else {
			this.setState({ showInactivityModal: false });
			this.startInactivityTimer();
		}
	}

	render() {
		return (
			<ViewWrapper>
				{ this.state.showInactivityModal?
					<InactivityModal onInactivityCallback={this.onInactivityCallback.bind(this)} /> : null }
				<div className="webview-header">
					<Link to={{ pathname: '/', state: { prev: true } }}>
						<FontAwesomeIcon icon="home" />
					</Link>
					<img className="logo ml-4" src={`${Defs.BASENAME}/assets/branding/YGK_rev_white.png`}
						alt="YGK Logo" />
				</div>
				<iframe className="webview-iframe" src={this.props.url} title={this.props.title} />
			</ViewWrapper>
		);
	}
}
