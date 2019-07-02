import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import ViewWrapper from './ViewWrapper';

import Defs from '../Defs';

const bgUrl = `${Defs.BASENAME}/assets/images/RS7743_DSC_1683-1.jpg`;

export default class ButtonMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: true
        }
    }

    componentDidMount() {
        this.inactiveNavigation = setTimeout(() => {
            this.props.history.push('/', { prev: true });
        }, 20000);
    }

    componentWillUnmount() {
        this.cancelInactiveNavigation();
    }

    cancelInactiveNavigation() {
        clearTimeout(this.inactiveNavigation);
    }

    onEntryClicked(e, path, swap=true, prev=false, triggersAnimation=false) {
        this.setState({ animate: triggersAnimation });
        if (triggersAnimation) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!path) console.error(`Pushing path "${path}" onto history...`);
        this.props.history.push(path, { swap, prev });
    }

    render() {
        let { menuEntries } = this.props;
        let rowInd = 0;

        return (
            <ViewWrapper bgStyle={{background: `url(${bgUrl})`, filter: 'grayscale(40%) blur(5px) brightness(0.5)'}} in={this.props.in}
                onExit={() => this.cancelInactiveNavigation()}>
                <ul style={{margin: '50px', marginTop: '20vh', padding: 0, listStyle: 'none'}}>
                    {/*<li className="menu-btn" style={{ height: '100px'}} />*/}
                { menuEntries.map(({
                    label, desc='', path,
                    fullWidth=false,
                    swap=true,
                    prev=false,
                    triggersAnimation=false,
                    icon='chevron-right',
                    backgroundColor, borderColor
                }) => {
                    let i = rowInd++;
                    return (
                        <CSSTransition appear={true} in={this.props.in} key={path} timeout={100 * i + 500} classNames="menu-btn">
                            <li className={`menu-btn ${fullWidth? 'full-width':''}`} tabIndex={i}>
                                <div className="contents" style={{backgroundColor, borderColor}}
                                    onClick={(e) => this.onEntryClicked(e, path, swap, prev, triggersAnimation)}>
                                    <h2 className="display-4">{label}</h2>
                                    <p className="lead mt-4">{ desc }</p>

                                <FontAwesomeIcon icon="chevron-right"
                                    style={{ position: 'absolute', right: 0, bottom: 0, margin: '30px' }}/>
                                </div>
                            </li>
                        </CSSTransition>
                    );
                })}
                </ul>
            </ViewWrapper>
        );
    }
}