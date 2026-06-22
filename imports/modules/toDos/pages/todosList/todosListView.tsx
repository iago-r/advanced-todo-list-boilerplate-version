import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import { TodosListControllerContext } from './todosListController';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import TodosListStyles from './todosListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { TodoAccordion } from '../../components/todoAccordion/todoAccordion';
import { TodoItem } from '../../components/todoItem/todoItem';

const pluralizar = (palavra: string, quantidade: number) =>
  quantidade === 1 ? palavra : `${palavra}s`;

const TodosListView = () => {
	const controller = useContext(TodosListControllerContext);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
  const { user } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = TodosListStyles;
  
  const [currentTab, setCurrentTab] = useState<'myTodos' | 'teamTodos'>('myTodos');
  
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
            <Tab label='Minhas Tarefas' value='myTodos'/>
            <Tab label='Tarefas do Time' value='teamTodos'/>
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
                      key={index}
                      index={String(index)}
                      content={todo}
                      onItemClick={() => navigate('/todos/view/' + todo._id)}
                      onToggleComplete={() => controller.onToggleComplete(todo)}
                      onEdit={() => navigate('/todos/edit/' + todo._id)}
                      onDelete={() => DeleteDialog({
                        showDialog: sysLayoutContext.showDialog,
                        closeDialog: sysLayoutContext.closeDialog,
                        title: `Excluir tarefa ${todo.name}`,
                        message: `Tem certeza que deseja excluir a tarefa "${todo.name}"?`,
                        onDeleteConfirm: () => {
                          controller.onDeleteButtonClick(todo);
                          sysLayoutContext.showNotification({
                            type: 'success',
                            message: 'Tarefa excluída com sucesso!'
                          });
                        }
                      })}
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
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default TodosListView;
