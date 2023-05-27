import React from 'react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { Box, Container, Typography, Card, CardContent, TextField, InputAdornment, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InstantSearch, Hits, connectSearchBox } from 'react-instantsearch-dom';

const searchClient = instantMeiliSearch(
  'http://localhost:7700',
  'abcaee2d0049fd5eb8839117daffc0e293865030216736477ddeec51d7f3ac3e',
  { limit: 5 }
);

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <Box sx={{ mb: 3 }}>
    <TextField
      fullWidth
      variant="outlined"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      placeholder="Search for shortcuts..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ fieldset: { paddingLeft: 0, paddingRight: 0 } }} // remove the extra padding
    />
  </Box>
));

const Hit = ({ hit }) => (
  <Card sx={{ mb: 1, p: 1, minWidth: '50vw' }}>
    <Link href={hit.url} target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
      <CardContent>
        <Typography variant="h5" component="div">
          {hit.shortcut}
        </Typography>
        <Typography variant="body1">
          {hit.url}
        </Typography>
      </CardContent>
    </Link>
  </Card>
);

const Search = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    textAlign="center"
    sx={{ marginTop: 4 }}
  >
    <Container maxWidth="100vw">
      <InstantSearch searchClient={searchClient} indexName="shortcuts">
        <CustomSearchBox />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Hits hitComponent={Hit} />
        </Box>
      </InstantSearch>
    </Container>
  </Box>
);

export default Search;
