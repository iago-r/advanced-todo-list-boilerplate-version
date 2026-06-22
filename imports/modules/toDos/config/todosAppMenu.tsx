import React from 'react';
import { IAppMenu } from '../../../modules/modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const todosMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/todos',
		name: 'Lista de Tarefas',
		icon: <SysIcon name={'task'} />
	}
];
