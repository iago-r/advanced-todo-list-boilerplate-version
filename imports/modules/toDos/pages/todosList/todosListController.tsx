import React, { useCallback, useMemo } from 'react';
import TodosListView from './todosListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ITodos } from '../../api/todosSch';
import { todosApi } from '../../api/todosApi';

interface IInitialConfig {
  sortProperties: { field: string; sortAscending: boolean };
  filter: Object;
}

interface ITodosListControllerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (todo: ITodos) => void;
	onToggleComplete: (todo: ITodos) => void;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	todoList: ITodos[];
	loading: boolean;
}

export const TodosListControllerContext = React.createContext<ITodosListControllerContext>(
	{} as ITodosListControllerContext
);

const initialConfig: IInitialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
};

const TodosListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = { [sortProperties.field]: sortProperties.sortAscending ? 1 : -1 };

	const { loading, todoss } = useTracker(() => {
		const subHandle = todosApi.subscribe('todosList', filter, { sort });
		const todoss = subHandle?.ready() ? todosApi.find(filter, { sort }).fetch() : [];
		return {
			todoss,
			loading: !!subHandle && !subHandle.ready(),
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/todos/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((todo: ITodos) => {
		todosApi.remove(todo);
	}, []);

	const onToggleComplete = useCallback((todo: ITodos) => {
    const { authorName, ...docWithoutAuthorName } = todo as any;
    todosApi.update({ ...docWithoutAuthorName, isCompleted: !todo.isCompleted });
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, name: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const providerValues: ITodosListControllerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			onToggleComplete,
			onChangeTextField,
			todoList: todoss,
			loading,
		}),
		[todoss, loading]
	);

	return (
		<TodosListControllerContext.Provider value={providerValues}>
			<TodosListView />
		</TodosListControllerContext.Provider>
	);
};

export default TodosListController;