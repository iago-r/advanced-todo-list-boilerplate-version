import React, { useCallback } from 'react';
import Home from './home';
import { useTracker } from 'meteor/react-meteor-data';
import { todosApi } from '/imports/modules/toDos/api/todosApi';
import { ITodos } from '/imports/modules/toDos/api/todosSch';
import { useNavigate } from 'react-router-dom';

interface IHomeControllerContext {
	recentTodos: ITodos[];
	loading: boolean;
	onDeleteButtonClick: (todo: ITodos) => void;
	onToggleComplete: (todo: ITodos) => void;
	goToTodos: () => void;
}

export const HomeControllerContext = React.createContext<IHomeControllerContext>(
	{} as IHomeControllerContext
);

const HomeController = () => {
	const navigate = useNavigate();

	const { loading, recentTodos } = useTracker(() => {
		const subHandle = todosApi.subscribe('todosRecentList');
		const recentTodos = subHandle?.ready() 
			? todosApi.find({}, { sort: { lastupdate: -1 }, limit: 5 }).fetch()
			: [];

		return {
			recentTodos,
			loading: !!subHandle && !subHandle.ready(),
		};
	}, []);

	const onDeleteButtonClick = useCallback((todo: ITodos) => {
		todosApi.remove(todo);
	}, []);

	const onToggleComplete = useCallback((todo: ITodos) => {
		const { authorName, ...todoWithoutAuthorName } = todo as any;
		todosApi.update({ ...todoWithoutAuthorName, isCompleted: !todo.isCompleted });
	}, []);

	const goToTodos = useCallback(() => {
		navigate('/todos');
	}, []);

	const providerValues: IHomeControllerContext = {
		recentTodos,
		loading,
		onDeleteButtonClick,
		onToggleComplete,
		goToTodos,
	};

	return (
		<HomeControllerContext.Provider value={providerValues}>
			<Home />
		</HomeControllerContext.Provider>
	);
};

export default HomeController;