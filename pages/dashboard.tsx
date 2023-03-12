import {
  Paper,
  Grid,
  Stack,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Card,
  Box,
} from '@mui/material';

// TODO: Both of the following types depends on what the designers want in these cards
type ChoiceViewModel = {
  something: unknown;
};

type Interest = {
  name: string;
};

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
    secondary: {
      main: '#434343',
    },
  },
  typography: {
    allVariants: {
      // note that Poppins require global css import
      fontFamily: 'Poppins, Open Sans, Helvetica',
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
      color: '#666666',
    },
  },
});

function CustomizationChoice(props: ChoiceViewModel): JSX.Element {
  return <Card sx={{ width: '25%', height: '50px' }}>
    <Typography variant='body1'>
        Some interest
    </Typography>
  </Card>;
}

function CustomizeYourDashboard(): JSX.Element {
  const mockInterests: Interest[] = new Array(20).fill({ name: 'bruh' });
  return (
    <ThemeProvider theme={dashboardTheme}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Customize Your Dashboard!</Typography>
          <Button variant="contained">Next {'>'}</Button>
        </Stack>
        <Typography variant="h5">What are you interested in seeing on your home page?</Typography>

        <Box mt={2}>
          <Grid container columns={20} spacing={2}>
            {
              // xs= 5, since grid has 20 width, 4 cards are displayed on each row
              mockInterests.map((interest, index) => (
                <Grid key={index} xs={5} item>
                  <CustomizationChoice something={1} />
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default CustomizeYourDashboard;
