import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import { TodosListControllerContext } from './todosListController';
import TodosListStyles from './todosListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { TodoAccordion } from '../../components/todoAccordion/todoAccordion';
import { TodoItem } from '../../components/todoItem/todoItem';

const pluralizar = (palavra: string, quantidade: number) =>
	quantidade === 1 ? palavra : `${palavra}s`;

const TodosListView = () => {
	const controller = useContext(TodosListControllerContext);
	const { user } = useContext<IAuthContext>(AuthContext);
	const [currentTab, setCurrentTab] = useState<'myTodos' | 'teamTodos'>('myTodos');
  const { Container, LoadingContainer, SearchContainer } = TodosListStyles;
 
	const todosList = controller.todoList.filter(t =>
		currentTab === 'myTodos'
			? t.createdby === user?._id
			: t.createdby !== user?._id
	);

	const accordions = [
		{
			key: 'notCompleted',
			titulo: 'Não Concluída',
			items: todosList.filter(t => !t.isCompleted)
		},
		{
			key: 'completed',
			titulo: 'Concluída',
			items: todosList.filter(t => t.isCompleted)
		},
	];

	return (
		<Container>
			<Box sx={{ width: '100%' }}>
				<Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)}>
					<Tab label='Minhas Tarefas' value='myTodos' />
					<Tab label='Tarefas do Time' value='teamTodos' />
				</Tabs>
			</Box>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Procurar tarefa(s)"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					{accordions.map(({ key, titulo, items }) => (
						<TodoAccordion
							key={key}
							titulo={`${pluralizar(titulo, items.length)} (${items.length})`}
							aberta={items.length !== 0}
							expandIcon={<SysIcon name={'expandMore'} />}
							conteudo={
								<List>
									{items.map((todo, index) => (
										<TodoItem
											key={todo._id}
											index={String(index)}
											content={todo}
											isOwner={todo.createdby === user?._id}
											onToggleComplete={() => controller.onToggleComplete(todo)}
											onDelete={() => controller.onDeleteButtonClick(todo)}
										/>
									))}
								</List>
							}
						/>
					))}
				</Box>
			)}
			<SysFab
				variant="extended"
				text="Adicionar Tarefa"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
        sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          right: 'auto'
        }}
			/>
		</Container>
	);
};
 
export default TodosListView;