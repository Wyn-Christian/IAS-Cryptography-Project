import { useDispatch, useSelector } from "react-redux";
import { generateKey, rsaSelector } from "../features/rsaSlice";
import { useEffect, useState } from "react";

import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputRSA from "../components/InputRSA";
import FileInputRSA from "../components/FileInputRSA";

function RSA() {
	const rsa = useSelector(rsaSelector);
	const dispatch = useDispatch();

	// States
	const [keySize, setKeySize] = useState("1024");

	// Setup
	useEffect(() => {
		dispatch(generateKey(keySize));
	}, []);

	const handleGenerateKey = () => {
		dispatch(generateKey(keySize));
	};

	return (
		<Box>
			<Container sx={{ minHeight: "100vh" }}>
				<Typography
					variant="h3"
					fontWeight="bold"
					textAlign="center"
					textTransform="uppercase"
				>
					Text File encryption and decryption
				</Typography>

				{/* Inputs */}
				<InputRSA />
				<FileInputRSA />

				{/* RSA Cryptosystem */}
				<Typography variant="h3" mt={3}>
					RSA Cryptosystem
				</Typography>
				<Grid container spacing={2}>
					<Grid xs={12} md={2}>
						<Stack
							direction={{ xs: "row", md: "column" }}
							spacing={3}
							alignItems={"center"}
						>
							<FormControl sx={{ width: { md: "100%" } }}>
								<InputLabel id="key-size-label">Key Size</InputLabel>
								<Select
									labelId="key-size-label"
									value={keySize}
									label="Key Size"
									fullWidth
									onChange={(e) => setKeySize(e.target.value)}
								>
									<MenuItem value={"512"}>512 bit</MenuItem>
									<MenuItem value={"1024"}>1024 bit</MenuItem>
									<MenuItem value={"2048"}>2048 bit</MenuItem>
									<MenuItem value={"4096"}>4096 bit</MenuItem>
								</Select>
							</FormControl>
							<Button variant="contained" onClick={handleGenerateKey}>
								Generate Key
							</Button>
						</Stack>
					</Grid>
					<Grid xs={12} md={5}>
						<Paper elevation={4} sx={{ p: 3 }}>
							<Typography variant="h4">Public Key</Typography>
							<TextField multiline fullWidth value={rsa.publicKey} />
						</Paper>
					</Grid>
					<Grid xs={12} md={5}>
						<Paper elevation={4} sx={{ p: 3 }}>
							<Typography variant="h4">Private Key</Typography>
							<TextField multiline fullWidth value={rsa.privateKey} />
						</Paper>
					</Grid>
				</Grid>

				<Box height="30vh" />
			</Container>
		</Box>
	);
}

export default RSA;
