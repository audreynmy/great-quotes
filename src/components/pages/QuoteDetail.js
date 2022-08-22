import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from '../quotes/HighlightedQuote'
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from '../UI/LoadingSpinner'

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const quoteId = params.quoteId;

  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if(error){
    return <div className="centered">{error}</div>
  }

  if(status === "pending"){
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }

  if(!loadedQuote.text){
    return <p>No Quote Found!</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>Comments</Link>
        </div>
      </Route>            
      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
