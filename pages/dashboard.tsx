import { globalTheme } from '@/styles/MuiThemes';
import {
  Paper,
  Grid,
  Stack,
  Button,
  Typography,
  ThemeProvider,
  Card,
  CardMedia,
  CardActionArea,
} from '@mui/material';

// TODO: Both of the following types depends on what the designers want in these cards
type ChoiceViewModel = {
  something: unknown; // placeholder
};

type Interest = {
  name: string;
};

function CustomizationChoice(props: ChoiceViewModel): JSX.Element {
  return (
    <Card sx={{ textAlign: 'center' }} onClick={() => console.log('click')}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
        />
        <Typography variant="body1">Some interest</Typography>
      </CardActionArea>
    </Card>
  );
}

function CustomizeYourDashboard(): JSX.Element {
  // TODO: this is mock data, remove when api is ready
  const mockInterests: Interest[] = new Array(8).fill({ name: 'Interest Name' });
  return (
    <ThemeProvider theme={globalTheme}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Customize Your Dashboard!</Typography>
          <Button variant="text">Next {'>'}</Button>
        </Stack>
        <Typography variant="h5">What are you interested in seeing on your home page?</Typography>

        <Stack spacing={2} direction="column" alignItems="center" mt={2}>
          <Grid container columns={20} spacing={2}>
            {
              // xs= 5, since grid has 20 width, 4 cards are displayed on each row
              mockInterests.map((interest, index) => (
                <Grid key={index} xs={5} item>
                  <CustomizationChoice something={1} />
                  {/* <Item>Some Interest</Item> */}
                </Grid>
              ))
            }
          </Grid>

          <Button variant="contained" sx={{ width: 200 }} size="large">
            <Typography>Done</Typography>
          </Button>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}

export default CustomizeYourDashboard;
