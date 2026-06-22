import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Todos from './toDos/config';
import Example from './example/config';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';

const pages: Array<IRoute | null> = [
	...Todos.pagesRouterList, 
	...Example.pagesRouterList, 
	...Aniversario.pagesRouterList, 
	...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...Todos.pagesMenuItemList, 
	...Example.pagesMenuItemList, 
	...Aniversario.pagesMenuItemList,
	...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
