import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signUpSchema } from './signupsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import { signUpStyle } from './signUpStyle';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

export const SignUp = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = signUpStyle;

	const handleSubmit = (doc: { email: string; password: string }) => {
		userprofileApi.insertNewUser(
			{ email: doc.email, username: doc.email, password: doc.password },
			(err) => {
				if (err) {
					showNotification({
						type: 'error',
						title: 'Erro no cadastro!',
						message: 'Não foi possível criar o usuário.'
					});
				} else {
					showNotification({
						type: 'success',
						title: 'Cadastro realizado!',
						message: 'Usuário criado com sucesso!'
					});
					navigate('/');
				}
			}
		);
	};

	return (
		<Container>
			<Content>
				<Typography variant="h1" display={'inline-flex'} gap={1}>
					<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
						{'{'}
					</Typography>
					Boilerplate
					<Typography variant="inherit" color="sysText.tertiary">
						{'}'}
					</Typography>
				</Typography>
				<FormContainer>
					<Typography variant="h5">Cadastrar no sistema</Typography>
					<SysForm schema={signUpSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite um email" />
							<SysTextField name="password" label="Senha" fullWidth placeholder="Digite uma senha" type="password" />
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Cadastrar
							</SysFormButton>
						</FormWrapper>
					</SysForm>
					<Box>
						Já tem uma conta? Faça login{' '}
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>aqui</Link>
					</Box>
				</FormContainer>
				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};