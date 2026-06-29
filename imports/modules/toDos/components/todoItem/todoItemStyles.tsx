import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

interface ITodoItemStyles {
	ListItem: ElementType<ListItemProps>;
	ListItemText: ElementType<ListItemTextProps>;
	Checkbox: ElementType<CheckboxProps>;
}

const TodoItemStyle: ITodoItemStyles = {
	ListItem: styled(ListItem)(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		borderTop: `1px solid ${theme.palette.divider}`,
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&:hover': {
			backgroundColor: theme.palette.grey[100],
			cursor: 'pointer',
		},
	})),
	ListItemText: styled(ListItemText)(({ theme }) => ({
		'& .MuiListItemText-primary': {
			...theme.typography.body1,
			fontWeight: 'bold',
		},
		'& .MuiListItemText-secondary': {
			...theme.typography.body2,
		},
	})),
	Checkbox: styled(Checkbox)(({ theme }) => ({
		marginRight: theme.spacing(1),
	})),
};

export default TodoItemStyle;
