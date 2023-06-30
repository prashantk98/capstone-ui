import { Paper, Typography } from "@mui/material";
import CountUp from "react-countup";
export default function Stats({ title, icon, statsData }) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* <iconName
            fontSize="large"
            sx={{
              "&": {
                backgroundColor: "orange",
                color: "white",
                fontSize: "4.4rem",
                position: "absolute",
                top: "-3.2rem",
                left: "-4.4rem",
                borderRadius: ".8rem",
              },
            }}
          /> */}
          {icon}
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          <CountUp end={statsData} duration={1} />
        </Typography>
      </Paper>
    </>
  );
}
