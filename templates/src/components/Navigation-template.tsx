import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
          Sample App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/{{domainCamelCase}}s">
        {{domainName}}s
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navigation;