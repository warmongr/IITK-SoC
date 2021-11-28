import React ,{Component} from 'react';
import axios from 'axios';
import './user.css';
import { withStyles ,makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { mergeClasses } from '@material-ui/styles';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow)
  
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }));

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
            <div className="bg3">
            <div className="main">
            <h1 >DASHBOARD</h1>
            
                <h5 align='left'>Roll Number:{localStorage.user}</h5>
                <br/>
                <h2>Circulation History</h2>
                <Paper >
              <Table >
                <TableHead>
                  <TableRow hover>
                    <StyledTableCell align="right">Book Title</StyledTableCell>
                    <StyledTableCell align="right">Author</StyledTableCell>
                    <StyledTableCell align="right">issue_date</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {this.circulation().map(book =>{
                        return (
                           <TableRow hover>
                                <StyledTableCell align="right">{book.title}</StyledTableCell>
                                <StyledTableCell align="right">{book.author}</StyledTableCell>
                                <StyledTableCell align="right">{book.issue_date}</StyledTableCell>
                                <StyledTableCell align="right">{book.status ? "Checked In" :"Checked Out"}</StyledTableCell>
                          </TableRow>
                        )

                    })}
               </TableBody>
                </Table>
                </Paper>
            </div>
            </div>
            
        )
    }
}
