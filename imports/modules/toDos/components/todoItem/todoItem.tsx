import React, { useContext } from 'react';
import TodoItemStyle from './todoItemStyles';
import IconButton from '@mui/material/IconButton';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { ITodos } from '../../api/todosSch';

const {
	ListItem,
	ListItemText,
	Checkbox
} = TodoItemStyle;

interface ITodoItem {
	index: string;
	isOwner: boolean;
	content: ITodos;
	onToggleComplete?: () => void;
	onDelete?: () => void;
}

export const TodoItem: React.FC<ITodoItem> = ({
	index,
	isOwner,
	content,
	onToggleComplete,
	onDelete,
}) => {
	const { showDialog, closeDialog, showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
  const navigate = useNavigate();

	return (
		<ListItem 
      key={index} 
      onClick={() => navigate('/todos/view/' + content._id)}
      >
			<Checkbox
				checked={content.isCompleted}
				disabled={!isOwner}
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
				id={'edit-button'}
				disabled={!isOwner}
				onClick={(event) => {
					event.stopPropagation();
					navigate('/todos/edit/' + content._id)
				}}>
				<SysIcon name={'edit'} />
			</IconButton>
			<IconButton
				id={'delete-button'}
				disabled={!isOwner}
				onClick={(event) => {
					event.stopPropagation();
					DeleteDialog({
						showDialog,
						closeDialog,
						title: `Excluir tarefa ${content.name}`,
						message: `Tem certeza que deseja excluir a tarefa "${content.name}"?`,
						onDeleteConfirm: () => {
							onDelete?.();
							showNotification({
								type: 'success',
								message: 'Tarefa excluída com sucesso!'
							});
						}
					});
				}}>
				<SysIcon name={'delete'} />
			</IconButton>
		</ListItem>
	);
};