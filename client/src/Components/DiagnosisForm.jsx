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
  CardContent,
  Grid,
  Stack,
  Alert,
  CircularProgress
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
  const [loading, setLoading] = useState(false);

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      let disease = "Unknown";
      let confidence = "0%";
      let medicine = "Consult a doctor";

      if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
        disease = "Viral Infection";
        confidence = "85%";
        medicine = "Paracetamol, Rest, Hydration";
      } else if (
        symptoms.includes("Frequent Urination") &&
        symptoms.includes("Weight Loss")
      ) {
        disease = "Diabetes";
        confidence = "90%";
        medicine = "Metformin (Doctor prescribed), Diet Control";
      } else if (
        symptoms.includes("Chest Pain") &&
        symptoms.includes("Shortness of Breath")
      ) {
        disease = "Heart Disease";
        confidence = "88%";
        medicine = "Aspirin (only if prescribed), Immediate checkup";
      }

      setResult({ disease, confidence, medicine });
      setLoading(false);
    }, 2000); // simulate API delay
  };

  return (
    <Box sx={{ background: "#f4f6f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        {/* Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#1976d2">
            ⚡ Fast AI Health Diagnosis
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get instant health insights based on your symptoms and also for your love ones.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography fontWeight="bold" mb={1}>
                Select Symptoms:
              </Typography>

              <Grid container>
                {symptomsList.map((symptom) => (
                  <Grid item xs={12} md={6} key={symptom}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={symptoms.includes(symptom)}
                          onChange={() => handleSymptomChange(symptom)}
                        />
                      }
                      label={symptom}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 4, py: 1.5, fontSize: "16px" }}
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Symptoms"}
            </Button>

            {/* Loading */}
            {loading && (
              <Box mt={4} textAlign="center">
                <CircularProgress />
                <Typography mt={2}>Analyzing your symptoms...</Typography>
              </Box>
            )}

            {/* Result */}
            {result && !loading && (
              <Box mt={4}>
                <Card sx={{ p: 2, borderRadius: 3, background: "#e3f2fd" }}>
                  <Typography variant="h6" gutterBottom>
                    Diagnosis Result
                  </Typography>

                  <Stack spacing={1}>
                    <Typography>
                      <strong>Disease:</strong> {result.disease}
                    </Typography>
                    <Typography>
                      <strong>Confidence:</strong> {result.confidence}
                    </Typography>
                    <Typography>
                      <strong>Suggested Medication:</strong> {result.medicine}
                    </Typography>
                  </Stack>
                </Card>

                <Alert severity="warning" sx={{ mt: 3 }}>
                  This is an AI-based prediction. Please consult a qualified
                  doctor before taking any medication.
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DiagnosisForm;