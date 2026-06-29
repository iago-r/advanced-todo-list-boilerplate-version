import { ElementType } from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { sysSizing } from '../../../../ui/materialui/styles';

interface ITodoAccordion {
	Container: ElementType<BoxProps>;
	Accordion: ElementType<AccordionProps>;
	AccordionSummary: ElementType<ISummaryProps>;
}

interface ISummaryProps extends AccordionSummaryProps {
	posicaoIcone?: 'inicio' | 'fim';
}

const AccordionStyle: ITodoAccordion = {
	Container: styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	})),
	Accordion: styled(Accordion)(() => ({
		width: '100%',
		borderRadius: `${sysSizing.spacingFixedXs} !important`,
    boxShadow: 'none'
	})),
	AccordionSummary: styled(AccordionSummary)<ISummaryProps>(({ posicaoIcone }) => ({
		flexDirection: posicaoIcone === 'inicio' ? 'row-reverse' : 'row',
		gap: sysSizing.spacingFixedSm
	})),
};

export default AccordionStyle;
