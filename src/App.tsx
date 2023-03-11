import { Container, Typography } from "@mui/material";
import ApplicationsTable from "./components/ApplicationsTable";
import ML from "./components/ML";
import RunApplicationData from "./components/RunApplicationData";

function App() {
  return (
    <Container>
      <Typography variant="h2" component="h1" align="center" sx={{ my: 2 }}>
        Welcome to graduate program acceptance detection
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        Here you can submit the details of the student and our machine learning
        algorithm will give a percentage of chances of getting admitted to the
        program.
      </Typography>
      <ApplicationsTable />
      <ML />
      <RunApplicationData />
    </Container>
  );
}

export default App;
