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

		const self = this;

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
          isCompleted: 1
				}
			});
		});
	}

  async beforeInsert(docObj: ITodos, context: IContext) {
      docObj.isCompleted = false;
      return super.beforeInsert(docObj, context);
  }
}

export const todosServerApi = new TodosServerApi();
