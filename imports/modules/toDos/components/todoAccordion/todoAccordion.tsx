import React, {MouseEventHandler} from 'react';
import Typography from '@mui/material/Typography';
import AccordionStyle from './todoAccordionStyles';
import {SxProps, Theme} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';

const {
  Container,
  Accordion,
  AccordionSummary,
  AccordionActions,
} = AccordionStyle;

interface ITodoAccordion {
	titulo: string;
	conteudo: React.ReactNode;
	expandIcon?: React.ReactNode;
	aberta?: boolean;
	actions?: IAction[];
	disabled?: boolean;
	posicaoIcone?: 'inicio' | 'fim';
	sxMap?: {
		acordion?: SxProps<Theme>;
		acordionSumamry?: SxProps<Theme>;
		acordionDetail?: SxProps<Theme>;
		acordionActions?: SxProps<Theme>;
	};
}

interface IAction {
	tituloAcao: string;
	acao: MouseEventHandler<HTMLButtonElement>;
	sxAction?: {
		button?: SxProps<Theme>;
		textButton?: SxProps<Theme>;
	};
}

export const TodoAccordion: React.FC<ITodoAccordion> = ({
	titulo,
	conteudo,
	expandIcon,
	aberta = false,
	actions = [],
	disabled = false,
	posicaoIcone = 'inicio',
	sxMap
}) => {
	const [expanded, setExpanded] = React.useState(aberta);

	React.useEffect(() => {
		setExpanded(aberta);
	}, [aberta]);

	return (
		<Container>
			<Accordion
        sx={sxMap?.acordion}
				expanded={expanded}
				onChange={aberta ? (_, isExpanded) => setExpanded(isExpanded) : undefined}
				disabled={disabled}
				slotProps={{ transition: { unmountOnExit: true } }}>
				<AccordionSummary
					expandIcon={expandIcon}
					posicaoIcone={posicaoIcone}
					sx={sxMap?.acordionSumamry}>
					<Typography variant="h5">{titulo}</Typography>
				</AccordionSummary>

				<AccordionDetails sx={sxMap?.acordionDetail}>
					{conteudo}
				</AccordionDetails>

				<AccordionActions sx={sxMap?.acordionActions}>
					{actions.length > 0 &&
						actions.map((acao, index) => (
							<Button onClick={acao.acao} key={index} sx={acao.sxAction?.button}>
								<Typography sx={acao.sxAction?.textButton}>{acao.tituloAcao}</Typography>
							</Button>
						))}
				</AccordionActions>
			</Accordion>
		</Container>
	);
};
