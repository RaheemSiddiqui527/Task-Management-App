import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import taskService from '../services/TaskService';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Fab,
  Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Add, 
  Edit, 
  Delete, 
  Check, 
  Close, 
  ExitToApp,
  Assignment,
  Schedule,
  CheckCircle,
  RadioButtonUnchecked
} from '@material-ui/icons';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  statsCard: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  statsIcon: {
    fontSize: 40,
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  taskItem: {
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  },
  statusChip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  priorityChip: {
    marginLeft: theme.spacing(1),
    color: 'white',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}));

const priorityColors = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50'
};

const statusColors = {
  'todo': '#2196f3',
  'in-progress': '#ff9800',
  'completed': '#4caf50'
};

function Dashboard() {
  const classes = useStyles();
  const { auth, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date()
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      loadTasks();
    }
  }, [auth.isAuthenticated]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const loadTasks = async () => {
    try {
      const tasks = await taskService.getTasks(auth.token);
      setTasks(tasks);
      setLoading(false);
    } catch (err) {
      console.error('Error loading tasks:', err);
      showSnackbar('Failed to load tasks', 'error');
      setLoading(false);
    }
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task._id);
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: new Date(task.dueDate) || new Date()
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date()
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, dueDate: new Date(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask, formData, auth.token);
        showSnackbar('Task updated successfully!');
      } else {
        await taskService.createTask(formData, auth.token);
        showSnackbar('Task created successfully!');
      }
      await loadTasks();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving task:', err);
      showSnackbar('Failed to save task', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id, auth.token);
        await loadTasks();
        showSnackbar('Task deleted successfully!');
      } catch (err) {
        console.error('Error deleting task:', err);
        showSnackbar('Failed to delete task', 'error');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await taskService.updateTask(id, { status: newStatus }, auth.token);
      await loadTasks();
      const statusText = newStatus === 'completed' ? 'completed' : 'marked as pending';
      showSnackbar(`Task ${statusText}!`);
    } catch (err) {
      console.error('Error updating task status:', err);
      showSnackbar('Failed to update task status', 'error');
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status !== 'completed').length;
  const overdueTasks = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'completed'
  ).length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Assignment style={{ marginRight: 16 }} />
          <Typography variant="h6" className={classes.title}>
            Task Management
          </Typography>
          <Typography variant="body1" style={{ marginRight: 16 }}>
            Welcome, {auth.user.username}
          </Typography>
          <Button 
            color="inherit" 
            onClick={logout}
            startIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        {/* Statistics Cards */}
        <Grid container spacing={3} style={{ marginBottom: 24 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className={classes.statsCard}>
                <Assignment className={classes.statsIcon} color="primary" />
                <Typography variant="h4" component="h2">
                  {totalTasks}
                </Typography>
                <Typography color="textSecondary">
                  Total Tasks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className={classes.statsCard}>
                <CheckCircle className={classes.statsIcon} style={{ color: '#4caf50' }} />
                <Typography variant="h4" component="h2">
                  {completedTasks}
                </Typography>
                <Typography color="textSecondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className={classes.statsCard}>
                <RadioButtonUnchecked className={classes.statsIcon} style={{ color: '#2196f3' }} />
                <Typography variant="h4" component="h2">
                  {pendingTasks}
                </Typography>
                <Typography color="textSecondary">
                  Pending
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent className={classes.statsCard}>
                <Schedule className={classes.statsIcon} style={{ color: '#f44336' }} />
                <Typography variant="h4" component="h2">
                  {overdueTasks}
                </Typography>
                <Typography color="textSecondary">
                  Overdue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tasks List */}
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Typography variant="h5">Your Tasks</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Add Task
            </Button>
          </Box>

          {tasks.length === 0 ? (
            <Box className={classes.emptyState}>
              <Assignment style={{ fontSize: 80, color: '#ccc', marginBottom: 16 }} />
              <Typography variant="h6" gutterBottom>
                No tasks yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create your first task to get started with organizing your work
              </Typography>
            </Box>
          ) : (
            <List>
              {tasks.map((task) => (
                <ListItem key={task._id} className={classes.taskItem} divider>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                          {task.title}
                        </Typography>
                        <Chip
                          label={task.status.replace('-', ' ')}
                          className={classes.statusChip}
                          style={{ 
                            backgroundColor: statusColors[task.status],
                            color: 'white'
                          }}
                        />
                        <Chip
                          label={task.priority}
                          className={classes.priorityChip}
                          style={{ backgroundColor: priorityColors[task.priority] }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box marginTop={1}>
                        <Typography variant="body2" color="textSecondary">
                          {task.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      onClick={() => handleStatusChange(task._id, task.status === 'completed' ? 'todo' : 'completed')}
                      color={task.status === 'completed' ? 'secondary' : 'primary'}
                    >
                      {task.status === 'completed' ? <Close /> : <Check />}
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(task)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task._id)} color="secondary">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Floating Action Button */}
        <Fab 
          color="primary" 
          aria-label="add" 
          className={classes.fab}
          onClick={() => handleOpenDialog()}
        >
          <Add />
        </Fab>

        {/* Task Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Task Title"
                name="title"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                style={{ marginTop: 16 }}
              />
              <Grid container spacing={2} style={{ marginTop: 8 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value="todo">To Do</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                margin="dense"
                label="Due Date"
                name="dueDate"
                type="date"
                fullWidth
                value={formData.dueDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                style={{ marginTop: 16 }}
              />
            </DialogContent>
            <DialogActions style={{ padding: 24 }}>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button 
                type="submit" 
                color="primary" 
                variant="contained"
                size="large"
              >
                {editingTask ? 'Update Task' : 'Create Task'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={hideSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={hideSnackbar} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default Dashboard;