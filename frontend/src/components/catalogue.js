import React ,{Component} from 'react';
import axios from 'axios';
import { withStyles ,makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { mergeClasses } from '@material-ui/styles';
import './input.css';


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


class Catalogue extends Component {
  constructor( props){
   super(props);

   this.state = {
     item :{
       title : "",
       author: "",
       barcode : "",
       status : false,
       issue_date:"",
       issued_to:''
     },
     book : [],
   }
  }



  componentDidMount(){
    this.getdata();

  }





  getdata = () => {
    axios
          .get("http://localhost:8000/api/catalogue/")
          .then(res => this.setState({ book: res.data}))
          .catch(err => console.log(err));
  }



  render(){
    return (
          <div>
                <List items={this.state.book} delete={this.removeItem} />
          </div>
    );
  };
}
class List extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          filtered: []
      };
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  this.setState({
    filtered: this.props.items
  });
}

componentWillReceiveProps(nextProps) {
  this.setState({
    filtered: nextProps.items
  });
}

  handleChange(e) {
      // Variable to hold the original version of the list
  let currentList = [];
      // Variable to hold the filtered list before putting into state
  let newList = [];

      // If the search bar isn't empty
  if (e.target.value !== "") {
          // Assign the original list to currentList
    currentList = this.props.items;

          // Use .filter() to determine which items should be displayed
          // based on the search terms
    newList = currentList.filter(item => {
      const newstr = item.title + item.author + item.barcode;
              // change current item to lowercase
      const lc = newstr.toLowerCase();
              // change search term to lowercase
      const filter = e.target.value.toLowerCase();
              // check to see if the current list item includes the search term
              // If it does, it will be added to newList. Using lowercase eliminates
              // issues with capitalization in search terms and search content
      return lc.includes(filter);
    });
  } else {
          // If the search bar is empty, set newList to original task list
    newList = this.props.items;
  }
      // Set the filtered state based on what our rules added to newList
  this.setState({
    filtered: newList
  });
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
render() {
    return (
       <div className="bg">
            <h1 align="center" className="heading"> CATALOUGE </h1>
            <hr/>

            <input type="text" className="input" id="searchInput" onChange={this.handleChange} placeholder="Search..." />
            <br/><br/>

            <Paper >
              <Table >
                <TableHead>
                  <TableRow hover>
                    <StyledTableCell align="right">Book Title</StyledTableCell>
                    <StyledTableCell align="right">Author</StyledTableCell>
                    <StyledTableCell align="right">Bar Code</StyledTableCell>
                    <StyledTableCell align="right">Available</StyledTableCell>
                    <StyledTableCell align="right">Due date</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                {this.state.filtered.map(item => (
                            <TableRow hover >
                            <StyledTableCell align="right">{item.title}</StyledTableCell>
                            <StyledTableCell align="right">{item.author}</StyledTableCell>
                            <StyledTableCell align="right">{item.barcode}</StyledTableCell>
                            <StyledTableCell align="right">{item.status ? "yes":"no"}</StyledTableCell>
                            <StyledTableCell align="right">{item.status ?"":this.incr_date(item.issue_date) }</StyledTableCell>
                            </TableRow>
                    ))}
        </TableBody>
              </Table>
            </Paper>
                </div>
    )
}
}






export default Catalogue;
