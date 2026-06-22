import React, {MouseEventHandler} from 'react';
import TodoItemStyle from './todoItemStyles';
import IconButton from '@mui/material/IconButton';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

const {
  ListItem,
  ListItemText,
  Checkbox
} = TodoItemStyle;

interface ITodoItem {
	index: string;
	content: {
    name: string;
    description: string;
    authorName?: string;
    isCompleted: boolean;
  },
  onItemClick?: () => void;
  onToggleComplete?: () => void; 
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TodoItem: React.FC<ITodoItem> = ({
	index,
	content,
  onItemClick,
  onToggleComplete,
  onEdit,
	onDelete,
}) => {
	return (
    <ListItem key={index} onClick={onItemClick}>
      <Checkbox 
        checked={content.isCompleted}
        onClick={(event) => event.stopPropagation()} 
        onChange={() => onToggleComplete?.()}
      />
      <ListItemText
        primary={content.name}
        secondary={"Criada por " + (content.authorName ?? "Usuário Desconhecido")}
        sx={{
          textDecoration: content.isCompleted ? 'line-through' : 'none',
          opacity: content.isCompleted ? 0.6 : 1
        }}
      />
      <IconButton
        id={'basic-button'}
        onClick={(event) => {
          event.stopPropagation();
          onEdit?.();
        }}>
        <SysIcon name={'edit'} />
      </IconButton>
      <IconButton
        id={'basic-button'}
        onClick={(event) => {
          event.stopPropagation();
          onDelete?.();
        }}>
        <SysIcon name={'delete'} />
      </IconButton>
    </ListItem>
	);
};
