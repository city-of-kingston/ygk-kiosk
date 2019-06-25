import React from 'react';
import {
	Row
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ViewWrapper from './ViewWrapper';

const Menu = ({ menuEntries }) => (
	<ViewWrapper>
		{ menuEntries.map(({ label }) => (
			<Row className="menu-row align-items-center"
				onClick={() => alert(label)}>
				<h1 className="display-1">{ label }</h1>
				<FontAwesomeIcon icon="chevron-right" className="h1 display-1 ml-auto"/>
			</Row>
		))}
	</ViewWrapper>
)

export default Menu;