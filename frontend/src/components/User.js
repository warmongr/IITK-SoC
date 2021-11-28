import React ,{Component} from 'react';
import axios from 'axios';
import './user.css';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_data:[],
            circulation_history:[]
        }
        this.circulation = this.circulation.bind(this);
    }
    componentDidMount(){
            this.getdata();
    }
    getdata = () => {
        axios
          .get("http://localhost:8000/api/circulation/")
          .then(res => this.setState({ user_data: res.data}))
          .catch(err => console.log(err));
    }
    incr_date(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
            parseInt(parts[0], 10),      // year
            parseInt(parts[1], 10) - 1,  // month (starts with 0)
            parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + 7);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
            parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    }
    circulation(){
        const result = this.state.user_data.filter(book =>(
            book.username.includes(localStorage.user)
        ));
        return result;
    }
    render(){
        return(
            <div className="main">
            <h1 >DASHBOARD</h1>
            <div className="body">
                <h5 align='left'>Roll Number:{localStorage.user}</h5>
                <br/>
                <h2>Circulation History</h2>
                <table align="center">
                    <tr>
                        <th>Book name</th>
                        <th>Book author</th>
                        <th>Issue Date</th>
                    </tr>
                    {this.circulation().map(book =>{
                        return (
                            <tr>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.issue_date}</td>
                                 <td>{book.status ? "Checked In" :"Checked Out"}</td>
                            </tr>
                        )
                    })}
                </table>
                </div>
            </div>
        )
    }
}
