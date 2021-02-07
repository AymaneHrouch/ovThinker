import { useEffect, useState } from "react";
import { getRandomJournal } from "../services/journalService";
import Loader from "./common/loader";
import { Container } from "react-bootstrap";

const divStyle = {
  padding: "5rem",
  textAlign: "center",
};

const Random = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        let { data: journalId } = await getRandomJournal();
        props.history.replace(`/journals/${journalId}`);
      } catch (ex) {
        setLoading(false);
      }
    }
    fetchData();
  });

  if (loading) return <Loader fontSize="5rem" />;
  else
    return (
      <Container>
        <div style={divStyle}>You haven't written any diaries yet!</div>
      </Container>
    );
};

export default Random;
