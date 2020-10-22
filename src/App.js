import React from 'react';
import './App.css';
import { appTitle, appName, mockupIdeas, contractAddress } from './settings.js';
import HeaderBar from './components/HeaderBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import SnackMsg from './components/SnackMsg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Idea from './components/Idea';
import AddIdea from './components/AddIdea';
import IdeaForm from './components/IdeaForm';
import SortIdea from './components/SortIdea';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Check';

function SortIdeas(ideas, by) {
  var newideas = ideas.sort((i1, i2) => {
    if (by === 'sort by votes') {
      return i2.nbvotes - i1.nbvotes;
    } else if (by === 'sort by creation') {
      return i2.creation - i1.creation;
    } else if (by === 'sort by author') {
      return i2.author - i1.author;
    } else if (by === 'sort by id') {
      return i1.id - i2.id;
    } else {
      return true;
    }
  });
  return newideas;
}

function App() {
  const [viewSnack, setViewSnack] = React.useState(false);
  const [ideaForm, setIdeaForm]   = React.useState(false);
  const [ideaSort, setIdeaSort]         = React.useState('');

  var ideas = SortIdeas(mockupIdeas,ideaSort);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          secondary: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
          }
        },
      }),
    [prefersDarkMode],
  );

  const handleAddIdea = () => {
    setIdeaForm(true);
  }

  const closeIdeaForm = () => {
    setIdeaForm(false);
  }

  const handleSort = (sort) => {
    setIdeaSort(sort);
  }

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appTitle={appTitle}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + process.env.PUBLIC_URL + '/idea-box.svg' + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 10%',
          height: 500}}>
        {/* <ConnectWallet
          nbMiles={nbMiles}
          nextExpiration={nextExpiration}
          handleConnect={handleConnect}
          openViewMiles={openViewMiles}
          miles={miles}
          handleMiles={handleMiles} /> */}
        </Container>
        <Container maxWidth="md">
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}>
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
              <Grid item xs={4}>
                <SortIdea onClick={handleSort}/>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={1}>
                <Chip
                label={"Box " + contractAddress + " is active"}
                color="secondary"
                clickable
                onDelete={() => {}}
                deleteIcon={<DoneIcon />}
                variant="outlined"
              />
              </Grid>
            </Grid>
          </Grid>
          {
            ideas.map(idea =>
              <Grid item xs={12}>
                <Idea
                  id={idea.id}
                  desc={idea.desc}
                  author={idea.author}
                  creation={idea.creation}
                  nbvotes={idea.nbvotes}>
                </Idea>
              </Grid>
            )}
        </Grid>
      </Container>
      <AddIdea onClick={handleAddIdea}/>
      <Footer appName={appName}></Footer>
      <IdeaForm open={ideaForm} onclose={closeIdeaForm} theme={theme} account={"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"}/>
      <SnackMsg open={viewSnack} theme={theme}/>
    </ThemeProvider>

    </div>
  );
}

export default App;
