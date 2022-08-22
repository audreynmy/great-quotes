import QuoteForm from "../quotes/QuoteForm";
import { addQuote } from "../lib/api";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {      
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm
      isLoading={status === "pending"}
      onAddQuote={addQuoteHandler}
    />
  );
};

export default NewQuote;
