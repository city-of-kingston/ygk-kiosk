import React, { Component } from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import ViewWrapper from './ViewWrapper';
import RippleButton from '../components/RippleButton';

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
        }, 10000);
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
            <ViewWrapper backgroundColor="#4c4c4e" in={this.props.in}
                onExit={() => this.cancelInactiveNavigation()}>
                <Row style={{margin: '40px'}}>
                { menuEntries.map(({
                    label, path,
                    swap=true,
                    prev=false,
                    triggersAnimation=false,
                    icon='chevron-right',
                    buttonStyle={ backgroundColor: '#ffffff' },
                    labelStyle={},
                    iconStyle={}
                }) => {
                    let i = rowInd++;
                    return (
                        <CSSTransition appear={true} in={this.props.in} key={path} timeout={250 * i} classNames="menu-col">
                            <Col className="menu-col" md={6}
                                onClick={(e) => this.onEntryClicked(e, path, swap, prev, triggersAnimation)}>
                                <RippleButton><div className="contents">
                                    <h1 className="display-1" style={labelStyle}>{ label }</h1>
                                    {/*<FontAwesomeIcon icon={icon} style={iconStyle} className="h1 display-1 ml-auto"/>*/}
                                </div></RippleButton>
                            </Col>
                        </CSSTransition>
                    );
                })}
                </Row>
            </ViewWrapper>
        );
    }
}