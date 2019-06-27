import React, { Component } from 'react';

import '../css/ripple-btn.scss';
 
export default class RippleButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false,
            xPos: 0,
            yPos: 0,
        }
    }

    // onClick(e) {
    //     var parent = React.findDOMNode(this);
    //     var ripple = React.findDOMNode(this.refs.ripple);
    //     parent.classList.remove("btn-animate");
    //     let d = Math.max(parent.offsetWidth, parent.offsetHeight);
    //     ripple.style.height = d + "px";
    //     ripple.style.width = d + "px";
        
    //     let x = e.pageX - parent.offsetLeft - d/2;
    //     let y = e.pageY - parent.offsetTop - d/2;
    //     ripple.style.left = x + "px";
    //     ripple.style.top = y + "px";
    //     parent.classList.add("btn-animate");
    //     console.log("Right here?")
    // }

    onClick(e) {
        let btnEl = e.nativeEvent.target.closest('.ripple-button');
        let rect = btnEl.getBoundingClientRect();
        let xPos=0, yPos=0;
        
        if (e.nativeEvent.target === btnEl) {
            xPos = e.nativeEvent.offsetX;
            yPos = e.nativeEvent.offsetY;
        } else {
            xPos = e.nativeEvent.x - rect.left;
            yPos = e.nativeEvent.y - rect.top;
        }
        // do it twice to get 2 renders
        // for some reason it won't do it automatically
        this.setState({ pressed: false }, () => {
            setTimeout(() => this.setState({
                pressed: true,
                xPos,
                yPos,
            }), 10)
        })
        e.stopPropagation();
        e.preventDefault();

        if (typeof this.props.onClick === 'function') this.props.onClick(e);
    }

    render() {
        let { className='' } = this.props;
        return (
            <div onClick={this.onClick.bind(this)}
                    className={`ripple-button ${className} ${this.state.pressed? 'btn-animate' : ''}`}>
                {this.props.children}
                <div className="ripple" style={{left: this.state.xPos, top: this.state.yPos}} />
            </div>
        );
    }
}