import { NotFound } from "components/NotFound";
import App from "containers/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MovieDetail } from "./containers/MovieDetail/index";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/movie-details" component={MovieDetail} />
        <Route exact path="/" component={App} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
