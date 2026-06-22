import React, { useContext } from 'react';
import { TodosDetailControllerContext } from './todosDetailController';
import { TodosModuleContext } from '../../todosContainer';
import TodosDetailStyles from './todosDetailStyles';
import SysForm from '../../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysSwitch from '../../../../ui/components/sysFormFields/sysSwitch/sysSwitch';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

const TodosDetailView = () => {
	const controller = useContext(TodosDetailControllerContext);
	const { state } = useContext(TodosModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn } = TodosDetailStyles;

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Tarefa' : isEdit ? 'Editar Tarefa' : controller.document.name}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						<SysTextField name="name" placeholder="Ex.: Tarefa XX" />
						<SysTextField
							name="description"
							placeholder="Acrescente informações sobre a tarefa (5 linhas)"
							multiline
							rows={5}
							showNumberCharactersTyped
							max={600}
						/>
            <SysSwitch name="isPersonal" />
          </FormColumn>
				</Body>
				<Footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default TodosDetailView;

// import { SysLoading } from '../../../../ui/components/sysLoading/sysLoading';

// </SysForm>
//   {controller.loading ? (
//   <SysLoading size="large" label="Carregando..." />
//     ): (
//       <SysForm
//         mode={state as 'create' | 'view' | 'edit'}
//         schema={controller.schema}
//         doc={controller.document}
//         onSubmit={controller.onSubmit}
//         loading={controller.loading}>
//         <Body>
//           <FormColumn>
//             <SysTextField name="name" placeholder="Ex.: Tarefa XX" />
//             <SysTextField
//               name="description"
//               placeholder="Acrescente informações sobre a tarefa (5 linhas)"
//               multiline
//               rows={5}
//               showNumberCharactersTyped
//               max={600}
//             />
//             <SysSwitch name="isPersonal" />
//           </FormColumn>
//         </Body>
//         <Footer>
//           {!isView && (
//             <Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
//               Cancelar
//             </Button>
//           )}
//           <SysFormButton>Salvar</SysFormButton>
//         </Footer>
//       </SysForm>
//     )}