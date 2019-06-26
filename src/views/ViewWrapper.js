import React, { Component } from 'react';
import { withRouter } from 'react-router';

const classNames = (cx) =>
  Object.entries(cx)
    .filter(([c, x]) => x)
    .map(([c, x]) => c)
    .join(' ');

class ViewWrapper extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.in && !this.props.in) {
      let { onExit=()=>{} } = this.props;
      onExit();
    }
  }

  render() {
    let {
      location: {
        state,
      },
      children,
      backgroundColor="#FFFFFF"
    } = this.props;

    let cx = classNames({
      page: true,
      'page--prev': state && state.prev,
      'page--swap': state && state.swap,
    });

    return (
      <section className={cx}
        style={{ backgroundColor }}>
        <div className="page__inner">
          {children}
        </div>
      </section>
    );
  }
}

export default withRouter(ViewWrapper);