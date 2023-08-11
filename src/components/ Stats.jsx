import { Paper, Typography } from "@mui/material";
import CountUp from "react-countup";
export default function Stats({ title, icon, statsData }) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          "& .MuiTypography-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: 'center'
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "1.6rem",
            position: "relative",
          }}
        >
          {icon}
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          {title === "Total Revenue" ? <>₹</> : <></>}
          <CountUp end={statsData} duration={1} />
        </Typography>
      </Paper>
    </>
  );
}
