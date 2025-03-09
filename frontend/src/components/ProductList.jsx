import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const isFetched = useRef(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gender, setGender] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [premiumPerYear, setPremiumPerYear] = useState("");
  const [dob, setDob] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);

  // const [gender, setGender] = useState("FEMALE");
  // const [selectedPlan, setSelectedPlan] = useState("T11A20");
  // const [premiumPerYear, setPremiumPerYear] = useState(30000 || "");
  // const [dob, setDob] = useState("1983-02-21");
  // const [paymentFrequency, setPaymentFrequency] = useState("YEARLY" || "");
  // const [calculationResult, setCalculationResult] = useState(null);

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchProducts());
      isFetched.current = true;
    }
  }, [dispatch]);

  const productList = products?.data || [];

  const genderList = [
    { name: "ผู้ชาย", value: "MALE", icon: <MaleIcon sx={{ fontSize: 30 }} /> },
    {
      name: "ผู้หญิง",
      value: "FEMALE",
      icon: <FemaleIcon sx={{ fontSize: 30 }} />,
    },
  ];

  const paymentFrequencyList = [
    { name: "รายปี", value: "YEARLY" },
    { name: "รายครึ่งปี", value: "HALFYEARLY" },
    { name: "ราย 3 เดือน", value: "QUARTERLY" },
    { name: "รายเดือน", value: "MONTHLY" },
  ];

  const handleSubmit = async () => {
    const requestData = {
      genderCd: gender,
      dob,
      planCode: selectedPlan,
      premiumPerYear: parseFloat(premiumPerYear),
      paymentFrequency,
    };

    try {
      const response = await axios.post(
        "http://localhost:8888/api/premiumCalculation",
        requestData
      );
      setCalculationResult(response.data.data);
      console.log(calculationResult);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Kanit",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1200,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          padding: 3,
          background: "#ff6b00",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, mb: 3, boxShadow: 2, borderRadius: 3 }}>
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        background: "linear-gradient(90deg, #FF5733, #FF8C00)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      คำนวณเบี้ยประกัน
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          เพศ:
                        </Typography>
                        <Grid container spacing={2}>
                          {genderList.map((g) => (
                            <Grid item key={g.value}>
                              <Paper
                                onClick={() => setGender(g.value)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 1,
                                  width: 120,
                                  height: 50,
                                  borderRadius: 3,
                                  border:
                                    gender === g.value
                                      ? "2px solid #FF6B00"
                                      : "2px solid #ddd",
                                  backgroundColor:
                                    gender === g.value ? "#FFE0B2" : "#fff",
                                  cursor: "pointer",
                                  transition: "0.3s",
                                  "&:hover": { backgroundColor: "#FFD580" },
                                }}
                              >
                                {g.icon}
                                <Typography
                                  sx={{
                                    fontSize: 16,
                                    fontWeight:
                                      gender === g.value ? "bold" : "normal",
                                    color:
                                      gender === g.value ? "#FF6B00" : "#555",
                                  }}
                                >
                                  {g.name}
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          เลือกแผนประกัน:
                        </Typography>
                        <TextField
                          fullWidth
                          select
                          size="small"
                          value={selectedPlan}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          inputProps={{ "aria-label": "เลือกแผนประกัน" }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#ccc" },
                              "&:hover fieldset": { borderColor: "#FF8C00" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF8C00",
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#555",
                              "&.Mui-focused": { color: "#FF8C00" },
                            },
                          }}
                        >
                          {productList.map((product) => (
                            <MenuItem
                              key={product.planCode}
                              value={product.planCode}
                            >
                              {product.planCode} - {product.packageName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          วันเกิด:
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          value={dob}
                          size="small"
                          inputProps={{ "aria-label": "วันเกิด" }}
                          onChange={(e) => setDob(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#ccc" },
                              "&:hover fieldset": { borderColor: "#FF8C00" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF8C00",
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#555",
                              "&.Mui-focused": { color: "#FF8C00" },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          เบี้ยประกัน:
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={premiumPerYear}
                          onChange={(e) => setPremiumPerYear(e.target.value)}
                          inputProps={{ "aria-label": "เบี้ยประกัน" }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#ccc" },
                              "&:hover fieldset": { borderColor: "#FF8C00" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF8C00",
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#555",
                              "&.Mui-focused": { color: "#FF8C00" },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          การชำระเบี้ย:
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          select
                          value={paymentFrequency}
                          onChange={(e) => setPaymentFrequency(e.target.value)}
                          inputProps={{ "aria-label": "การชำระเบี้ย" }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#ccc" },
                              "&:hover fieldset": { borderColor: "#FF8C00" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF8C00",
                                borderWidth: 2,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#555",
                              "&.Mui-focused": { color: "#FF8C00" },
                            },
                          }}
                        >
                          {paymentFrequencyList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} textAlign="center">
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: "8px",
                            padding: "10px 20px",
                            backgroundColor: "#FF6B00",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#E65C00" },
                          }}
                          onClick={handleSubmit}
                          disabled={
                            !gender ||
                            !dob ||
                            !selectedPlan ||
                            !premiumPerYear ||
                            !paymentFrequency
                          }
                        >
                          คำนวณเบี้ยประกัน
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, mb: 3, boxShadow: 2, borderRadius: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            background:
                              "linear-gradient(90deg, #FF5733, #FF8C00)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                          }}
                        >
                          ผลลัพธ์
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                              แผนของคุณ:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ textAlign: "right" }}>
                              {calculationResult?.planCode}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                              ความคุ้มครอง:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ textAlign: "right" }}>
                              {calculationResult?.baseSumAssured} บาท
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                              เบี้ยประกัน:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ textAlign: "right" }}>
                              {calculationResult?.baseAnnualPremium} บาท
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductList;
