import React, { Component } from 'react';
import ViewWrapper from './ViewWrapper'
import Defs from '../Defs';

const VARIANTS = [
	{
		backgroundColor: '#00918a', // lake
		logoPath: `${Defs.BASENAME}/assets/branding/YGK_rev_white_plum.png`,
		bgPath: `${Defs.BASENAME}/assets/images/RS2159_IMG_4704.jpg`,
	},
	{
		backgroundColor: '#cf4c27', // sunset
		logoPath: `${Defs.BASENAME}/assets/branding/YGK_rev_white_forest.png`,
		bgPath: `${Defs.BASENAME}/assets/images/RS9453_Copy-of-Open_TroyJohnson_1.jpg`,
	},
	{
		backgroundColor: '#5e1358', // plum
		logoPath: `${Defs.BASENAME}/assets/branding/YGK_rev_white_autumn.png`,
		bgPath: `${Defs.BASENAME}/assets/images/steam-5-1.jpg`,
	},
];

export default class Landing extends Component {
	componentDidMount() {
		let nextVariant = (this.props.variant + 1) % VARIANTS.length;
		let nextPage = `/${nextVariant > 0? nextVariant : ''}`;
		this.swapTimeout = setTimeout(
			() => this.props.history.push(nextPage, { swap: true }),
			5000);
	}

	componentWillUnmount() {
		clearTimeout(this.swapTimeout);
	}

	render() {
		let { backgroundColor, logoPath, bgPath } = VARIANTS[this.props.variant];
		return (
			<ViewWrapper backgroundColor={backgroundColor}>
				<div className="landing-wrapper"
					onClick={() => this.props.history.push('/menu')}>
					<img className="logo" src={logoPath} />
					<span className="call-to-action">Tap anywhere to {['explore', 'discover', 'learn about'][this.props.variant]} Kingston</span>
					<div className="content">
						<img className="background" src={bgPath} />
						<svg version="1.1" width="100%" height="100%"
							viewBox="0 0 200 200" preserveAspectRatio="xMaxYMin slice">
							<defs>
								<linearGradient id="opg" x1="50%" y1="0%" x2="50%" y2="85%">
									<stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
									<stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.5}} />
								</linearGradient>
							</defs>
							<mask id="wing-mask">
								<rect id="bg" x="0" y="0" width="200" height="200" fill="url(#opg)"/>
								<path id="wing" d="M0 351L268 0L368 0C268 250 268 350 168 350z" fill="black"
									transform="scale(0.6) translate(-50, 0)"/>
							</mask>

							<rect x={0} y={0} width="200" height="200"
								mask="url(#wing-mask)"
								fill={backgroundColor}/>
						</svg>

						<img className="cok-logo" src={`${Defs.BASENAME}/assets/city-of-kingston.png`} />
					</div>
				</div>
			</ViewWrapper>
		);
	}
}
