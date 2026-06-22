import TodosContainer from '../todosContainer';
import { Recurso } from './recursos';
import { IRoute } from '../../../modules/modulesTypings';

export const todosRouterList: (IRoute | null)[] = [
	{
		path: '/todos/:screenState/:todosId',
		component: TodosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_VIEW]
	},
	{
		path: '/todos/:screenState',
		component: TodosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_CREATE]
	},
	{
		path: '/todos',
		component: TodosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_VIEW]
	}
];
