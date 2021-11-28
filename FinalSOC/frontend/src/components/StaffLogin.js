import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

export default class StaffLogin extends Component{

    constructor(props){
        super(props);
        this.state = {
            staffs:[],
            roll_no : '',
            password:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.getdata();
    }
    getdata(){
        axios
            .get('http://localhost:8000/staff/')
            .then(res => this.setState({staffs:res.data}))
            .catch(err => console.log(err));
    }
    handleSubmit(){
        const user =this.state.staffs.filter(staff=>(
            staff.username.includes(this.state.roll_no)
        ));
        if(user.length ===1){
            if(user.password===this.state.password){
                return 'yep';
            }
        }
        return 'nope';
    }

    render(){
         return (
      <div className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          Login with your Roll Number
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Enter your Roll Number"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Username"
          />

          <TextField
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
            label="Password"
          />
          <br />
          <Button
            variant="raised"
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
          <Button
            variant="raised"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
        </form>
        <br />
      </div>
    );

    }
}
