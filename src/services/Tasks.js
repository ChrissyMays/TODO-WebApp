import React,{ Component } from "react";
import {
    addTask, 
    getTasks, 
    updateTask, 
    deleteTask
} from './services/taskServices';
import { getTasks } from "./taskServices";

class extends Component {
    state = { tasks: [], currentTask: ""};
    
    async componentDidMount(){
        try {
            const {data} = await getTasks();
            this.setState({tasks: data});
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({currentTarget:input}) => {
        this.setState({currentTask: input.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks
        try {
           const {data} = await addTask({task : this.state.cuurentTask});
            const task = originalTasks;
            task.push(data);
            this.setState({task, currentTask: ""});
        } catch (error) {
            console.log(error)
        }
    }

    handleUpdate = async(currentTask) => {
        const orginalTasks = this.state.tasks;
        try{
            const tasks = [...originalTasks]
            const index = task.findIndex((task) => task._id === currentTask);
            tasks[index] = {...tasks[index]};
            task[index].completed = !tasks[index].completed;
            this.setState({tasks});
            await updateTask(currentTask, {completed: tasks[index].completed})
        } catch(error) {
            this.setState({tasks:orginalTask})
            console.log(error)
        }
    }

    handleDelete = async (currentTask) => {
        const orginalTasks = this.state.tasks;
        try {
            const tasks = orginalTasks.filter(
            (task) => task._id !== currentTask    
            );
            this.setState({tasks});
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({tasks: originalTasks});
            console.log(error)
        }
    }
}

export default Tasks;