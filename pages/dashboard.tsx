import { Paper, Grid, Stack, Button, Typography, createTheme, ThemeProvider } from '@mui/material';

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

function CustomizeYourDashboard(): JSX.Element {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Customize Your Dashboard!</Typography>
          <Button variant="contained">Next {">"}</Button>
        </Stack>
        <Typography variant="h5">what are you interested in seeing on your home page?</Typography>

        <Grid container>
          <Grid xs={4} item>
            lskjalksj
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default CustomizeYourDashboard;
