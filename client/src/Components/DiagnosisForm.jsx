import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent
} from "@mui/material";

const symptomsList = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Chest Pain",
  "Shortness of Breath",
  "Frequent Urination",
  "Weight Loss"
];

const DiagnosisForm = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {

    let disease = "Unknown";
    let confidence = "0%";

    if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
      disease = "Viral Infection";
      confidence = "85%";
    } else if (
      symptoms.includes("Frequent Urination") &&
      symptoms.includes("Weight Loss")
    ) {
      disease = "Diabetes";
      confidence = "90%";
    } else if (
      symptoms.includes("Chest Pain") &&
      symptoms.includes("Shortness of Breath")
    ) {
      disease = "Heart Disease";
      confidence = "88%";
    }

    setResult({ disease, confidence });
  };


  return (

    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              AI-Based Diagnosis
            </Typography>

            <TextField
              fullWidth
              label="Age"
              type="number"
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <TextField
              fullWidth
              select
              label="Gender"
              margin="normal"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <Typography mt={2} fontWeight="bold">
              Select Symptoms:
            </Typography>

            {symptomsList.map((symptom) => (
              <FormControlLabel
                key={symptom}
                control={
                  <Checkbox
                    checked={symptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                  />
                }
                label={symptom}
              />
            ))}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleAnalyze}
            >
              Analyze
            </Button>

            {result && (
              <Box mt={3}>
                <Typography variant="h6">Diagnosis Result</Typography>
                <Typography>Disease: {result.disease}</Typography>
                <Typography>Confidence: {result.confidence}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

  );
};

export default DiagnosisForm;
