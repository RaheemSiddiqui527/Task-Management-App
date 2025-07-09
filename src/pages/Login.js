import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Link,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  demoInfo: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
    textAlign: 'center',
  },
  errorBox: {
    width: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffebee',
    border: '1px solid #f44336',
    borderRadius: theme.spacing(1),
    color: '#c62828',
  },
}));

function Login() {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.msg || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.avatar}>
          <LockOutlined fontSize="large" style={{ color: 'white' }} />
        </div>
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Sign in to your Task Management account
        </Typography>

        {error && (
          <div className={classes.errorBox}>
            <Typography variant="body2">{error}</Typography>
          </div>
        )}

        <div className={classes.demoInfo}>
          <Typography variant="body2" color="textSecondary">
            <strong>Demo App:</strong> Use any email format and password (3+ characters)
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Example: user@example.com / password123
          </Typography>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            size="large"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;