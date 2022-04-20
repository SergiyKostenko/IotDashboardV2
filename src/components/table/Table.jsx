import React from 'react';
import './table.css';

const Table = (props) => {
	return (
		<div>
			<div className='table-wrapper'>
				<table>
                    {
                    props.headData && props.renderHead ? (
<thead>
    <tr>
        {props.headData}
    </tr>
</thead>
                    ) : ''
                    }
                    </table>
			</div>
		</div>
	);
};

export default Table;
