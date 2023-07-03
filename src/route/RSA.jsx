import { useEffect, useState } from "react";
import JSEncrypt from "jsencrypt";

import {
  Box,
  Button,
  CircularProgress,
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

function RSA() {
  const [keySize, setKeySize] = useState("1024");
  const [key, setKey] = useState({ public: "", private: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [text, setText] = useState({
    decrypt: "hello world!",
    encrypt: "",
  });
  useEffect(() => {
    handleGenerateKey();
  }, []);

  const handleGenerateKey = () => {
    setIsGenerating(true);
    let crypt = new JSEncrypt({ default_key_size: keySize });

    setKey({
      public: crypt.getPublicKey(),
      private: crypt.getPrivateKey(),
    });
    setIsGenerating(false);
  };

  const handleEncryptDecryptClick = () => {
    let crypt = new JSEncrypt();

    crypt.setPrivateKey(key.private);

    if (text.decrypt) {
      setText({ decrypt: "", encrypt: crypt.encrypt(text.decrypt) });
    } else {
      setText({ decrypt: crypt.decrypt(text.encrypt), encrypt: "" });
    }
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

              {isGenerating && <CircularProgress />}
            </Stack>
          </Grid>
          <Grid xs={12} md={5}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h4">Public Key</Typography>
              <TextField multiline fullWidth value={key.public} />
            </Paper>
          </Grid>
          <Grid xs={12} md={5}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h4">Private Key</Typography>
              <TextField multiline fullWidth value={key.private} />
            </Paper>
          </Grid>
        </Grid>

        <Box height="30vh" />
      </Container>
    </Box>
  );
}

export default RSA;