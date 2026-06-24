import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyle';
import { HomeControllerContext } from './homeController';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import List from '@mui/material/List'
import { SysFab } from '../../../ui/components/sysFab/sysFab';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';

import { TodoItem } from '/imports/modules/toDos/components/todoItem/todoItem';

const Home: React.FC = () => {
  const { recentTodos, loading, onDeleteButtonClick, onToggleComplete, goToTodos } = useContext(HomeControllerContext);
  const { user } = useContext<IAuthContext>(AuthContext);
  const { Container, Header, Body } = HomeStyles;

	return (
		<Container>
      <Header>
				<Typography variant="h3">Olá, {user?.username}</Typography>
				<Typography variant="body1" textAlign={'justify'}>
          Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
			</Header>
      <Body>
    <Typography variant="h5">Adicionadas recentemente</Typography>
    {loading ? (
			<SysLoading size="large" label="Carregando..." />
    ) : recentTodos.length === 0 ? (
			<Typography variant="body2">Nenhuma tarefa adicionada recentemente.</Typography>
    ) : (
			<List sx={{ width: '100%' }}>
					{recentTodos.map((todo, index) => (
						<TodoItem
							key={todo._id}
							index={String(index)}
							content={todo}
							isOwner={todo.createdby === user?._id}
							onToggleComplete={() => onToggleComplete(todo)}
							onDelete={() => onDeleteButtonClick(todo)}
						/>
					))}
			</List>
    )}
</Body>
      <SysFab
				variant="extended"
				text="Ir para Tarefas"
				endIcon={<SysIcon name={'chevronRight'} />}
				fixed={true}
				onClick={goToTodos}
        sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          right: 'auto'
        }}
			/>
		</Container>
	);
};

export default Home;
