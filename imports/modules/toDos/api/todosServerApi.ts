import { Meteor } from 'meteor/meteor';
import { Recurso } from '../config/recursos';
import { todosSch, ITodos } from './todosSch';
import { getUserServer, userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IContext } from '../../../typings/IContext';

class TodosServerApi extends ProductServerBase<ITodos> {
	constructor() {
		super('todos', todosSch, {
			resources: Recurso
		});

		this.addTransformedPublication(
			'todosList',
			async (filter = {}) => {
				const user = await getUserServer(); // TODO: verificar a necessidade de async/await, porque não retorna uma promise de interface

				const visibilityFilter = {
					$or: [
						{ isPersonal: { $ne: true } },
						{ isPersonal: true, createdby: user._id }
					]
				};

				return this.defaultListCollectionPublication(
					{ 
						...filter, 
						...visibilityFilter 
					}, 
					{
						projection: { 
							name: 1,
							description: 1,
							isPersonal: 1,
							isCompleted: 1,
							createdat: 1,
							createdby: 1
						}
					}
				);
			},
			async (doc: ITodos & { authorName: string }) => {
				const userProfileDoc = await userprofileServerApi
					.getCollectionInstance()
					.findOneAsync({ _id: doc.createdby });
					
				return { 
					...doc,
					authorName: userProfileDoc?.username
				};
			}
		);

		this.addPublication('todosDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {         
					name: 1,
					description: 1,
					isPersonal: 1,
					isCompleted: 1,
          createdby: 1
				}
			});
		});
	}

	async beforeInsert(docObj: ITodos, context: IContext) {
		docObj.isCompleted = false;
		return super.beforeInsert(docObj, context);
	}

	async beforeUpdate(docObj: Partial<ITodos>, context: IContext) {
		const existing = await this
			.getCollectionInstance()
			.findOneAsync({ _id: docObj._id });

		if (existing.createdby !== context.user._id) {
			throw new Meteor.Error('Acesso negado', 'Você só pode alterar tarefas que você criou.');
		}

		return super.beforeUpdate(docObj, context);
	}

	async beforeRemove(docObj: Partial<ITodos>, context: IContext) {
		const existing = await this
			.getCollectionInstance()
			.findOneAsync({ _id: docObj._id });

		if (existing.createdby !== context.user._id) {
			throw new Meteor.Error('Acesso negado', 'Você só pode remover tarefas que você criou.');
		}

		return super.beforeRemove(docObj, context);
	}

}

export const todosServerApi = new TodosServerApi();
