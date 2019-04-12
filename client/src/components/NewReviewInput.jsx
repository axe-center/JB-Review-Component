import React from 'react';
import StarRatings from 'react-star-ratings';
import { Grid, Paper, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const styles = createMuiTheme({
  paper: {
    width: 5
  },
  root: {
    flexgrow: 1
  },
  typography: {
    useNextVariants: true
  }
});

class NewReviewInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      score: 0,
      username: "",
      body: "",
      proscons: {
        reliability: true,
        durability: true,
        looks: true,
        performance: true,
        value: true
      }
    }
  }

  handleChange (event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleScoreChange (newScore) {
    // event.preventDefault();
    this.setState({
      score: newScore
    });
  }

  isValidReview(event, newReview) {
    event.preventDefault();

    if(newReview.score === 0 || newReview.username === "" || newReview.body === "") {
      alert("Please fully complete your review!");
    } else {
      this.props.postReview(newReview);
    }
  }

  setProCon(event) {
    event.preventDefault();

    let newProsCons = this.state.proscons;
    newProsCons[event.target.id] = !newProsCons[event.target.id];

    let newString = event.target.id;
    newString = newString.charAt(0).toUpperCase() + newString.slice(1);

    this.setState({ 
      proscons: newProsCons
    });

    if(newProsCons[event.target.id]) {
      event.target.innerHTML = `${newString}: Pro`;
    } else {
      event.target.innerHTML = `${newString}: Con`;
    }
  }

  render (props) {
    return (
      <MuiThemeProvider theme = {styles}>
      <div id="newReviewInput" >
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <input name="username" placeholder="Your Name" onChange={event => this.handleChange(event)}></input>
            <span> Score: </span>
            <StarRatings rating={this.state.score} 
                        starRatedColor="orange" 
                        starHoverColor="orange"
                        changeRating={this.handleScoreChange.bind(this)} 
                        numberOfStars={5} 
                        name='score'
                        starDimension="20px"/>
            <br />
            <textarea style={{width: "38.5vw", height: "114px"}} name="body" placeholder="Write a Review" onChange={event => this.handleChange(event)}></textarea>
          </Grid>
          <Grid item xs={6}>
          <Paper style={{height: '136px'}}>
            <br/>
            <span title="Toggle Pro/Con" className="btn pro-con" onClick={event => this.setProCon(event)} id="reliability">Reliability: Pro</span><br />
            <span title="Toggle Pro/Con" className="btn pro-con" onClick={event => this.setProCon(event)} id="durability">Durability: Pro</span><br />
            <span title="Toggle Pro/Con" className="btn pro-con" onClick={event => this.setProCon(event)} id="looks">Looks: Pro</span><br />
            <span title="Toggle Pro/Con" className="btn pro-con" onClick={event => this.setProCon(event)} id="performance">Performance: Pro</span><br />
            <span title="Toggle Pro/Con" className="btn pro-con" onClick={event => this.setProCon(event)} id="value">Value: Pro</span><br />
          </Paper>
          </Grid>
        </Grid>
        <div className="submitBtn btn" title="Submit Review" onClick={(event) => {this.isValidReview(event, this.state)}}>Submit</div>
        <hr className="component-div" />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default NewReviewInput;