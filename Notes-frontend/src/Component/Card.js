import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const card = (props) => {
  var tags = [];
  props.tags.forEach((element) => {
    tags.push(
      <Grid item xs={3}>
        <Button variant="contained" onClick={() => props.getFromTags(element)}>
          {element}
        </Button>
      </Grid>
    );
  });

  return (
    <Card className={props.root} style={props.style}>
      <CardActionArea onClick={() => props.handleClick(props.id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={3}>
          {tags}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default card;
