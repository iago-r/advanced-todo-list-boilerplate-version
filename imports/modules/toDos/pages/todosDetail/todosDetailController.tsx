import React, { createContext, useCallback, useContext } from 'react';
import TodosDetailView from './todosDetailView';
import { useNavigate } from 'react-router-dom';
import { TodosModuleContext } from '../../todosContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { todosApi } from '../../api/todosApi';
import { ITodos } from '../../api/todosSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext from '/imports/app/authProvider/authContext';

interface ITodosDetailControllerContext {
	closePage: () => void;
	document: ITodos;
	loading: boolean;
	schema: ISchema<ITodos>;
	onSubmit: (doc: ITodos) => void;
	changeToEdit: (id: string) => void;
  isOwner: boolean;
}

export const TodosDetailControllerContext = createContext<ITodosDetailControllerContext>(
	{} as ITodosDetailControllerContext
);

const TodosDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(TodosModuleContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
  const { user } = useContext(AuthContext);

	const { document, loading, isOwner } = useTracker(() => {
		const subHandle = !!id ? todosApi.subscribe('todosDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? todosApi.findOne({ _id: id }) : {};
		return {
			document: (document as ITodos) ?? ({ _id: id } as ITodos),
			loading: !!subHandle && !subHandle?.ready(),
      isOwner: (document as ITodos)?.createdby === user?._id
		};
	}, [id, user?._id]);

  console.log('isOwner:', isOwner, 'document.createdby:', document?.createdby, 'user._id:', user?._id);

	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/todos/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: ITodos) => {
    const { authorName, ...docWithoutAuthorName } = doc as any;
		const selectedAction = state === 'create' ? 'insert' : 'update';
		todosApi[selectedAction](docWithoutAuthorName, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `A tarefa foi ${selectedAction === 'update' ? 'atualizada' : 'cadastrada'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	return (
		<TodosDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: todosApi.getSchema(),
				onSubmit,
				changeToEdit,
        isOwner
			}}>
		  <TodosDetailView />
		</TodosDetailControllerContext.Provider>
	);
};

export default TodosDetailController;