import JSEncrypt from "jsencrypt";

import { useSelector } from "react-redux";
import { rsaSelector } from "../features/rsaSlice";
import { useState } from "react";

import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	Stack,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

function downloadString(text, fileType, fileName) {
	var blob = new Blob([text], { type: fileType });

	var a = document.createElement("a");
	a.download = fileName;
	a.href = URL.createObjectURL(blob);
	a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function () {
		URL.revokeObjectURL(a.href);
	}, 1500);
}

function FileInputRSA() {
	const rsa = useSelector(rsaSelector);

	const [file, setFile] = useState(null);
	const [encryptedFile, setEncryptedFile] = useState(null);

	const [text, setText] = useState({
		encrypt_input: "",
		encypted_input: "",
		decrypt_input: "",
		decrypted_input: "",
	});

	const handleEncryptInputFileChange = (newFile) => {
		let crypt = new JSEncrypt();
		crypt.setPrivateKey(rsa.privateKey);

		setFile(newFile);
		console.log(newFile.name);

		let reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				setText({
					...text,
					encrypt_input: reader.result,
					encypted_input: crypt.encrypt(reader.result),
				});
			},
			false
		);
		reader.readAsText(newFile);
	};

	const handleDecryptInputFileChange = (newFile) => {
		let crypt = new JSEncrypt();
		crypt.setPrivateKey(rsa.privateKey);

		setEncryptedFile(newFile);
		let reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				setText({
					...text,
					decrypt_input: reader.result,
					decrypted_input: crypt.decrypt(reader.result),
				});
			},
			false
		);
		reader.readAsText(newFile);
	};

	const handleDownloadEncryptFile = (type) => {
		if (type == "encrypt")
			downloadString(
				text.encypted_input,
				"text/plain",
				file.name.replace(".txt", "")
			);
		else
			downloadString(
				text.decrypted_input,
				"text/plain",
				encryptedFile.name.replace(".txt", "")
			);
	};

	return (
		<Box>
			<Typography variant="h3" mt={3}>
				File Encryption
			</Typography>
			<Stack
				direction={{ xs: "column", md: "row" }}
				justifyContent="center"
				spacing={3}
			>
				<Paper elevation={4} sx={{ p: 3 }}>
					<Typography variant="h4">File to Encrypt</Typography>
					<Stack spacing={2}>
						<MuiFileInput
							value={file}
							onChange={handleEncryptInputFileChange}
						/>
						<Box>
							<Typography variant="h6">Content: </Typography>
							<TextField fullWidth multiline value={text.encrypt_input} />
						</Box>
						<Box>
							<Typography variant="h6">Encryted Content: </Typography>
							<TextField multiline fullWidth value={text.encypted_input} />
						</Box>
						<Button
							variant="contained"
							onClick={() => handleDownloadEncryptFile("encrypt")}
						>
							Download
						</Button>
					</Stack>
				</Paper>

				<Paper elevation={4} sx={{ p: 3 }}>
					<Typography variant="h4">File to Decrypt</Typography>
					<Stack spacing={2}>
						<MuiFileInput
							value={encryptedFile}
							onChange={handleDecryptInputFileChange}
						/>
						<Box>
							<Typography variant="h6">Content: </Typography>
							<TextField fullWidth multiline value={text.decrypt_input} />
						</Box>
						<Box>
							<Typography variant="h6">Decrypted Content: </Typography>
							<TextField
								multiline
								fullWidth
								value={text.decrypted_input}
							/>
						</Box>
						<Button
							variant="contained"
							onClick={() => handleDownloadEncryptFile("decrypt")}
						>
							Download
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Box>
	);
}

export default FileInputRSA;
