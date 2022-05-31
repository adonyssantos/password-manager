import { List, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PasswordGroup = ({ children, type, name }: any) => {
  const [expanded, setExpanded] = useState<string | false>('default');

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (type === 'default') {
    return (
      <Accordion expanded={expanded === 'default'} onChange={handleChange('default')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="default-bh-content" id="default-bh-header">
          <Typography variant="h6" component="p" sx={{ flexShrink: 0 }}>
            Default
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense={true}>{children}</List>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Accordion expanded={expanded === name} onChange={handleChange(name)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${name}-bh-content`} id={`${name}-bh-header`}>
        <Typography variant="h6" component="p" sx={{ flexShrink: 0 }}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense={true}>{children}</List>
      </AccordionDetails>
    </Accordion>
  );
};

export default PasswordGroup;
