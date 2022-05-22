import * as React from 'react';
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MassCard from './MassCard';
import MassRepository from './domain/MassRepository';
import ListUpcomingMassesUseCase from './usecases/ListUpcomingMassesUseCase';

const repo = new MassRepository();
const upcoming = new ListUpcomingMassesUseCase(repo).execute({ size: 3 });

export default function UpcomingMassGrid() {
  const { t } = useTranslation('mass');
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });
  return (
    <Box>
      <Typography variant="h5" mt={3}>
        {t('Upcoming Masses')}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: 3, paddingBottom: 3 }}
      >
        {upcoming.map((item, index) => (
          <Grid item xs={4} key={index}>
            <MassCard loading={loading} model={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
