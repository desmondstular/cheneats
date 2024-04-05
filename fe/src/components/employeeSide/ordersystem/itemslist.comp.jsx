/**
 * itemlist.comp.jsx
 *
 * Displays list of items for current order.
 */

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export const ItemList = ({ orders, active }) => {
	if (orders.length === 0) {
		return (<></>);
	}
	else {
		return (
			<div className="overflow-y-auto max-w-96">
				<List sx={{ width: '100%', maxWidth: 'fit' }}>
					{orders[active].items.map((obj, index) => (
						<React.Fragment key={index}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<Avatar alt="Menu Picture" src={!obj.menu_ref ? '' : obj.menu_ref.image} />
								</ListItemAvatar>
								<ListItemText
									primary={obj.menu_ref ? obj.menu_ref.name : "undefined"}
									secondary={
										<React.Fragment>
											<Typography
												sx={{ display: 'inline' }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												Quantity:
											</Typography>
											{' ' + obj.quantity}
										</React.Fragment>
									}
								/>
							</ListItem>
							{index < orders[0].items.length - 1 && <Divider variant="inset" component="li" />}
						</React.Fragment>
						))}

				</List>
			</div>
		)
	}
}
