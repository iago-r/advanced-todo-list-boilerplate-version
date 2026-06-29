import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Todos from './toDos/config';
import UserProfile from './userprofile/config';

const pages: Array<IRoute | null> = [
	...Todos.pagesRouterList, 
	...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...Todos.pagesMenuItemList, 
	...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
