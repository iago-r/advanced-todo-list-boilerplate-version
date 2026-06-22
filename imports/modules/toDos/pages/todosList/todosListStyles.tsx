import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '../../../../ui/materialui/styles';
import { SysSectionPaddingXY } from '../../../../ui/layoutComponents/sysLayoutComponents';

import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';


interface ITodosListStyles {
	Container: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	SearchContainer: ElementType<BoxProps>;
  ListItem: ElementType<ListItemProps>;
  ListItemText: ElementType<ListItemTextProps>;
}

const TodosListStyles: ITodosListStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.contentFabDistance
	})),
	LoadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2)
	})),
	SearchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	})),
	ListItem: styled(ListItem)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      cursor: 'pointer',
    },
  })),
	ListItemText: styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
      ...theme.typography.h6,
      fontWeight: 'bold',
    },
    '& .MuiListItemText-secondary': {
      ...theme.typography.body2,
      fontStyle: 'italic',
    },
  })),
};

export default TodosListStyles;
