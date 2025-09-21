import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

const API_KEY = process.env.MEDIAFIRE_KEY;
const USERNAME = process.env.MEDIAFIRE_USER;
const PASSWORD = process.env.MEDIAFIRE_PASS;
const FILE_PATH = "./build-output.apk";

async function login() {
  const url = `https://www.mediafire.com/api/1.5/user/get_session_token.php?email=${USERNAME}&password=${PASSWORD}&application_id=${API_KEY}&signature=dummy&response_format=json`;
  const res = await fetch(url);
  const data = await res.json();
  return data.response.session_token;
}

async function upload(sessionToken) {
  const url = `https://www.mediafire.com/api/1.5/upload/simple.php?session_token=${sessionToken}`;
  const form = new FormData();
  form.append("Filedata", fs.createReadStream(FILE_PATH));

  const res = await fetch(url, { method: "POST", body: form });
  const text = await res.text();
  console.log("📂 Resultado do upload:\n", text);
}

(async () => {
  try {
    const token = await login();
    await upload(token);
    console.log("✅ APK enviado para o Mediafire!");
  } catch (err) {
    console.error("❌ Erro:", err);
  }
})();