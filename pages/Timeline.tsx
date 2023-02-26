import type User from '@/src/models/User';
import {
  Unstable_Grid2 as Grid2,
  Paper,
  Avatar,
  Button,
  Box,
  Stack,
  Tabs,
  Tab,
  createTheme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import Image from 'next/image';

// TODO: Remove in production
/**
 * Type alias that omits all the id's
 */
type Mock<T extends object> = {
  [K in keyof T]: T[K] extends unknown[]
    ? Omit<T[K][number], 'id' | '_id'>[]
    : Omit<T[K], 'id' | '_id'>;
};

/**
 * Props for a single post
 */
type PostProps = {
  user: Mock<User>;
  /**
   * The main body of the post, displayed above the image
   */
  body: string;
  /**
   * List of images, this should be limited to a finite number but we don't know yet
   */
  imageURLs: string[]; // TODO: Change to string tuple
  /**
   * When is this posted
   */
  timestamp: Date;
};


const postTheme = createTheme({
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

// TODO: Remove in production
const listOfMockProps: PostProps[] = new Array(20).fill({
  user: {
    email: 'someEmail@mail.com',
    username: 'johndoe66222',
    tag: '@LMAO',
    bio: 'Some bio',
    interests: [{ name: 'interest 1' }, { name: 'interest 2' }],
    avatar: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg', // cat pfp
    friends: [{ username: 'Jane Doe' }],
    displayName: 'John Doe',
  },
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  imageURLs: [],
  timestamp: new Date(2023, 2, 17),
});

function TabPanel({
  children,
  value,
  index,
  ...other
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// TODO: where will the timeline be? this is needed for routing
/**
 * A post inside the user's timeline
 */
function Post({ user, body, imageURLs }: PostProps) {
  return (
    <Grid2 container spacing={2} columns={12}>
      <Grid2 display="flex" xs={1} justifyContent={'center'}>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>JD</Avatar>
      </Grid2>
      <Grid2 xs={11}>
        <div>
          <Typography variant="body1" sx={{ display: 'inline', fontWeight: 700 }}>
            {user.displayName}
          </Typography>{' '}
          <Typography sx={{ display: 'inline' }} variant="body2">
            @{user.username} • 2 days ago
          </Typography>
        </div>
        <Typography variant="body2">This server name</Typography>
      </Grid2>

      <Grid2 xs={1}></Grid2>
      <Grid2 xs={11} display="flex">
        <Typography variant="body1">{body}</Typography>
      </Grid2>

      <Grid2 xs={12}>
        <Stack direction="row-reverse" spacing={2}>
          <Button
            variant="text"
            sx={{ p: 1 }}
            startIcon={<Image src="/pixel_bubble.svg" alt="bruh" width={20} height={20} />}
          >
            Comment
          </Button>
          <Button
            variant="text"
            sx={{ p: 1 }}
            startIcon={<Image src="/pixel_heart.svg" alt="bruh" width={20} height={20} />}
          >
            Like
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

// TODO: this technically isn't the timeline, it has the timeline tab
function TimeLine() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    // TODO: remove this css when other components are ready
    <ThemeProvider theme={postTheme}>
      <div style={{ width: '50vw', height: '100vh', overflow: 'scroll' }}>
        <Tabs
          // TODO: dynamically set backgroundColor
          sx={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: 1 }}
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
        >
          <Tab label="Timeline" value={0} />
          <Tab label="Explore" value={1} />
        </Tabs>
        <Box sx={{ position: 'relative' }}>
          <TabPanel index={0} value={currentTab}>
            {listOfMockProps.map((prop, index) => (
              <Box key={index} sx={{ pb: 2 }}>
                <Post {...prop} />
              </Box>
            ))}
          </TabPanel>
          <TabPanel index={1} value={currentTab}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="body1">Explore Tab, Nothing yet</Typography>
            </Paper>
          </TabPanel>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default TimeLine;
