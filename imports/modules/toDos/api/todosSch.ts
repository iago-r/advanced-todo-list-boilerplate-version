import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export const todosSch: ISchema<ITodos> = {
	name: {
		type: String,
		label: 'Nome da Tarefa',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição da Tarefa',
		defaultValue: '',
		optional: true
	},
  isPersonal: {
		type: Boolean,
		label: 'Pessoal',
		defaultValue: true,
		optional: false
	},
	isCompleted: {
		type: Boolean,
		label: 'Concluída',
		defaultValue: false,
		optional: true
	}
};

export interface ITodos extends IDoc {
	name: string;
	description: string;
	isPersonal: boolean;
	isCompleted: boolean;
  authorName?: string;
}
