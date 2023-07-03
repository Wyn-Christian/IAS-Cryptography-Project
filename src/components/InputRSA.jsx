import JSEncrypt from "jsencrypt";

import { useSelector } from "react-redux";
import { rsaSelector } from "../features/rsaSlice";
import { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function InputRSA() {
	const rsa = useSelector(rsaSelector);

	const [text, setText] = useState({
		decrypt: "hello world!",
		encrypt: "",
	});

	const handleEncryptDecryptClick = () => {
		let crypt = new JSEncrypt();

		crypt.setPrivateKey(rsa.privateKey);

		// Check if the text input has value
		if (text.decrypt) {
			setText({ decrypt: "", encrypt: crypt.encrypt(text.decrypt) });
		} else {
			setText({ decrypt: crypt.decrypt(text.encrypt), encrypt: "" });
		}
	};

	return (
		<Box>
			<Typography variant="h3" mt={3}>
				Encryption and Decryption
			</Typography>
			<Grid container spacing={2}>
				<Grid xs={12} md={5}>
					<Paper elevation={4} sx={{ p: 3 }}>
						<Typography variant="h4">Text to Encrypt</Typography>
						<TextField
							multiline
							fullWidth
							value={text.decrypt}
							onChange={(e) =>
								setText({ ...text, decrypt: e.target.value })
							}
							placeholder="Type here..."
						/>
					</Paper>
				</Grid>
				<Grid xs={12} md={2}>
					<Box
						sx={{
							mt: { md: 8 },
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Button
							variant="contained"
							onClick={handleEncryptDecryptClick}
						>
							Encrypt / Decrypt
						</Button>
					</Box>
				</Grid>
				<Grid xs={12} md={5}>
					<Paper elevation={4} sx={{ p: 3 }}>
						<Typography variant="h4">Encrypted Text</Typography>
						<TextField
							multiline
							fullWidth
							value={text.encrypt}
							onChange={(e) =>
								setText({ ...text, encrypt: e.target.value })
							}
							placeholder="Paste here the encrypted text..."
						/>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}

export default InputRSA;
