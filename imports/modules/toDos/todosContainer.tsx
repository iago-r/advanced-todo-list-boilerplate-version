import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import TodosListController from '../../modules/toDos/pages/todosList/todosListController';
import TodosDetailController from '../../modules/toDos/pages/todosDetail/todosDetailController';

export interface ITodosModuleContext {
	state?: string;
	id?: string;
}

export const TodosModuleContext = React.createContext<ITodosModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, todosId } = useParams();
	const state = screenState ?? props.screenState;
	const id = todosId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <TodosListController />;
		return <TodosDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <TodosModuleContext.Provider value={providerValue}>{renderPage()}</TodosModuleContext.Provider>;
};
