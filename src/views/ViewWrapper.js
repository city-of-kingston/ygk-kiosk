import React from 'react';
import { withRouter } from 'react-router';

const classNames = (cx) =>
  Object.entries(cx)
    .filter(([c, x]) => x)
    .map(([c, x]) => c)
    .join(' ');

const ViewWrapper = ({
  location: {
    state,
  },
  children,
  backgroundColor="#FFFFFF"
}) => {
  const cx = classNames({
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

export default withRouter(ViewWrapper);